/**
 * Cyberpunk RED Foundry Actor Builder
 * Creates native 'character' actors in Foundry VTT v12 with full stats, embedded skill items, gear, and lifepath
 */

import { CPR_ROLES } from "./cpr-chargen-data.js";

export class CPRCharGenActor {
  /**
   * Helper: Normalize string to alphanumeric lowercase for fuzzy matching
   */
  static cleanKey(str) {
    return (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  /**
   * Search all available compendiums for matching items
   */
  static async findCompendiumItem(nameToFind, preferredPackPrefix = "") {
    if (!nameToFind) return null;
    const cleanTarget = this.cleanKey(nameToFind.replace(/\s*\(.*?\)\s*/g, ""));
    const rawTarget = nameToFind.toLowerCase().replace(/\s*\(.*?\)\s*/g, "").trim();

    // Sort packs so preferred packs come first
    const itemPacks = game.packs.filter(p => p.documentName === "Item");
    itemPacks.sort((a, b) => {
      if (preferredPackPrefix) {
        const aMatch = a.metadata.id.includes(preferredPackPrefix);
        const bMatch = b.metadata.id.includes(preferredPackPrefix);
        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
      }
      return 0;
    });

    for (const pack of itemPacks) {
      const index = await pack.getIndex({ fields: ["type", "name", "system"] });
      
      // 1. Exact clean match
      let entry = index.find(i => this.cleanKey(i.name) === cleanTarget);
      
      // 2. Substring match
      if (!entry) {
        entry = index.find(i => {
          const cName = this.cleanKey(i.name);
          return cName.includes(cleanTarget) || cleanTarget.includes(cName);
        });
      }

      if (entry) {
        try {
          const doc = await pack.getDocument(entry._id);
          if (doc) return doc.toObject();
        } catch (e) {
          console.warn(`CPR CharGen | Could not load document ${entry.name} from pack ${pack.metadata.id}:`, e);
        }
      }
    }
    return null;
  }

  /**
   * Build and instantiate a new Character Actor in Foundry VTT
   * @param {Object} charData Complete character configuration
   * @returns {Promise<Actor>}
   */
  static async createActor(charData) {
    const roleKey = charData.role?.toLowerCase() || "solo";
    const roleDef = CPR_ROLES[roleKey] || CPR_ROLES.solo;
    const stats = charData.stats || roleDef.statTemplates[0];

    // Compute Derived Stats
    const body = stats.body || 6;
    const will = stats.will || 6;
    const emp = stats.emp || 4;
    const maxHp = 10 + (5 * Math.ceil((body + will) / 2));
    const maxHumanity = emp * 10;

    // 1. Prepare Base Actor Document
    const baseActorData = {
      name: charData.name || "Night City Edge",
      type: "character",
      img: charData.img || "icons/svg/mystery-man.svg",
      ownership: {
        default: 0,
        [game.user.id]: 3
      },
      system: {
        stats: {
          int: { value: stats.int, max: stats.int },
          ref: { value: stats.ref, max: stats.ref },
          dex: { value: stats.dex, max: stats.dex },
          tech: { value: stats.tech, max: stats.tech },
          cool: { value: stats.cool, max: stats.cool },
          will: { value: stats.will, max: stats.will },
          luck: { value: stats.luck, max: stats.luck },
          move: { value: stats.move, max: stats.move },
          body: { value: stats.body, max: stats.body },
          emp: { value: stats.emp, max: stats.emp }
        },
        derivedStats: {
          hp: { value: maxHp, max: maxHp },
          humanity: { value: maxHumanity, max: maxHumanity }
        },
        lifepath: {
          culturalOrigin: charData.lifepath?.culturalOrigin || "",
          personality: charData.lifepath?.personality || "",
          clothingStyle: charData.lifepath?.clothingStyle || "",
          hairStyle: charData.lifepath?.hairStyle || "",
          affections: charData.lifepath?.affectation || "",
          valueMost: charData.lifepath?.valueMost || "",
          aboutPeople: charData.lifepath?.aboutPeople || "",
          familyBackground: charData.lifepath?.familyBackground || "",
          familyCrisis: charData.lifepath?.familyCrisis || "",
          lifeGoals: charData.lifepath?.lifeGoals || "",
          friends: charData.lifepath?.friend ? `${charData.lifepath.friend.who}: ${charData.lifepath.friend.relationship}` : "",
          enemies: charData.lifepath?.enemy ? `${charData.lifepath.enemy.who} (${charData.lifepath.enemy.cause})` : "",
          tragicLoveAffairs: charData.lifepath?.tragicLove || ""
        },
        information: {
          alias: charData.name || "Street Samurai",
          history: charData.backstory || "<p>Hit the streets in 2045.</p>"
        },
        wealth: {
          cash: charData.startingCash || 500
        }
      }
    };

    const actor = await Actor.create(baseActorData);
    console.log(`CPR CharGen | Created Base Actor: ${actor.name} (${actor.id})`);

    // 2. Load Core Skills and Attach to Actor
    await this.setupSkills(actor, charData.skills || roleDef.skills);

    // 3. Attach Role Item (e.g. Solo, Netrunner, Tech, etc.)
    await this.attachRole(actor, roleDef);

    // 4. Attach Weapons, Armor, Cyberware, Programs, and Gear
    await this.attachGearAndChrome(actor, roleDef, charData);

    ui.notifications.info(`Successfully created Cyberpunk RED character: "${actor.name}"!`);
    actor.sheet.render(true);
    return actor;
  }

  /**
   * Load and populate all core skill documents on the Actor with configured levels
   */
  static async setupSkills(actor, skillAllocations = {}) {
    // 1. Fetch core skills pack
    const skillPack = game.packs.get(`${game.system.id}.internal_skills`);
    let coreSkillDocs = [];
    if (skillPack) {
      coreSkillDocs = await skillPack.getDocuments();
    }

    // 2. Create skills on actor if not already present
    const existingSkills = actor.itemTypes.skill || [];
    const skillsToCreate = [];

    // Map existing skills by clean name
    const existingMap = new Map();
    existingSkills.forEach(s => existingMap.set(this.cleanKey(s.name), s));

    for (const sDoc of coreSkillDocs) {
      const cleanName = this.cleanKey(sDoc.name);
      if (!existingMap.has(cleanName)) {
        const sObj = sDoc.toObject();
        skillsToCreate.push(sObj);
      }
    }

    if (skillsToCreate.length > 0) {
      await actor.createEmbeddedDocuments("Item", skillsToCreate);
      console.log(`CPR CharGen | Created ${skillsToCreate.length} core skill items on ${actor.name}`);
    }

    // 3. Update skill levels from character data
    const allSkills = actor.itemTypes.skill || [];
    const skillUpdates = [];

    for (const sItem of allSkills) {
      const sClean = this.cleanKey(sItem.name);
      
      // Match against skillAllocations keys (e.g. "shoulderArms" or "athletics")
      let allocatedLevel = 0;
      for (const [k, v] of Object.entries(skillAllocations)) {
        const kClean = this.cleanKey(k);
        if (sClean === kClean || sClean.includes(kClean) || kClean.includes(sClean)) {
          allocatedLevel = parseInt(v, 10) || 0;
          break;
        }
      }

      if (allocatedLevel > 0 || sItem.system.level !== allocatedLevel) {
        skillUpdates.push({
          _id: sItem.id,
          "system.level": allocatedLevel
        });
      }
    }

    if (skillUpdates.length > 0) {
      await actor.updateEmbeddedDocuments("Item", skillUpdates);
      console.log(`CPR CharGen | Updated ${skillUpdates.length} skill ranks on ${actor.name}`);
    }
  }

  /**
   * Attach official Role item to Actor
   */
  static async attachRole(actor, roleDef) {
    const roleDoc = await this.findCompendiumItem(roleDef.name, "roles");
    if (roleDoc) {
      // Set starting role ability rank to 4
      if (roleDoc.system) {
        roleDoc.system.rank = 4;
      }
      await actor.createEmbeddedDocuments("Item", [roleDoc]);
      console.log(`CPR CharGen | Attached Role "${roleDoc.name}" to ${actor.name}`);
    }
  }

  /**
   * Attach weapons, armor, cyberware, programs, and gear
   */
  static async attachGearAndChrome(actor, roleDef, charData) {
    const itemsToAdd = [];

    // 1. Weapons
    const weaponsToFind = (charData.chosenWeapons && charData.chosenWeapons.length > 0)
      ? charData.chosenWeapons
      : (roleDef.weaponChoices ? roleDef.weaponChoices.map(wc => wc.options[0]) : []);

    for (const wName of weaponsToFind) {
      const wDoc = await this.findCompendiumItem(wName, "weapons");
      if (wDoc) {
        wDoc.system.equipped = true;
        itemsToAdd.push(wDoc);
      }
    }

    // 2. Armor (Light Armorjack Body & Head SP 11)
    const bodyArmor = await this.findCompendiumItem("Light Armorjack (Body)", "armor") || await this.findCompendiumItem("Light Armorjack Body", "armor") || await this.findCompendiumItem("Light Armorjack", "armor");
    if (bodyArmor) {
      bodyArmor.system.equipped = true;
      itemsToAdd.push(bodyArmor);
    }
    const headArmor = await this.findCompendiumItem("Light Armorjack (Head)", "armor") || await this.findCompendiumItem("Light Armorjack Head", "armor");
    if (headArmor) {
      headArmor.system.equipped = true;
      itemsToAdd.push(headArmor);
    }

    // 3. Cyberware
    const cyberToFind = (charData.chosenCyberware && charData.chosenCyberware.length > 0)
      ? charData.chosenCyberware
      : (roleDef.baseCyberware || []);

    for (const cName of cyberToFind) {
      const cDoc = await this.findCompendiumItem(cName, "cyberware");
      if (cDoc) {
        cDoc.system.installed = true;
        itemsToAdd.push(cDoc);
      }
    }

    // 4. Programs (Netrunner)
    if (roleDef.deckPrograms && Array.isArray(roleDef.deckPrograms)) {
      for (const pName of roleDef.deckPrograms) {
        const pDoc = await this.findCompendiumItem(pName, "programs");
        if (pDoc) itemsToAdd.push(pDoc);
      }
    }

    // 5. Gear & Instruments & Vehicles
    const gearToFind = [...(roleDef.gear || [])];
    if (charData.chosenVehicle) gearToFind.push(charData.chosenVehicle);
    if (charData.chosenInstrument) gearToFind.push(charData.chosenInstrument);

    for (const gName of gearToFind) {
      const gDoc = await this.findCompendiumItem(gName, "gear");
      if (gDoc) itemsToAdd.push(gDoc);
    }

    if (itemsToAdd.length > 0) {
      await actor.createEmbeddedDocuments("Item", itemsToAdd);
      console.log(`CPR CharGen | Attached ${itemsToAdd.length} equipment and cyberware items to ${actor.name}`);
    }
  }
}
