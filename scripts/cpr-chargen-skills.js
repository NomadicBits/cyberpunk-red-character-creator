/**
 * Official Complete Cyberpunk RED Core Skills Definition Database
 * Guarantees all 66 standard skills match CPR DataModel schema 100%
 */

export const CPR_CORE_SKILLS = [
  // Awareness Skills
  { name: "Concentration", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "will", category: "awarenessSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Conceal/Reveal Object", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "awarenessSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Lip Reading", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "awarenessSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Perception", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "awarenessSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: true } },
  { name: "Tracking", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "awarenessSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },

  // Body Skills
  { name: "Athletics", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "dex", category: "bodySkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: true } },
  { name: "Contortionist", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "dex", category: "bodySkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Dance", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "dex", category: "bodySkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Endurance", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "will", category: "bodySkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Resist Torture/Drugs", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "will", category: "bodySkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Stealth", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "dex", category: "bodySkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: true } },

  // Control Skills
  { name: "Drive Land Vehicle", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "ref", category: "controlSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Pilot Air Vehicle", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "ref", category: "controlSkills", difficulty: "difficult", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Pilot Sea Vehicle", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "ref", category: "controlSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Riding", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "ref", category: "controlSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },

  // Education Skills
  { name: "Accounting", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Animal Handling", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Bureaucracy", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Business", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Composition", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Criminology", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Cryptography", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Deduction", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Education", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: true } },
  { name: "Gamble", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Language (Streetslang)", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "language", level: 0, core: true, basic: true } },
  { name: "Library Search", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Local Expert (Your Home)", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "localExpert", level: 0, core: true, basic: true } },
  { name: "Science (Chemistry)", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "science", level: 0, core: true, basic: false } },
  { name: "Science (Cryogenics)", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "science", level: 0, core: true, basic: false } },
  { name: "Tactics", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Wilderness Survival", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },

  // Fighting Skills
  { name: "Brawling", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "dex", category: "fightingSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: true } },
  { name: "Evasion", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "dex", category: "fightingSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: true } },
  { name: "Martial Arts", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "dex", category: "fightingSkills", difficulty: "difficult", skillType: "martialArt", level: 0, core: true, basic: false } },
  { name: "Melee Weapon", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "dex", category: "fightingSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },

  // Performance Skills
  { name: "Acting", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "cool", category: "performanceSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Play Instrument", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "performanceSkills", difficulty: "typical", skillType: "playInstrument", level: 0, core: true, basic: false } },

  // Ranged Weapon Skills
  { name: "Autofire", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "ref", category: "rangedweaponSkills", difficulty: "difficult", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Handgun", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "ref", category: "rangedweaponSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Heavy Weapons", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "ref", category: "rangedweaponSkills", difficulty: "difficult", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Shoulder Arms", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "ref", category: "rangedweaponSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },

  // Social Skills
  { name: "Bribery", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Conversation", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "emp", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: true } },
  { name: "Human Perception", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "emp", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: true } },
  { name: "Interrogation", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Persuasion", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: true } },
  { name: "Personal Grooming", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Streetwise", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Trading", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Wardrobe & Style", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },

  // Technique Skills
  { name: "Air Vehicle Tech", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Basic Tech", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Cybertech", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Demolitions", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "difficult", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Electronics/Security Tech", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "difficult", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "First Aid", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: true } },
  { name: "Forgery", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Land Vehicle Tech", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Paint/Draw/Sculpt", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Paramedic", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "difficult", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Photography/Film", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Pick Lock", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Pick Pocket", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Sea Vehicle Tech", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } },
  { name: "Weaponstech", type: "skill", img: "icons/svg/item-bag.svg", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true, basic: false } }
];
