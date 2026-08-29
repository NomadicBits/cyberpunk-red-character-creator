/**
 * Cyberpunk RED Foundry Actor Builder
 * Creates native 'character' actors in Foundry VTT v12 with full stats, embedded skill items, gear, and lifepath
 */

import { CPR_ROLES } from "./cpr-chargen-data.js";
import { CPR_CORE_SKILLS } from "./cpr-chargen-skills.js";

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
    
    // Clean target by removing common parenthetical tags
    const sanitizedName = nameToFind
      .replace(/\s*\((Quality|Standard|Moto|Gear|Head|Body|Melee Cyberware|Audio Recorder|Digital|HD|Radio Communicator|Targeting Scope|Virtuality|Chyron|Micro-Optics|Tele-Optics|Voice Stress Analyzer|Basic x100|Pistol x50|Duty x100|x10|x5|x2|500 eb|800 eb|1000 eb)\)\s*/gi, "")
      .trim();

    const cleanTarget = this.cleanKey(sanitizedName);
    const itemPacks = game.packs.filter(p => p.documentName === "Item");

    // Sort packs: put exact core_<prefix> first, then other <prefix> packs, then rest
    itemPacks.sort((a, b) => {
      const aId = a.metadata.id;
      const bId = b.metadata.id;
      if (preferredPackPrefix) {
        const aCore = aId === `cyberpunk-red-core.core_${preferredPackPrefix}`;
        const bCore = bId === `cyberpunk-red-core.core_${preferredPackPrefix}`;
        if (aCore && !bCore) return -1;
        if (!aCore && bCore) return 1;

        const aHasPref = aId.includes(preferredPackPrefix) && !aId.includes("branded");
        const bHasPref = bId.includes(preferredPackPrefix) && !bId.includes("branded");
        if (aHasPref && !bHasPref) return -1;
        if (!aHasPref && bHasPref) return 1;
      }
      return 0;
    });

    // Pass 1: Look for exact clean matches across sorted packs
    for (const pack of itemPacks) {
      try {
        const index = await pack.getIndex({ fields: ["type", "name", "system"] });
        const exactEntry = index.find(i => this.cleanKey(i.name) === cleanTarget);
        if (exactEntry) {
          const doc = await pack.getDocument(exactEntry._id);
          if (doc) return doc.toObject();
        }
      } catch (e) {
        // Continue searching other packs
      }
    }

    // Pass 2: Look for substring matches across sorted packs (preferring closest length)
    for (const pack of itemPacks) {
      try {
        const index = await pack.getIndex({ fields: ["type", "name", "system"] });
        const matches = index.filter(i => {
          const cName = this.cleanKey(i.name);
          return cName.includes(cleanTarget) || cleanTarget.includes(cName);
        });

        if (matches.length > 0) {
          // Sort by string length difference to pick closest match
          matches.sort((a, b) => Math.abs(a.name.length - sanitizedName.length) - Math.abs(b.name.length - sanitizedName.length));
          const doc = await pack.getDocument(matches[0]._id);
          if (doc) return doc.toObject();
        }
      } catch (e) {
        // Continue searching other packs
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
    try {
      const roleKey = charData.role?.toLowerCase() || "solo";
      const roleDef = CPR_ROLES[roleKey] || CPR_ROLES.solo;
      const stats = charData.stats || roleDef.statTemplates[0];

      // Compute Derived Stats
      const body = stats.body || 6;
      const will = stats.will || 6;
      const emp = stats.emp || 4;
      const maxHp = 10 + (5 * Math.ceil((body + will) / 2));
      const maxHumanity = emp * 10;

      // 1. Create Base Actor
      const baseActorData = {
        name: charData.name || "Night City Edge",
        type: "character",
        img: charData.img || "icons/svg/mystery-man.svg",
        items: [],
        ownership: {
          default: 0,
          [game.user.id]: 3
        }
      };

      console.log("CPR CharGen | Creating base actor...", baseActorData);
      const actor = await Actor.create(baseActorData);
      console.log(`CPR CharGen | Base Actor created: ${actor.name} (${actor.id})`);

      // 2. Ensure ALL 66 Core Skills are present on the actor
      const existingSkills = actor.itemTypes.skill || [];
      if (existingSkills.length < 50) {
        console.log(`CPR CharGen | Seeding all 66 official core skills onto ${actor.name}...`);
        const skillsToCreate = CPR_CORE_SKILLS.map(s => foundry.utils.duplicate(s));
        await actor.createEmbeddedDocuments("Item", skillsToCreate);
      }

      // 3. Apply Stats, Vitals, Lifepath, and Wealth
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
        "system.wealth.cash": charData.startingCash || (roleKey === "exec" ? 1000 : (roleKey === "fixer" ? 800 : 500))
      };

      await actor.update(updateData);

      // 4. Update Skill Ranks
      await this.applySkillRanks(actor, charData.skills || roleDef.skills);

      // 5. Attach Role Item (cleaning any old role duplicates first)
      await this.attachRole(actor, roleDef);

      // 6. Attach Weapons, Armor, Cyberware, Programs, and Gear
      await this.attachGearAndChrome(actor, roleDef, charData);

      ui.notifications.info(`Successfully created Cyberpunk RED character: "${actor.name}"!`);
      actor.sheet.render(true);
      return actor;
    } catch (err) {
      console.error("CPR CharGen | Error creating character actor:", err);
      ui.notifications.error(`Failed to create character: ${err.message}`);
      throw err;
    }
  }

  /**
   * Update skill levels on the Actor's existing skill items
   */
  static async applySkillRanks(actor, skillAllocations = {}) {
    const allSkills = actor.itemTypes.skill || [];
    const skillUpdates = [];

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
      martialarts: ["martialarts"],
      performanceacting: ["performanceacting", "acting", "performance"]
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
    // Delete any existing role items to prevent duplicates
    const existingRoles = actor.itemTypes.role || [];
    if (existingRoles.length > 0) {
      await actor.deleteEmbeddedDocuments("Item", existingRoles.map(r => r.id));
    }

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

    // 1. Weapons (Equipped state is "equipped" string)
    const weaponsToFind = (charData.chosenWeapons && charData.chosenWeapons.length > 0)
      ? charData.chosenWeapons
      : (roleDef.weaponChoices ? roleDef.weaponChoices.map(wc => wc.options[0]) : []);

    for (const wName of weaponsToFind) {
      const wDoc = await this.findCompendiumItem(wName, "weapons");
      if (wDoc) {
        if (wDoc.system && "equipped" in wDoc.system) {
          wDoc.system.equipped = "equipped";
        }
        itemsToAdd.push(wDoc);
      }
    }

    // 2. Armor (Light Armorjack Body & Head SP 11 - Equipped state is "equipped" string)
    const bodyArmor = await this.findCompendiumItem("Light Armorjack (Body)", "armor") || await this.findCompendiumItem("Light Armorjack Body", "armor") || await this.findCompendiumItem("Light Armorjack", "armor");
    if (bodyArmor) {
      if (bodyArmor.system && "equipped" in bodyArmor.system) {
        bodyArmor.system.equipped = "equipped";
      }
      itemsToAdd.push(bodyArmor);
    }
    const headArmor = await this.findCompendiumItem("Light Armorjack (Head)", "armor") || await this.findCompendiumItem("Light Armorjack Head", "armor");
    if (headArmor) {
      if (headArmor.system && "equipped" in headArmor.system) {
        headArmor.system.equipped = "equipped";
      }
      itemsToAdd.push(headArmor);
    }

    // 3. Cyberware (Installable items)
    const cyberToFind = (charData.chosenCyberware && charData.chosenCyberware.length > 0)
      ? charData.chosenCyberware
      : (roleDef.baseCyberware || []);

    const createdCyberwareDocs = [];
    for (const cName of cyberToFind) {
      const cDoc = await this.findCompendiumItem(cName, "cyberware");
      if (cDoc) {
        if (cDoc.system && "equipped" in cDoc.system) {
          cDoc.system.equipped = "equipped";
        }
        createdCyberwareDocs.push(cDoc);
      }
    }

    // 4. Programs (Netrunner)
    if (roleDef.deckPrograms && Array.isArray(roleDef.deckPrograms)) {
      for (const pName of roleDef.deckPrograms) {
        const pDoc = await this.findCompendiumItem(pName, "programs");
        if (pDoc) itemsToAdd.push(pDoc);
      }
    }

    // 5. Gear & Instruments & Vehicles & Ammo
    const gearToFind = [...(roleDef.gear || [])];
    if (charData.chosenVehicle) gearToFind.push(charData.chosenVehicle);
    if (charData.chosenInstrument) gearToFind.push(charData.chosenInstrument);

    for (const gName of gearToFind) {
      if (gName.toLowerCase().includes("eurodollar") || gName.toLowerCase().includes("eb")) continue;
      
      const isAmmo = gName.toLowerCase().includes("ammo");
      const prefPack = isAmmo ? "ammo" : "gear";
      const gDoc = await this.findCompendiumItem(gName, prefPack);
      if (gDoc) {
        if (gDoc.system && "equipped" in gDoc.system) {
          gDoc.system.equipped = "carried";
        }
        itemsToAdd.push(gDoc);
      }
    }

    // Add all standard items
    const allEmbedded = itemsToAdd.concat(createdCyberwareDocs);
    if (allEmbedded.length > 0) {
      const createdItems = await actor.createEmbeddedDocuments("Item", allEmbedded);
      console.log(`CPR CharGen | Attached ${createdItems.length} items to ${actor.name}`);

      // Install newly added cyberware in actor.system.installedItems.list
      const cyberItems = createdItems.filter(i => i.type === "cyberware");
      if (cyberItems.length > 0) {
        const currentList = Array.from(actor.system.installedItems?.list || []);
        cyberItems.forEach(ci => {
          if (!currentList.includes(ci.id)) currentList.push(ci.id);
        });
        await actor.update({ "system.installedItems.list": currentList });
        console.log(`CPR CharGen | Installed ${cyberItems.length} cyberware items into ${actor.name}`);
      }
    }
  }
}
