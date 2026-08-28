/**
 * Cyberpunk RED Foundry Actor Builder
 * Creates native 'character' actors in Foundry VTT v12 with stats, skills, chosen gear, and lifepaths
 */

import { CPR_ROLES } from "./cpr-chargen-data.js";

export class CPRCharGenActor {
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

    const actorData = {
      name: charData.name || "Night City Edge",
      type: "character",
      img: charData.img || "icons/svg/mystery-man.svg",
      ownership: {
        default: 0,
        [game.user.id]: 3
      },
      system: {
        stats: {
          int: { value: stats.int },
          ref: { value: stats.ref },
          dex: { value: stats.dex },
          tech: { value: stats.tech },
          cool: { value: stats.cool },
          will: { value: stats.will },
          luck: { value: stats.luck },
          move: { value: stats.move },
          body: { value: stats.body },
          emp: { value: stats.emp }
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

    // 1. Create Base Actor
    const actor = await Actor.create(actorData);
    console.log(`CPR CharGen | Created Actor: ${actor.name} (${actor.id})`);

    // 2. Attach Starting Skills
    const skillsToApply = charData.skills || roleDef.skills;
    if (skillsToApply) {
      await this.applySkills(actor, skillsToApply);
    }

    // 3. Search and Attach Compendium Items (Weapons, Armor, Cyberware, Gear)
    await this.attachCompendiumGear(actor, roleDef, charData);

    ui.notifications.info(`Successfully created Cyberpunk RED character: "${actor.name}"!`);
    actor.sheet.render(true);
    return actor;
  }

  /**
   * Apply skill levels directly to the Actor
   */
  static async applySkills(actor, skills) {
    const updateData = {};
    for (const [skillName, val] of Object.entries(skills)) {
      updateData[`system.skills.${skillName}.value`] = val;
    }
    await actor.update(updateData);
  }

  /**
   * Search official system compendiums for matching weapons, armor, cyberware, and gear
   */
  static async attachCompendiumGear(actor, roleDef, charData) {
    const itemsToAdd = [];

    // 1. Find Role item
    const rolePack = game.packs.get("cyberpunk-red-core.roles");
    if (rolePack) {
      const index = await rolePack.getIndex();
      const roleEntry = index.find(i => i.name.toLowerCase() === roleDef.name.toLowerCase());
      if (roleEntry) {
        const doc = await rolePack.getDocument(roleEntry._id);
        if (doc) itemsToAdd.push(doc.toObject());
      }
    }

    // 2. Search Chosen Weapons
    const weaponsToSearch = (charData.chosenWeapons && charData.chosenWeapons.length > 0)
      ? charData.chosenWeapons
      : roleDef.weaponChoices.map(wc => wc.options[0]);

    const weaponPack = game.packs.get("cyberpunk-red-core.weapons");
    if (weaponPack) {
      const wIndex = await weaponPack.getIndex();
      for (const wName of weaponsToSearch) {
        // Strip parentheticals for search matching (e.g. "Very Heavy Pistol (Quality)" -> "Very Heavy Pistol")
        const cleanName = wName.replace(/\s*\(.*?\)\s*/g, "").trim().toLowerCase();
        const entry = wIndex.find(i => i.name.toLowerCase().includes(cleanName));
        if (entry) {
          const doc = await weaponPack.getDocument(entry._id);
          if (doc) {
            const obj = doc.toObject();
            obj.system.equipped = true;
            itemsToAdd.push(obj);
          }
        }
      }
    }

    // 3. Search Armor (Light Armorjack Head & Body SP 11)
    const armorPack = game.packs.get("cyberpunk-red-core.armor");
    if (armorPack) {
      const aIndex = await armorPack.getIndex();
      const bodyArmor = aIndex.find(i => i.name.toLowerCase().includes("light armorjack body") || i.name.toLowerCase().includes("light armorjack"));
      const headArmor = aIndex.find(i => i.name.toLowerCase().includes("light armorjack head"));
      
      if (bodyArmor) {
        const doc = await armorPack.getDocument(bodyArmor._id);
        if (doc) {
          const obj = doc.toObject();
          obj.system.equipped = true;
          itemsToAdd.push(obj);
        }
      }
      if (headArmor) {
        const doc = await armorPack.getDocument(headArmor._id);
        if (doc) {
          const obj = doc.toObject();
          obj.system.equipped = true;
          itemsToAdd.push(obj);
        }
      }
    }

    // 4. Search Chosen Cyberware
    const cyberToSearch = charData.chosenCyberware || roleDef.baseCyberware || [];
    const cyberPack = game.packs.get("cyberpunk-red-core.cyberware");
    if (cyberPack) {
      const cIndex = await cyberPack.getIndex();
      for (const cName of cyberToSearch) {
        const cleanName = cName.replace(/\s*\(.*?\)\s*/g, "").trim().toLowerCase();
        const entry = cIndex.find(i => i.name.toLowerCase().includes(cleanName));
        if (entry) {
          const doc = await cyberPack.getDocument(entry._id);
          if (doc) {
            const obj = doc.toObject();
            obj.system.installed = true;
            itemsToAdd.push(obj);
          }
        }
      }
    }

    // 5. Search Programs (if Netrunner)
    if (roleDef.deckPrograms) {
      const progPack = game.packs.get("cyberpunk-red-core.programs");
      if (progPack) {
        const pIndex = await progPack.getIndex();
        for (const pName of roleDef.deckPrograms) {
          const entry = pIndex.find(i => i.name.toLowerCase() === pName.toLowerCase());
          if (entry) {
            const doc = await progPack.getDocument(entry._id);
            if (doc) itemsToAdd.push(doc.toObject());
          }
        }
      }
    }

    // 6. Search Standard Gear
    const gearPack = game.packs.get("cyberpunk-red-core.gear");
    if (gearPack && roleDef.gear) {
      const gIndex = await gearPack.getIndex();
      for (const gName of roleDef.gear) {
        const cleanName = gName.replace(/\s*\(.*?\)\s*/g, "").trim().toLowerCase();
        const entry = gIndex.find(i => i.name.toLowerCase().includes(cleanName));
        if (entry) {
          const doc = await gearPack.getDocument(entry._id);
          if (doc) itemsToAdd.push(doc.toObject());
        }
      }
    }

    if (itemsToAdd.length > 0) {
      await actor.createEmbeddedDocuments("Item", itemsToAdd);
      console.log(`CPR CharGen | Attached ${itemsToAdd.length} compendium items to ${actor.name}`);
    }
  }
}
