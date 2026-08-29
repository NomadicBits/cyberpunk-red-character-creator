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

    // 1. Create Native Base Actor (WITHOUT passing system so CPRActor.create automatically attaches all ~66 core skills & cyberware slots)
    const baseActorData = {
      name: charData.name || "Night City Edge",
      type: "character",
      img: charData.img || "icons/svg/mystery-man.svg",
      ownership: {
        default: 0,
        [game.user.id]: 3
      }
    };

    const actor = await Actor.create(baseActorData);
    console.log(`CPR CharGen | Created Native Actor with all default core skills: ${actor.name} (${actor.id})`);

    // 2. Apply Stats, Vitals, Lifepath, and Wealth via update
    const updateData = {
      "system.stats.int.value": stats.int,
      "system.stats.int.max": stats.int,
      "system.stats.ref.value": stats.ref,
      "system.stats.ref.max": stats.ref,
      "system.stats.dex.value": stats.dex,
      "system.stats.dex.max": stats.dex,
      "system.stats.tech.value": stats.tech,
      "system.stats.tech.max": stats.tech,
      "system.stats.cool.value": stats.cool,
      "system.stats.cool.max": stats.cool,
      "system.stats.will.value": stats.will,
      "system.stats.will.max": stats.will,
      "system.stats.luck.value": stats.luck,
      "system.stats.luck.max": stats.luck,
      "system.stats.move.value": stats.move,
      "system.stats.move.max": stats.move,
      "system.stats.body.value": stats.body,
      "system.stats.body.max": stats.body,
      "system.stats.emp.value": stats.emp,
      "system.stats.emp.max": stats.emp,

      "system.derivedStats.hp.value": maxHp,
      "system.derivedStats.hp.max": maxHp,
      "system.derivedStats.humanity.value": maxHumanity,
      "system.derivedStats.humanity.max": maxHumanity,

      "system.lifepath.culturalOrigin": charData.lifepath?.culturalOrigin || "",
      "system.lifepath.personality": charData.lifepath?.personality || "",
      "system.lifepath.clothingStyle": charData.lifepath?.clothingStyle || "",
      "system.lifepath.hairStyle": charData.lifepath?.hairStyle || "",
      "system.lifepath.affections": charData.lifepath?.affectation || "",
      "system.lifepath.valueMost": charData.lifepath?.valueMost || "",
      "system.lifepath.aboutPeople": charData.lifepath?.aboutPeople || "",
      "system.lifepath.familyBackground": charData.lifepath?.familyBackground || "",
      "system.lifepath.familyCrisis": charData.lifepath?.familyCrisis || "",
      "system.lifepath.lifeGoals": charData.lifepath?.lifeGoals || "",
      "system.lifepath.friends": charData.lifepath?.friend ? `${charData.lifepath.friend.who}: ${charData.lifepath.friend.relationship}` : "",
      "system.lifepath.enemies": charData.lifepath?.enemy ? `${charData.lifepath.enemy.who} (${charData.lifepath.enemy.cause})` : "",
      "system.lifepath.tragicLoveAffairs": charData.lifepath?.tragicLove || "",

      "system.information.alias": charData.name || "Street Samurai",
      "system.information.history": charData.backstory || "<p>Hit the streets in 2045.</p>",
      "system.wealth.cash": charData.startingCash || 500
    };

    await actor.update(updateData);

    // 3. Update Skill Ranks on the actor's loaded skill items
    await this.applySkillRanks(actor, charData.skills || roleDef.skills);

    // 4. Attach Role Item (e.g. Solo, Netrunner, Tech, etc.)
    await this.attachRole(actor, roleDef);

    // 5. Attach Weapons, Armor, Cyberware, Programs, and Gear
    await this.attachGearAndChrome(actor, roleDef, charData);

    ui.notifications.info(`Successfully created Cyberpunk RED character: "${actor.name}"!`);
    actor.sheet.render(true);
    return actor;
  }

  /**
   * Update skill levels on the Actor's existing skill items
   */
  static async applySkillRanks(actor, skillAllocations = {}) {
    const allSkills = actor.itemTypes.skill || [];
    const skillUpdates = [];

    // Specific key aliases mapping
    const aliases = {
      languagestreetslang: ["language", "streetslang", "languages"],
      localexpertyourhome: ["localexpert", "yourhome", "local"],
      shoulderarms: ["shoulderarms", "shoulder"],
      meleeweapon: ["meleeweapon", "melee"],
      resisttorturedrugs: ["resisttorturedrugs", "resisttorture", "resistdrugs"],
      basictech: ["basictech", "basic"],
      cybertech: ["cybertech"],
      electronicssecurity: ["electronicssecuritytech", "electronicssecurity", "securitytech"],
      weaponstech: ["weaponstech"],
      firstaid: ["firstaid"],
      paramedic: ["paramedic"],
      landvehicletech: ["landvehicletech"],
      seavehicletech: ["seavehicletech"],
      airvehicletech: ["airvehicletech"],
      driveland: ["drivelandvehicle", "driveland"],
      pilotair: ["pilotairvehicle", "pilotair"],
      pilotsea: ["pilotseavehicle", "pilotsea"],
      humanperception: ["humanperception"],
      wardrobestyle: ["wardrobestyle", "wardrobe"],
      personalgrooming: ["personalgrooming", "grooming"],
      wildernesssurvival: ["wildernesssurvival", "survival"],
      librarysearch: ["librarysearch"],
      lipreading: ["lipreading"],
      pickpocket: ["pickpocket"],
      picklock: ["picklock"],
      playinstrument: ["playinstrument", "instrument"],
      heavyweapons: ["heavyweapons"],
      martialarts: ["martialarts"]
    };

    for (const sItem of allSkills) {
      const sClean = this.cleanKey(sItem.name);
      
      let allocatedLevel = 0;
      for (const [k, v] of Object.entries(skillAllocations)) {
        const kClean = this.cleanKey(k);
        
        // 1. Direct match
        if (sClean === kClean) {
          allocatedLevel = parseInt(v, 10) || 0;
          break;
        }

        // 2. Alias match
        const aliasList = aliases[kClean];
        if (aliasList && aliasList.some(a => sClean.includes(a) || a.includes(sClean))) {
          allocatedLevel = parseInt(v, 10) || 0;
          break;
        }

        // 3. Substring match
        if (sClean.includes(kClean) || kClean.includes(sClean)) {
          allocatedLevel = parseInt(v, 10) || 0;
          break;
        }
      }

      if (allocatedLevel > 0) {
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
