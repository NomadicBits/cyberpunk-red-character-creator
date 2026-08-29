/**
 * Official Complete Cyberpunk RED Core Skills Definition Database
 * Guarantees all 66 standard skills are initialized on every character sheet
 * regardless of compendium permission locks.
 */

export const CPR_CORE_SKILLS = [
  // Awareness Skills
  { name: "Concentration", type: "skill", system: { stat: "will", category: "awarenessSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Conceal/Reveal Object", type: "skill", system: { stat: "int", category: "awarenessSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Lip Reading", type: "skill", system: { stat: "int", category: "awarenessSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Perception", type: "skill", system: { stat: "int", category: "awarenessSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Tracking", type: "skill", system: { stat: "int", category: "awarenessSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },

  // Body Skills
  { name: "Athletics", type: "skill", system: { stat: "dex", category: "bodySkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Contortionist", type: "skill", system: { stat: "dex", category: "bodySkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Dance", type: "skill", system: { stat: "dex", category: "bodySkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Endurance", type: "skill", system: { stat: "will", category: "bodySkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Resist Torture/Drugs", type: "skill", system: { stat: "will", category: "bodySkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Stealth", type: "skill", system: { stat: "dex", category: "bodySkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },

  // Control Skills
  { name: "Drive Land Vehicle", type: "skill", system: { stat: "ref", category: "controlSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Pilot Air Vehicle", type: "skill", system: { stat: "ref", category: "controlSkills", difficulty: "difficult", skillType: "generic", level: 0, core: true } },
  { name: "Pilot Sea Vehicle", type: "skill", system: { stat: "ref", category: "controlSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Riding", type: "skill", system: { stat: "ref", category: "controlSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },

  // Education Skills
  { name: "Accounting", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Animal Handling", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Bureaucracy", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Business", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Composition", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Criminology", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Cryptography", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Deduction", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Education", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Gamble", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Language (Streetslang)", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "language", level: 0, core: true } },
  { name: "Library Search", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Local Expert (Your Home)", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "localExpert", level: 0, core: true } },
  { name: "Science (Chemistry)", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "science", level: 0, core: true } },
  { name: "Science (Cryogenics)", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "science", level: 0, core: true } },
  { name: "Tactics", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Wilderness Survival", type: "skill", system: { stat: "int", category: "educationSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },

  // Fighting Skills
  { name: "Brawling", type: "skill", system: { stat: "dex", category: "fightingSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Evasion", type: "skill", system: { stat: "dex", category: "fightingSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Martial Arts", type: "skill", system: { stat: "dex", category: "fightingSkills", difficulty: "difficult", skillType: "martialArt", level: 0, core: true } },
  { name: "Melee Weapon", type: "skill", system: { stat: "dex", category: "fightingSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },

  // Performance Skills
  { name: "Acting", type: "skill", system: { stat: "cool", category: "performanceSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Play Instrument", type: "skill", system: { stat: "tech", category: "performanceSkills", difficulty: "typical", skillType: "instrument", level: 0, core: true } },

  // Ranged Weapon Skills
  { name: "Autofire", type: "skill", system: { stat: "ref", category: "rangedweaponSkills", difficulty: "difficult", skillType: "generic", level: 0, core: true } },
  { name: "Handgun", type: "skill", system: { stat: "ref", category: "rangedweaponSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Heavy Weapons", type: "skill", system: { stat: "ref", category: "rangedweaponSkills", difficulty: "difficult", skillType: "generic", level: 0, core: true } },
  { name: "Shoulder Arms", type: "skill", system: { stat: "ref", category: "rangedweaponSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },

  // Social Skills
  { name: "Bribery", type: "skill", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Conversation", type: "skill", system: { stat: "emp", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Human Perception", type: "skill", system: { stat: "emp", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Interrogation", type: "skill", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Persuasion", type: "skill", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Personal Grooming", type: "skill", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Streetwise", type: "skill", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Trading", type: "skill", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Wardrobe & Style", type: "skill", system: { stat: "cool", category: "socialSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },

  // Technique Skills
  { name: "Air Vehicle Tech", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Basic Tech", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Cybertech", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Demolitions", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "difficult", skillType: "generic", level: 0, core: true } },
  { name: "Electronics/Security Tech", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "difficult", skillType: "generic", level: 0, core: true } },
  { name: "First Aid", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Forgery", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Land Vehicle Tech", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Paint/Draw/Sculpt", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Paramedic", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "difficult", skillType: "generic", level: 0, core: true } },
  { name: "Photography/Film", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Pick Lock", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Pick Pocket", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Sea Vehicle Tech", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } },
  { name: "Weaponstech", type: "skill", system: { stat: "tech", category: "techniqueSkills", difficulty: "typical", skillType: "generic", level: 0, core: true } }
];
