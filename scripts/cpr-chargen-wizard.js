/**
 * Cyberpunk RED Character Creation Wizard Dialog
 * Interactive FormApplication with AI concept generation, Edgerunner customizer, and lifepath builder
 */

import { CPR_ROLES, CPR_LIFEPATH } from "./cpr-chargen-data.js";
import { CPRCharGenAI } from "./cpr-chargen-ai.js";
import { CPRCharGenActor } from "./cpr-chargen-actor.js";

export class CPRCharGenWizard extends FormApplication {
  constructor(options = {}) {
    super({}, options);
    this.charData = {
      mode: "streetrat",
      selectedRole: "solo",
      selectedTemplateIndex: 0,
      charName: "V",
      aiConceptPrompt: "",
      skills: { ...CPR_ROLES.solo.skills },
      lifepath: this.generateRandomLifepath(),
      backstory: "<p>Hit the neon streets of Night City in 2045 looking to carve out a name as an edge-runner.</p>"
    };
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "cpr-chargen-wizard",
      title: "Cyberpunk RED: AI Character Creator",
      template: "modules/cyberpunk-red-character-creator/templates/chargen-wizard.hbs",
      width: 780,
      height: 720,
      resizable: true,
      classes: ["cpr-chargen-window"],
      tabs: [{ navSelector: ".cpr-tabs", contentSelector: ".cpr-tab-content", initial: "role" }],
      closeOnSubmit: true
    });
  }

  getData() {
    const roleDef = CPR_ROLES[this.charData.selectedRole] || CPR_ROLES.solo;
    const stats = roleDef.statTemplates[this.charData.selectedTemplateIndex] || roleDef.statTemplates[0];

    const body = stats.body || 6;
    const will = stats.will || 6;
    const emp = stats.emp || 4;
    const hp = 10 + (5 * Math.ceil((body + will) / 2));
    const wounded = Math.ceil(hp / 2);
    const humanity = emp * 10;

    // Calculate total spent skill points
    const currentSkills = this.charData.skills || roleDef.skills;
    const totalSpentPoints = Object.values(currentSkills).reduce((acc, val) => acc + (parseInt(val, 10) || 0), 0);

    return {
      roles: CPR_ROLES,
      selectedRole: this.charData.selectedRole,
      currentRoleDef: roleDef,
      selectedTemplateIndex: this.charData.selectedTemplateIndex,
      currentStats: stats,
      derived: { hp, wounded, humanity },
      currentSkills: currentSkills,
      totalSpentPoints: totalSpentPoints,
      charName: this.charData.charName,
      mode: this.charData.mode,
      aiConceptPrompt: this.charData.aiConceptPrompt,
      lifepath: this.charData.lifepath,
      backstory: this.charData.backstory
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // 1. Mode Toggle (Streetrat vs Edgerunner)
    html.find(".mode-btn").on("click", (e) => {
      e.preventDefault();
      const targetMode = $(e.currentTarget).data("mode");
      this.charData.mode = targetMode;
      this.render();
    });

    // 2. Role Card Click
    html.find(".role-card").on("click", (e) => {
      const roleKey = $(e.currentTarget).data("role");
      this.charData.selectedRole = roleKey;
      this.charData.selectedTemplateIndex = 0;
      const roleDef = CPR_ROLES[roleKey] || CPR_ROLES.solo;
      this.charData.skills = { ...roleDef.skills };
      this.render();
    });

    // 3. Stat Template Select
    html.find("select[name='statTemplateIndex']").on("change", (e) => {
      this.charData.selectedTemplateIndex = parseInt(e.target.value, 10) || 0;
      this.render();
    });

    // 4. Roll 1d10 Stat Array Button
    html.find(".btn-roll-stats").on("click", () => {
      this.charData.selectedTemplateIndex = Math.floor(Math.random() * 10);
      ui.notifications.info(`Rolled Stat Array Template ${this.charData.selectedTemplateIndex + 1}!`);
      this.render();
    });

    // 5. Edgerunner Skill Increment / Decrement Handlers
    html.find(".btn-skill-inc").on("click", (e) => {
      const skillName = $(e.currentTarget).data("skill");
      const currentVal = parseInt(this.charData.skills[skillName] || 0, 10);
      if (currentVal < 6) {
        this.charData.skills[skillName] = currentVal + 1;
        this.render();
      } else {
        ui.notifications.warn("Starting skill level cannot exceed 6 in character generation.");
      }
    });

    html.find(".btn-skill-dec").on("click", (e) => {
      const skillName = $(e.currentTarget).data("skill");
      const currentVal = parseInt(this.charData.skills[skillName] || 0, 10);
      if (currentVal > 0) {
        this.charData.skills[skillName] = currentVal - 1;
        this.render();
      }
    });

    // 6. Reset Skills Button
    html.find(".btn-reset-skills").on("click", () => {
      const roleDef = CPR_ROLES[this.charData.selectedRole] || CPR_ROLES.solo;
      this.charData.skills = { ...roleDef.skills };
      ui.notifications.info("Reset skills to standard role template.");
      this.render();
    });

    // 7. Roll Full Random Lifepath Button
    html.find(".btn-roll-lifepath").on("click", () => {
      this.charData.lifepath = this.generateRandomLifepath();
      ui.notifications.info("Rolled complete random Lifepath!");
      this.render();
    });

    // 8. AI Concept Synthesizer Button
    html.find(".btn-ai-synthesize").on("click", async () => {
      const prompt = html.find("input[name='aiConceptPrompt']").val() || "";
      ui.notifications.info("CPR AI: Synthesizing character concept from Legion...");
      try {
        const result = await CPRCharGenAI.brainstormConcept(prompt, this.charData.mode);
        if (result.name) this.charData.charName = result.name;
        if (result.role && CPR_ROLES[result.role.toLowerCase()]) {
          this.charData.selectedRole = result.role.toLowerCase();
          const roleDef = CPR_ROLES[this.charData.selectedRole];
          this.charData.skills = { ...roleDef.skills };
        }
        if (result.templateIndex !== undefined) {
          this.charData.selectedTemplateIndex = Math.max(0, Math.min(9, result.templateIndex - 1));
        }

        this.charData.lifepath = {
          culturalOrigin: result.culturalOrigin || CPR_LIFEPATH.culturalOrigins[0].origin,
          personality: result.personality || "",
          clothingStyle: result.clothingStyle || "",
          hairStyle: result.hairStyle || "",
          affectation: result.affectation || "",
          valueMost: result.valueMost || "",
          aboutPeople: result.aboutPeople || "",
          familyBackground: result.familyBackground || "",
          familyCrisis: result.familyCrisis || "",
          lifeGoals: result.lifeGoals || "",
          friendText: result.friend ? `${result.friend.who}: ${result.friend.relationship}` : "",
          enemyText: result.enemy ? `${result.enemy.who} (${result.enemy.cause})` : "",
          tragicLove: result.tragicLove || ""
        };

        if (result.backstory) this.charData.backstory = result.backstory;

        ui.notifications.info(`Synthesized character: "${this.charData.charName}"!`);
        this.render();
      } catch (err) {
        ui.notifications.error(`AI Concept generation failed: ${err.message}`);
      }
    });

    // 9. AI Weave Backstory Button
    html.find(".btn-ai-weave-bio").on("click", async () => {
      ui.notifications.info("CPR AI: Weaving Lifepath into narrative backstory...");
      try {
        const lp = {
          name: this.charData.charName,
          role: this.charData.selectedRole,
          culturalOrigin: html.find("input[name='lp_culturalOrigin']").val(),
          personality: html.find("input[name='lp_personality']").val(),
          familyBackground: html.find("input[name='lp_familyBackground']").val(),
          familyCrisis: html.find("input[name='lp_familyCrisis']").val(),
          enemy: html.find("input[name='lp_enemy']").val(),
          friend: html.find("input[name='lp_friend']").val(),
          tragicLove: html.find("input[name='lp_tragicLove']").val(),
          lifeGoals: html.find("input[name='lp_lifeGoals']").val()
        };

        const narrative = await CPRCharGenAI.weaveLifepathNarrative(lp);
        this.charData.backstory = narrative;
        html.find("textarea[name='backstory']").val(narrative);
        ui.notifications.info("Backstory woven successfully!");
      } catch (err) {
        ui.notifications.error(`Backstory weaving failed: ${err.message}`);
      }
    });

    // 10. Cancel Button
    html.find(".btn-cancel").on("click", () => this.close());
  }

  pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  generateRandomLifepath() {
    const cult = this.pickRandom(CPR_LIFEPATH.culturalOrigins);
    return {
      culturalOrigin: `${cult.origin} (Primary Language: ${cult.language})`,
      personality: this.pickRandom(CPR_LIFEPATH.personalities),
      clothingStyle: this.pickRandom(CPR_LIFEPATH.clothingStyles),
      hairStyle: this.pickRandom(CPR_LIFEPATH.hairstyles),
      affectation: this.pickRandom(CPR_LIFEPATH.affectations),
      valueMost: this.pickRandom(CPR_LIFEPATH.valueMost),
      aboutPeople: this.pickRandom(CPR_LIFEPATH.aboutPeople),
      familyBackground: this.pickRandom(CPR_LIFEPATH.familyBackgrounds),
      familyCrisis: this.pickRandom(CPR_LIFEPATH.familyCrises),
      lifeGoals: this.pickRandom(CPR_LIFEPATH.lifeGoals),
      friendText: "Dante (Ex-Trauma Team Medic): Saved your life in a crossfire",
      enemyText: "Vortex (Maelstrom Lieutenant): You stole a prototype cyberware crate",
      tragicLove: "Lover died in an Arasaka orbital strike during the 4th Corporate War"
    };
  }

  /**
   * Form Submission: Instantiate Actor in Foundry VTT
   */
  async _updateObject(event, formData) {
    const roleDef = CPR_ROLES[this.charData.selectedRole] || CPR_ROLES.solo;
    const stats = roleDef.statTemplates[this.charData.selectedTemplateIndex] || roleDef.statTemplates[0];

    const finalCharacter = {
      name: formData.charName || this.charData.charName || "Night City Edge",
      role: this.charData.selectedRole,
      stats: stats,
      skills: this.charData.skills || roleDef.skills,
      lifepath: {
        culturalOrigin: formData.lp_culturalOrigin,
        personality: formData.lp_personality,
        clothingStyle: formData.lp_clothingStyle,
        hairStyle: formData.lp_hairStyle,
        affectation: formData.lp_affectation,
        familyBackground: formData.lp_familyBackground,
        familyCrisis: formData.lp_familyCrisis,
        lifeGoals: formData.lp_lifeGoals,
        friend: { who: "Friend", relationship: formData.lp_friend },
        enemy: { who: "Enemy", cause: formData.lp_enemy },
        tragicLove: formData.lp_tragicLove
      },
      backstory: formData.backstory || this.charData.backstory,
      startingCash: roleDef.name === "Exec" ? 1000 : (roleDef.name === "Fixer" ? 800 : 500)
    };

    ui.notifications.info(`Building Actor "${finalCharacter.name}" in world...`);
    await CPRCharGenActor.createActor(finalCharacter);
  }
}
