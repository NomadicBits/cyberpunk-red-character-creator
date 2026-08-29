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
   * Search all available compendiums for matching items with strict type validation
   * @param {string} nameToFind Item name to search
   * @param {string} preferredType Expected Item document type ('role', 'weapon', 'armor', 'cyberware', 'gear', 'program', 'vehicle', 'ammo')
   */
  static async findCompendiumItem(nameToFind, preferredType = "") {
    if (!nameToFind) return null;
    
    // Clean target by removing common parenthetical tags
    const sanitizedName = nameToFind
      .replace(/\s*\((Quality|Standard|Moto|Gear|Head|Body|Melee Cyberware|Audio Recorder|Digital|HD|Radio Communicator|Targeting Scope|Virtuality|Chyron|Micro-Optics|Tele-Optics|Voice Stress Analyzer|Basic x100|Pistol x50|Duty x100|x10|x5|x2|500 eb|800 eb|1000 eb)\)\s*/gi, "")
      .trim();

    const cleanTarget = this.cleanKey(sanitizedName);
    const itemPacks = game.packs.filter(p => p.documentName === "Item");

    // Sort packs: put exact core_<type> first, then non-branded, then rest
    itemPacks.sort((a, b) => {
      const aId = a.metadata.id;
      const bId = b.metadata.id;
      if (preferredType) {
        const aCore = aId === `cyberpunk-red-core.core_${preferredType}` || aId.includes(preferredType);
        const bCore = bId === `cyberpunk-red-core.core_${preferredType}` || bId.includes(preferredType);
        if (aCore && !bCore) return -1;
        if (!aCore && bCore) return 1;
      }
      return 0;
    });

    const isBodyArmorSearch = preferredType === "armor" && cleanTarget.includes("body");
    const isHeadArmorSearch = preferredType === "armor" && cleanTarget.includes("head");

    // Pass 1: Look for exact clean matches across sorted packs with strict type filter
    for (const pack of itemPacks) {
      try {
        const index = await pack.getIndex({ fields: ["type", "name", "system"] });
        for (const entry of index) {
          // Strict Type Guard
          if (preferredType && entry.type !== preferredType) {
            // Allow gear / tool overlap
            if (preferredType === "gear" && (entry.type === "item" || entry.type === "tool")) {
              // allowed
            } else {
              continue;
            }
          }

          // Specific Armor Location Guards
          if (isBodyArmorSearch && entry.name.toLowerCase().includes("head")) continue;
          if (isHeadArmorSearch && entry.name.toLowerCase().includes("body")) continue;

          if (this.cleanKey(entry.name) === cleanTarget) {
            const doc = await pack.getDocument(entry._id);
            if (doc) return doc.toObject();
          }
        }
      } catch (e) {
        // Continue searching other packs
      }
    }

    // Pass 2: Substring matching with strict type filter
    for (const pack of itemPacks) {
      try {
        const index = await pack.getIndex({ fields: ["type", "name", "system"] });
        const matches = [];

        for (const entry of index) {
          // Strict Type Guard
          if (preferredType && entry.type !== preferredType) {
            if (preferredType === "gear" && (entry.type === "item" || entry.type === "tool")) {
              // allowed
            } else {
              continue;
            }
          }

          // Specific Armor Location Guards
          if (isBodyArmorSearch && entry.name.toLowerCase().includes("head")) continue;
          if (isHeadArmorSearch && entry.name.toLowerCase().includes("body")) continue;

          const cName = this.cleanKey(entry.name);
          if (cName.includes(cleanTarget) || cleanTarget.includes(cName)) {
            matches.push(entry);
          }
        }

        if (matches.length > 0) {
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

      // Ownership Configuration
      const ownerId = charData.ownerId || game.user.id;
      const ownership = {
        default: 0,
        [ownerId]: 3
      };
      if (game.user.id !== ownerId) {
        ownership[game.user.id] = 3;
      }

      // 1. Create Base Actor
      const defaultIcon = "systems/cyberpunk-red-core/icons/compendium/default/Default_CPR_Mystery_Man.svg";
      const baseActorData = {
        name: charData.name || "Night City Edge",
        type: "character",
        img: charData.img || defaultIcon,
        folder: charData.folder || null,
        ownership: ownership,
        prototypeToken: {
          name: charData.name || "Night City Edge",
          actorLink: true,
          disposition: 1,
          bar1: { attribute: "derivedStats.hp" },
          texture: {
            src: charData.img || defaultIcon
          }
        }
      };

      console.log("CPR CharGen | Creating base character actor...", baseActorData);
      const actor = await Actor.create(baseActorData);
      console.log(`CPR CharGen | Base Actor created: ${actor.name} (${actor.id})`);

      // 2. Guarantee ALL 66 Core Skills are present on the actor
      let currentSkills = actor.itemTypes.skill || [];
      if (currentSkills.length < 50) {
        console.log(`CPR CharGen | Seeding complete 66 core skill set onto ${actor.name}...`);
        const skillsToCreate = CPR_CORE_SKILLS.map(s => foundry.utils.duplicate(s));
        const createdDocs = await actor.createEmbeddedDocuments("Item", skillsToCreate);
        console.log(`CPR CharGen | Embedded ${createdDocs.length} skills onto ${actor.name}`);
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

      // 5. Attach Role Item
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
    const existingRoles = actor.itemTypes.role || [];
    if (existingRoles.length > 0) {
      await actor.deleteEmbeddedDocuments("Item", existingRoles.map(r => r.id));
    }

    const roleDoc = await this.findCompendiumItem(roleDef.name, "role");
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
      const wDoc = await this.findCompendiumItem(wName, "weapon");
      if (wDoc) {
        if (wDoc.system && "equipped" in wDoc.system) {
          wDoc.system.equipped = "equipped";
        }
        itemsToAdd.push(wDoc);
      }
    }

    // 2. Armor (Light Armorjack Body & Head SP 11 - Exactly ONE Body and ONE Head)
    const bodyArmor = await this.findCompendiumItem("Light Armorjack (Body)", "armor") || await this.findCompendiumItem("Light Armorjack Body", "armor");
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
        const pDoc = await this.findCompendiumItem(pName, "program");
        if (pDoc) itemsToAdd.push(pDoc);
      }
    }

    // 5. Gear & Instruments & Vehicles & Ammo (Strictly gear/item type, skip armor)
    const gearToFind = [...(roleDef.gear || [])];
    if (charData.chosenVehicle) gearToFind.push(charData.chosenVehicle);
    if (charData.chosenInstrument) gearToFind.push(charData.chosenInstrument);

    for (const gName of gearToFind) {
      if (gName.toLowerCase().includes("eurodollar") || gName.toLowerCase().includes("eb")) continue;
      if (gName.toLowerCase().includes("armorjack") || gName.toLowerCase().includes("armor") || gName.toLowerCase().includes("helmet")) continue;
      
      const isAmmo = gName.toLowerCase().includes("ammo");
      const prefType = isAmmo ? "ammo" : "gear";
      const gDoc = await this.findCompendiumItem(gName, prefType);
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

  /**
   * Automated Test Runner:
   * Generates a Streetrat Solo under a specified user in a dedicated folder,
   * then performs a comprehensive validation audit on the created Actor document.
   *
   * @param {string} userName Target user name (defaults to "Brad")
   * @param {string} folderName Target folder name (defaults to "AI test")
   * @returns {Promise<Object>} Detailed audit report
   */
  static async testCreateSolo(userName = "Brad", folderName = "AI test") {
    console.log(`%c=== STARTING CPR CHARGEN TEST: Streetrat Solo for ${userName} in "${folderName}" ===`, "color: #00f0ff; font-weight: bold;");

    // 1. Locate or create folder
    let folder = game.folders.find(f => f.type === "Actor" && f.name.toLowerCase() === folderName.toLowerCase());
    if (!folder) {
      folder = await Folder.create({
        name: folderName,
        type: "Actor",
        color: "#ff003c"
      });
      console.log(`CPR CharGen Test | Created Folder "${folder.name}" (${folder.id})`);
    }

    // 2. Locate target user
    const targetUser = game.users.find(u => u.name.toLowerCase() === userName.toLowerCase()) || game.user;
    console.log(`CPR CharGen Test | Target User: "${targetUser.name}" (${targetUser.id})`);

    // 3. Build Streetrat Solo configuration
    const soloRole = CPR_ROLES.solo;
    const testData = {
      name: `Streetrat Solo (${targetUser.name})`,
      role: "solo",
      folder: folder.id,
      ownerId: targetUser.id,
      stats: soloRole.statTemplates[0],
      skills: soloRole.skills,
      chosenWeapons: ["Assault Rifle", "Very Heavy Pistol"],
      chosenCyberware: ["Neural Link", "Interface Plugs", "Subdermal Armor"],
      lifepath: {
        culturalOrigin: "North American (English)",
        personality: "Focused, disciplined, and calm",
        clothingStyle: "Generic Chic",
        hairStyle: "Short and cropped buzzcut",
        affectation: "Combat scarred face from close-range shrapnel",
        valueMost: "Honor (Your word is your bonded guarantee)",
        aboutPeople: "I stay neutral. Everyone is just trying to survive.",
        familyBackground: "Megabuilding Blue Collar",
        familyCrisis: "Parents vanished into the Combat Zone without a trace.",
        lifeGoals: "Establish my own syndicate or edgerunner mercenary outfit in Night City.",
        friend: { who: "Dante (Ex-Trauma Team)", relationship: "Saved your life in a crossfire" },
        enemy: { who: "Vortex (Maelstrom)", cause: "Stole a prototype cyberware crate" },
        tragicLove: "Lover died in an Arasaka orbital strike during the 4th Corporate War"
      },
      backstory: "<p>A battle-tested street soldier operating out of the Heywood district.</p>",
      startingCash: 500
    };

    // 4. Instantiate Actor
    const actor = await this.createActor(testData);

    // 5. Perform Comprehensive Sheet Audit
    const audit = {
      actorId: actor.id,
      name: actor.name,
      folder: actor.folder?.name,
      owner: targetUser.name,
      hasOwnership: actor.testUserPermission(targetUser, "OWNER"),
      stats: {
        int: actor.system.stats.int.value,
        ref: actor.system.stats.ref.value,
        dex: actor.system.stats.dex.value,
        tech: actor.system.stats.tech.value,
        cool: actor.system.stats.cool.value,
        will: actor.system.stats.will.value,
        luck: actor.system.stats.luck.value,
        move: actor.system.stats.move.value,
        body: actor.system.stats.body.value,
        emp: actor.system.stats.emp.value
      },
      derivedStats: {
        hp: `${actor.system.derivedStats.hp.value}/${actor.system.derivedStats.hp.max}`,
        humanity: `${actor.system.derivedStats.humanity.value}/${actor.system.derivedStats.humanity.max}`
      },
      totalSkillsCount: actor.itemTypes.skill.length,
      allocatedSkillsPassed: 0,
      allocatedSkillsTotal: Object.keys(soloRole.skills).length,
      allocatedSkillsDetails: {},
      roleAttached: actor.itemTypes.role.map(r => `${r.name} (Rank ${r.system.rank})`),
      weapons: actor.itemTypes.weapon.map(w => `${w.name} (${w.system.equipped})`),
      armors: actor.itemTypes.armor.map(a => `${a.name} (${a.system.equipped})`),
      cyberware: actor.itemTypes.cyberware.map(c => `${c.name} (${c.system.equipped})`),
      installedCyberwareList: actor.system.installedItems?.list || [],
      gear: actor.itemTypes.gear.map(g => `${g.name} (${g.system.equipped})`),
      cash: actor.system.wealth.cash
    };

    // Verify each allocated skill rank
    for (const [sKey, expectedRank] of Object.entries(soloRole.skills)) {
      const cleanTarget = this.cleanKey(sKey);
      const match = actor.itemTypes.skill.find(s => {
        const sClean = this.cleanKey(s.name);
        return sClean === cleanTarget || sClean.includes(cleanTarget) || cleanTarget.includes(sClean);
      });
      const actualRank = match ? match.system.level : 0;
      const pass = actualRank === expectedRank;
      if (pass) audit.allocatedSkillsPassed++;
      audit.allocatedSkillsDetails[sKey] = {
        expected: expectedRank,
        actual: actualRank,
        passed: pass
      };
    }

    console.log("%c=== CPR CHARGEN TEST AUDIT REPORT ===", "color: #00ff66; font-weight: bold;", audit);
    ui.notifications.info(`AI Test Complete: "${actor.name}" created under ${targetUser.name} in folder "${folderName}"!`);
    return audit;
  }
}
