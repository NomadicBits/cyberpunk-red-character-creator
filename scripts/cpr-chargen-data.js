/**
 * Official Cyberpunk RED Character Generation Reference Data
 * Core Rulebook (p. 86–108) - Streetrat, Edgerunner, Loadouts & Lifepath Tables
 */

export const CPR_ROLES = {
  solo: {
    name: "Solo",
    ability: "Combat Awareness",
    tagline: "Assassin, bodyguard, and street soldier specialized in lethal combat",
    statTemplates: [
      { int: 7, ref: 8, dex: 7, tech: 3, cool: 7, will: 7, luck: 6, move: 6, body: 8, emp: 3 },
      { int: 6, ref: 8, dex: 8, tech: 3, cool: 6, will: 7, luck: 6, move: 7, body: 7, emp: 4 },
      { int: 7, ref: 8, dex: 7, tech: 2, cool: 7, will: 7, luck: 5, move: 6, body: 8, emp: 5 },
      { int: 6, ref: 8, dex: 7, tech: 3, cool: 8, will: 6, luck: 6, move: 6, body: 8, emp: 4 },
      { int: 5, ref: 8, dex: 8, tech: 4, cool: 6, will: 8, luck: 5, move: 6, body: 8, emp: 4 },
      { int: 6, ref: 8, dex: 8, tech: 2, cool: 7, will: 6, luck: 7, move: 7, body: 7, emp: 4 },
      { int: 7, ref: 8, dex: 8, tech: 3, cool: 6, will: 6, luck: 6, move: 6, body: 7, emp: 5 },
      { int: 5, ref: 8, dex: 7, tech: 4, cool: 7, will: 7, luck: 6, move: 7, body: 8, emp: 3 },
      { int: 6, ref: 8, dex: 8, tech: 3, cool: 6, will: 7, luck: 5, move: 7, body: 8, emp: 4 },
      { int: 6, ref: 8, dex: 8, tech: 3, cool: 7, will: 7, luck: 6, move: 6, body: 7, emp: 4 }
    ],
    skills: {
      athletics: 2, autofire: 6, basicTech: 2, brawling: 2, concentration: 2,
      conversation: 2, deduction: 2, driveLand: 2, education: 2, evasion: 6,
      firstAid: 6, handgun: 6, humanPerception: 2, interrogation: 4, languageStreetslang: 4,
      localExpertYourHome: 2, meleeWeapon: 6, perception: 6, persuasion: 2,
      resistTortureDrugs: 6, shoulderArms: 6, stealth: 2, tactics: 6
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Primary Longarm", options: ["Assault Rifle", "Shotgun", "Heavy SMG"] },
      { id: "secondaryWeapon", label: "Secondary Weapon", options: ["Very Heavy Pistol", "Heavy Melee Weapon"] }
    ],
    cyberwareChoices: [
      { id: "soloOpticOrArmor", label: "Combat Augmentation", options: ["Cybereye (Targeting Scope)", "Subdermal Armor", "Wolvers (Melee Cyberware)"] }
    ],
    baseCyberware: ["Neural Link", "Interface Plugs"],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Agent", "Light Armorjack Body", "Light Armorjack Head", "Basic Medtech Kit", "Handcuffs", "Ammo (Basic x100)", "Eurodollars (500 eb)"]
  },

  netrunner: {
    name: "Netrunner",
    ability: "Interface",
    tagline: "Cyber-hacker, virtual infiltrator, and electronics specialist",
    statTemplates: [
      { int: 8, ref: 7, dex: 6, tech: 7, cool: 6, will: 7, luck: 6, move: 6, body: 5, emp: 4 },
      { int: 8, ref: 8, dex: 6, tech: 8, cool: 5, will: 6, luck: 6, move: 5, body: 5, emp: 5 },
      { int: 7, ref: 7, dex: 7, tech: 8, cool: 6, will: 6, luck: 7, move: 6, body: 4, emp: 4 },
      { int: 8, ref: 7, dex: 7, tech: 7, cool: 5, will: 7, luck: 5, move: 6, body: 5, emp: 5 },
      { int: 8, ref: 6, dex: 7, tech: 8, cool: 6, will: 6, luck: 6, move: 7, body: 4, emp: 4 },
      { int: 7, ref: 8, dex: 6, tech: 8, cool: 6, will: 7, luck: 5, move: 6, body: 5, emp: 4 },
      { int: 8, ref: 7, dex: 6, tech: 7, cool: 7, will: 6, luck: 6, move: 6, body: 4, emp: 5 },
      { int: 8, ref: 8, dex: 6, tech: 7, cool: 6, will: 6, luck: 6, move: 6, body: 5, emp: 4 },
      { int: 7, ref: 7, dex: 7, tech: 8, cool: 5, will: 7, luck: 6, move: 5, body: 5, emp: 5 },
      { int: 8, ref: 7, dex: 7, tech: 8, cool: 6, will: 6, luck: 5, move: 6, body: 4, emp: 5 }
    ],
    skills: {
      athletics: 2, basicTech: 4, brawling: 2, concealReveal: 2, concentration: 2,
      conversation: 2, cryptography: 6, cybertech: 6, deduction: 6, education: 2,
      electronicsSecurity: 6, evasion: 6, firstAid: 2, handgun: 6, humanPerception: 2,
      languageStreetslang: 4, librarySearch: 6, localExpertYourHome: 2, perception: 6,
      persuasion: 2, shoulderArms: 2, stealth: 6, weaponstech: 2
    },
    weaponChoices: [
      { id: "sidearm", label: "Sidearm Choice", options: ["Heavy Pistol", "Very Heavy Pistol", "SMG"] }
    ],
    cyberwareChoices: [
      { id: "virtualityOption", label: "Interface / Virtuality Augment", options: ["Virtuality Goggles (Gear)", "Cybereye (Virtuality)", "Chyron"] }
    ],
    baseCyberware: ["Neural Link", "Interface Plugs"],
    deckPrograms: ["Sword", "Armor", "Eraser", "SeeYa", "Worm", "Speedbrk"],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Cyberdeck (Standard)", "Cables", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Pistol x50)", "Memory Chips (x5)", "Eurodollars (500 eb)"]
  },

  tech: {
    name: "Tech",
    ability: "Maker",
    tagline: "Re-engineer, jury-rig, and fabricate weapons, machines, and tech",
    statTemplates: [
      { int: 7, ref: 7, dex: 7, tech: 8, cool: 6, will: 6, luck: 6, move: 6, body: 5, emp: 4 },
      { int: 8, ref: 6, dex: 7, tech: 8, cool: 5, will: 7, luck: 6, move: 6, body: 6, emp: 3 },
      { int: 7, ref: 7, dex: 6, tech: 8, cool: 6, will: 6, luck: 7, move: 5, body: 6, emp: 4 },
      { int: 6, ref: 7, dex: 7, tech: 8, cool: 6, will: 7, luck: 6, move: 6, body: 5, emp: 4 },
      { int: 8, ref: 7, dex: 6, tech: 8, cool: 5, will: 6, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 7, ref: 6, dex: 8, tech: 8, cool: 6, will: 6, luck: 5, move: 7, body: 5, emp: 4 },
      { int: 6, ref: 8, dex: 6, tech: 8, cool: 6, will: 6, luck: 7, move: 6, body: 6, emp: 3 },
      { int: 7, ref: 7, dex: 7, tech: 8, cool: 5, will: 6, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 8, ref: 6, dex: 6, tech: 8, cool: 6, will: 7, luck: 6, move: 5, body: 6, emp: 4 },
      { int: 7, ref: 7, dex: 6, tech: 8, cool: 6, will: 6, luck: 6, move: 6, body: 6, emp: 4 }
    ],
    skills: {
      airVehicleTech: 2, athletics: 2, basicTech: 6, brawling: 2, concentration: 2,
      conversation: 2, cybertech: 6, driveLand: 4, education: 2, electronicsSecurity: 6,
      evasion: 6, firstAid: 2, handgun: 4, humanPerception: 2, landVehicleTech: 6,
      languageStreetslang: 4, localExpertYourHome: 2, perception: 6, persuasion: 2,
      scienceChemistry: 4, shoulderArms: 6, stealth: 2, weaponstech: 6
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Primary Longarm", options: ["Shotgun", "Assault Rifle"] },
      { id: "secondaryWeapon", label: "Secondary Weapon", options: ["Heavy Pistol", "Light Melee Weapon"] }
    ],
    cyberwareChoices: [
      { id: "techAugment", label: "Technical Augmentation", options: ["Cybereye (Micro-Optics)", "Tool Hand (Cyberarm)", "Techhair & Biomonitor"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Tech Tool Kit", "Techscanner", "Flashlight", "Duct Tape", "Road Flares (x5)", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Basic x100)", "Eurodollars (500 eb)"]
  },

  medtech: {
    name: "Medtech",
    ability: "Medicine",
    tagline: "Street surgeon, paramedic, and ripperdoc saving lives in the combat zone",
    statTemplates: [
      { int: 8, ref: 7, dex: 6, tech: 8, cool: 6, will: 7, luck: 5, move: 6, body: 5, emp: 5 },
      { int: 7, ref: 7, dex: 7, tech: 8, cool: 5, will: 6, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 8, ref: 6, dex: 6, tech: 8, cool: 6, will: 7, luck: 6, move: 6, body: 5, emp: 5 },
      { int: 7, ref: 7, dex: 7, tech: 7, cool: 6, will: 7, luck: 5, move: 5, body: 6, emp: 5 },
      { int: 8, ref: 7, dex: 6, tech: 8, cool: 5, will: 6, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 7, ref: 6, dex: 7, tech: 8, cool: 6, will: 6, luck: 7, move: 6, body: 5, emp: 5 },
      { int: 8, ref: 7, dex: 7, tech: 7, cool: 6, will: 6, luck: 5, move: 6, body: 6, emp: 4 },
      { int: 7, ref: 7, dex: 6, tech: 8, cool: 5, will: 7, luck: 6, move: 6, body: 5, emp: 5 },
      { int: 8, ref: 6, dex: 7, tech: 8, cool: 6, will: 6, luck: 6, move: 5, body: 6, emp: 4 },
      { int: 7, ref: 7, dex: 6, tech: 8, cool: 6, will: 7, luck: 5, move: 6, body: 5, emp: 5 }
    ],
    skills: {
      athletics: 2, basicTech: 4, brawling: 2, concentration: 2, conversation: 2,
      cybertech: 4, deduction: 4, driveLand: 4, education: 6, evasion: 6,
      firstAid: 6, handgun: 4, humanPerception: 6, languageStreetslang: 4,
      localExpertYourHome: 2, paramedic: 6, perception: 6, persuasion: 2,
      resistTortureDrugs: 4, scienceCryogenics: 2, shoulderArms: 6, stealth: 2
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Primary Longarm", options: ["Shotgun", "Assault Rifle"] },
      { id: "secondaryWeapon", label: "Secondary Weapon", options: ["Heavy Pistol", "Cryo-Spray Injector"] }
    ],
    cyberwareChoices: [
      { id: "medtechAugment", label: "Medical Augmentation", options: ["Cybereye (Micro-Optics)", "Cybereye (Tele-Optics)", "Biomonitor & Subdermal Pocket"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Medtech Bag", "Cryopump", "Dermal Stapler", "Trauma Dermal Patches (x5)", "Speedheal Doses (x2)", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Basic x100)", "Eurodollars (500 eb)"]
  },

  media: {
    name: "Media",
    ability: "Credibility",
    tagline: "Investigative reporter, news anchor, and street chronicler exposing the truth",
    statTemplates: [
      { int: 8, ref: 6, dex: 6, tech: 5, cool: 7, will: 7, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 7, ref: 7, dex: 6, tech: 6, cool: 7, will: 6, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 8, ref: 6, dex: 7, tech: 5, cool: 8, will: 6, luck: 5, move: 6, body: 4, emp: 7 },
      { int: 7, ref: 6, dex: 6, tech: 6, cool: 7, will: 7, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 8, ref: 7, dex: 6, tech: 5, cool: 6, will: 6, luck: 7, move: 5, body: 5, emp: 7 },
      { int: 7, ref: 6, dex: 7, tech: 6, cool: 7, will: 6, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 8, ref: 6, dex: 6, tech: 6, cool: 7, will: 6, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 7, ref: 7, dex: 6, tech: 5, cool: 8, will: 6, luck: 5, move: 6, body: 5, emp: 7 },
      { int: 8, ref: 6, dex: 7, tech: 5, cool: 7, will: 7, luck: 6, move: 5, body: 4, emp: 7 },
      { int: 7, ref: 6, dex: 6, tech: 6, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 6 }
    ],
    skills: {
      athletics: 2, brawling: 2, bribery: 2, composition: 6, concentration: 2,
      conversation: 4, deduction: 6, education: 4, evasion: 6, firstAid: 2,
      handgun: 6, humanPerception: 6, languageStreetslang: 4, librarySearch: 4,
      localExpertYourHome: 4, perception: 6, persuasion: 6, photographyFilm: 6,
      stealth: 2, streetwise: 6
    },
    weaponChoices: [
      { id: "sidearm", label: "Sidearm Choice", options: ["Heavy Pistol", "Very Heavy Pistol", "SMG"] }
    ],
    cyberwareChoices: [
      { id: "mediaAugment", label: "Journalism Augmentation", options: ["Cybereye (Video Recorder & Micro-Optics)", "Audio Suite (Voice Stress Analyzer)", "Internal Agent"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Video Camcorder (HD)", "Audio Recorder (Digital)", "Scrambler / Descrambler", "Press Pass", "Memory Chips (x10)", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Pistol x50)", "Eurodollars (500 eb)"]
  },

  exec: {
    name: "Exec",
    ability: "Teamwork",
    tagline: "Corporate operative, boardroom shark, and power broker commanding resources",
    statTemplates: [
      { int: 7, ref: 7, dex: 6, tech: 4, cool: 8, will: 7, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 8, ref: 6, dex: 6, tech: 5, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 5 },
      { int: 7, ref: 7, dex: 7, tech: 4, cool: 7, will: 7, luck: 6, move: 5, body: 5, emp: 7 },
      { int: 8, ref: 6, dex: 6, tech: 4, cool: 8, will: 6, luck: 7, move: 6, body: 6, emp: 5 },
      { int: 7, ref: 7, dex: 6, tech: 5, cool: 7, will: 6, luck: 6, move: 6, body: 5, emp: 7 },
      { int: 8, ref: 6, dex: 7, tech: 4, cool: 8, will: 7, luck: 5, move: 6, body: 5, emp: 6 },
      { int: 7, ref: 6, dex: 6, tech: 5, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 6 },
      { int: 8, ref: 7, dex: 6, tech: 4, cool: 7, will: 6, luck: 6, move: 6, body: 5, emp: 7 },
      { int: 7, ref: 6, dex: 7, tech: 4, cool: 8, will: 7, luck: 6, move: 5, body: 5, emp: 7 },
      { int: 8, ref: 7, dex: 6, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 6 }
    ],
    skills: {
      accounting: 6, athletics: 2, brawling: 2, bribery: 2, bureaucracy: 6,
      business: 6, concentration: 2, conversation: 4, deduction: 4, education: 4,
      evasion: 6, firstAid: 2, handgun: 6, humanPerception: 6, languageStreetslang: 4,
      localExpertYourHome: 2, perception: 6, personalGrooming: 4, persuasion: 6,
      stealth: 2, wardrobeStyle: 4
    },
    weaponChoices: [
      { id: "sidearm", label: "Sidearm Choice (Excellent Quality)", options: ["Very Heavy Pistol (Quality)", "Heavy Pistol (Quality)", "SMG (Quality)"] }
    ],
    corpPerkChoices: [
      { id: "execPerk", label: "Corporate Asset Choice", options: ["Corporate Conapt (Free Housing)", "Company Commute Car (Sedan)", "Junior Associate (Team Member)"] }
    ],
    cyberwareChoices: [
      { id: "execAugment", label: "Executive Augmentation", options: ["Internal Agent", "Neural Link & Interface Plugs", "Subdermal Pocket"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Deluxe Agent", "Exec Briefcase", "Exec Wardrobe", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Pistol x50)", "Eurodollars (1000 eb)"]
  },

  lawman: {
    name: "Lawman",
    ability: "Backup",
    tagline: "NCPD officer, private detective, or corporate security enforcing the badge",
    statTemplates: [
      { int: 6, ref: 8, dex: 7, tech: 4, cool: 7, will: 7, luck: 5, move: 6, body: 7, emp: 5 },
      { int: 7, ref: 7, dex: 7, tech: 4, cool: 6, will: 7, luck: 6, move: 6, body: 8, emp: 4 },
      { int: 6, ref: 8, dex: 6, tech: 5, cool: 7, will: 6, luck: 6, move: 7, body: 7, emp: 4 },
      { int: 7, ref: 8, dex: 7, tech: 4, cool: 6, will: 7, luck: 5, move: 6, body: 7, emp: 5 },
      { int: 6, ref: 7, dex: 8, tech: 4, cool: 7, will: 6, luck: 6, move: 6, body: 8, emp: 4 },
      { int: 7, ref: 8, dex: 6, tech: 5, cool: 6, will: 7, luck: 5, move: 7, body: 7, emp: 4 },
      { int: 6, ref: 8, dex: 7, tech: 4, cool: 7, will: 6, luck: 6, move: 6, body: 8, emp: 4 },
      { int: 7, ref: 7, dex: 8, tech: 4, cool: 6, will: 7, luck: 5, move: 6, body: 7, emp: 5 },
      { int: 6, ref: 8, dex: 7, tech: 4, cool: 6, will: 7, luck: 6, move: 7, body: 7, emp: 4 },
      { int: 7, ref: 8, dex: 7, tech: 4, cool: 7, will: 6, luck: 5, move: 6, body: 8, emp: 4 }
    ],
    skills: {
      athletics: 4, autofire: 4, brawling: 4, concentration: 2, conversation: 2,
      criminology: 6, deduction: 6, driveLand: 2, education: 2, evasion: 6,
      firstAid: 2, handgun: 6, humanPerception: 6, interrogation: 6, languageStreetslang: 4,
      localExpertYourHome: 2, perception: 6, persuasion: 2, shoulderArms: 6,
      stealth: 2, streetwise: 6
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Primary Longarm", options: ["Shotgun", "Assault Rifle", "Heavy SMG"] },
      { id: "secondaryWeapon", label: "Duty Sidearm", options: ["Heavy Pistol", "Very Heavy Pistol"] }
    ],
    cyberwareChoices: [
      { id: "lawmanAugment", label: "Tactical Augmentation", options: ["Cyberaudio (Radio Communicator)", "Cybereye (Targeting Scope)", "Subdermal Armor"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Law Enforcement Badge", "Handcuffs (x2)", "Flashlight", "Road Flares (x5)", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Duty x100)", "Eurodollars (500 eb)"]
  },

  fixer: {
    name: "Fixer",
    ability: "Operator",
    tagline: "Smuggler, broker, fence, and black market dealmaker who knows everyone",
    statTemplates: [
      { int: 7, ref: 7, dex: 6, tech: 5, cool: 8, will: 6, luck: 7, move: 6, body: 5, emp: 5 },
      { int: 8, ref: 6, dex: 6, tech: 5, cool: 8, will: 7, luck: 6, move: 6, body: 5, emp: 5 },
      { int: 7, ref: 7, dex: 7, tech: 4, cool: 7, will: 6, luck: 7, move: 5, body: 6, emp: 6 },
      { int: 8, ref: 6, dex: 6, tech: 5, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 7, ref: 7, dex: 6, tech: 4, cool: 8, will: 7, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 8, ref: 6, dex: 7, tech: 5, cool: 7, will: 6, luck: 7, move: 5, body: 5, emp: 6 },
      { int: 7, ref: 7, dex: 6, tech: 5, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 5 },
      { int: 8, ref: 7, dex: 6, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 7, ref: 6, dex: 7, tech: 5, cool: 7, will: 7, luck: 7, move: 5, body: 5, emp: 6 },
      { int: 8, ref: 7, dex: 6, tech: 5, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 5 }
    ],
    skills: {
      athletics: 2, brawling: 2, bribery: 6, concentration: 2, conversation: 4,
      deduction: 2, education: 2, evasion: 6, firstAid: 2, forgery: 4,
      handgun: 6, humanPerception: 6, languageStreetslang: 4, localExpertYourHome: 4,
      perception: 6, personalGrooming: 4, persuasion: 6, stealth: 2,
      streetwise: 6, trading: 6, wardrobeStyle: 4
    },
    weaponChoices: [
      { id: "sidearm", label: "Sidearm Choice", options: ["Heavy Pistol", "Very Heavy Pistol", "SMG"] }
    ],
    cyberwareChoices: [
      { id: "fixerAugment", label: "Dealmaker Augmentation", options: ["Internal Agent", "Voice Synthesizer", "Cybereye (Chyron & Micro-Optics)"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Flagship Agent", "Burner Phone (x2)", "Stylish Wardrobe", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Pistol x50)", "Eurodollars (800 eb)"]
  },

  nomad: {
    name: "Nomad",
    ability: "Moto",
    tagline: "Highway warrior, clan driver, and survivalist master of convoys and vehicles",
    statTemplates: [
      { int: 6, ref: 8, dex: 7, tech: 6, cool: 6, will: 7, luck: 6, move: 6, body: 7, emp: 3 },
      { int: 7, ref: 8, dex: 7, tech: 6, cool: 5, will: 6, luck: 6, move: 7, body: 7, emp: 3 },
      { int: 6, ref: 7, dex: 8, tech: 7, cool: 6, will: 6, luck: 5, move: 6, body: 8, emp: 3 },
      { int: 7, ref: 8, dex: 6, tech: 6, cool: 6, will: 7, luck: 6, move: 6, body: 7, emp: 3 },
      { int: 6, ref: 8, dex: 7, tech: 6, cool: 5, will: 6, luck: 7, move: 6, body: 8, emp: 3 },
      { int: 7, ref: 7, dex: 8, tech: 6, cool: 6, will: 6, luck: 6, move: 7, body: 7, emp: 3 },
      { int: 6, ref: 8, dex: 6, tech: 7, cool: 6, will: 6, luck: 6, move: 6, body: 8, emp: 3 },
      { int: 7, ref: 8, dex: 7, tech: 6, cool: 5, will: 7, luck: 5, move: 6, body: 7, emp: 4 },
      { int: 6, ref: 7, dex: 7, tech: 7, cool: 6, will: 6, luck: 6, move: 7, body: 7, emp: 3 },
      { int: 7, ref: 8, dex: 7, tech: 6, cool: 6, will: 6, luck: 6, move: 6, body: 7, emp: 3 }
    ],
    skills: {
      animalHandling: 4, athletics: 4, basicTech: 4, brawling: 4, concentration: 2,
      conversation: 2, driveLand: 6, education: 2, evasion: 6, firstAid: 2,
      handgun: 6, humanPerception: 2, landVehicleTech: 6, languageStreetslang: 4,
      localExpertYourHome: 2, perception: 6, persuasion: 2, pilotAir: 2,
      shoulderArms: 6, stealth: 4, tracking: 4, wildernessSurvival: 6
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Primary Longarm", options: ["Assault Rifle", "Shotgun", "Sniper Rifle"] },
      { id: "secondaryWeapon", label: "Secondary Weapon", options: ["Heavy Pistol", "Heavy Melee Weapon"] }
    ],
    vehicleChoices: [
      { id: "nomadVehicle", label: "Moto Clan Vehicle", options: ["Compact Sedan (Moto)", "Road Motorcycle (Moto)", "Off-Road Bike (Moto)", "Gyrocopter (Moto)"] }
    ],
    cyberwareChoices: [
      { id: "nomadAugment", label: "Nomad Augmentation", options: ["Neural Link & Interface Plugs", "Cybereye (Tele-Optics)", "Subdermal Armor"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Vehicle Tool Kit", "Sleeping Bag & Tent", "Flashlight", "Canteen", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Basic x100)", "Eurodollars (500 eb)"]
  },

  rockerboy: {
    name: "Rockerboy",
    ability: "Charismatic Impact",
    tagline: "Musical rebel, poet, and cultural icon leading the crowds in revolution",
    statTemplates: [
      { int: 6, ref: 7, dex: 7, tech: 4, cool: 8, will: 7, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 7, ref: 7, dex: 6, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 6 },
      { int: 6, ref: 6, dex: 8, tech: 4, cool: 8, will: 7, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 7, ref: 7, dex: 7, tech: 3, cool: 8, will: 6, luck: 7, move: 6, body: 5, emp: 6 },
      { int: 6, ref: 7, dex: 6, tech: 5, cool: 8, will: 6, luck: 6, move: 7, body: 5, emp: 6 },
      { int: 7, ref: 6, dex: 7, tech: 4, cool: 8, will: 7, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 6, ref: 7, dex: 7, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 6 },
      { int: 7, ref: 7, dex: 6, tech: 4, cool: 8, will: 6, luck: 7, move: 6, body: 5, emp: 6 },
      { int: 6, ref: 6, dex: 7, tech: 5, cool: 8, will: 7, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 7, ref: 7, dex: 7, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 6 }
    ],
    skills: {
      athletics: 2, brawling: 2, composition: 6, concentration: 2, conversation: 4,
      education: 2, evasion: 6, firstAid: 2, handgun: 6, humanPerception: 6,
      languageStreetslang: 4, localExpertYourHome: 2, meleeWeapon: 4, perception: 6,
      performanceActing: 6, personalGrooming: 2, persuasion: 6, playInstrument: 6,
      stealth: 2, streetwise: 6, wardrobeStyle: 4
    },
    weaponChoices: [
      { id: "sidearm", label: "Sidearm Choice", options: ["Very Heavy Pistol", "Heavy Pistol", "SMG"] }
    ],
    instrumentChoices: [
      { id: "rockerInstrument", label: "Signature Instrument", options: ["Electric Guitar & Pocket Amp", "Keytar Synthesizer", "Vocal Vocoder Mic", "Electronic Drum Pad"] }
    ],
    cyberwareChoices: [
      { id: "rockerAugment", label: "Stage Augmentation", options: ["Techhair & Chemskin", "Audio Suite (Audio Recorder)", "Voice Synthesizer"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Agent", "Stage Wardrobe", "Glow Sticks & Flares", "Audio Chips", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Pistol x50)", "Eurodollars (500 eb)"]
  }
};

export const CPR_LIFEPATH = {
  culturalOrigins: [
    { origin: "North American", language: "English" },
    { origin: "South/Central American", language: "Spanish / Portuguese" },
    { origin: "Western European", language: "French / German / Italian" },
    { origin: "Eastern European", language: "Russian / Polish / Ukrainian" },
    { origin: "Middle Eastern / North African", language: "Arabic / Hebrew" },
    { origin: "Sub-Saharan African", language: "Swahili / Yoruba" },
    { origin: "South Asian", language: "Hindi / Bengali" },
    { origin: "East Asian", language: "Japanese / Cantonese / Mandarin" },
    { origin: "Southeast Asian", language: "Tagalog / Vietnamese" },
    { origin: "Oceanian / Pacific Islander", language: "Maori / Samoan" }
  ],
  personalities: [
    "Shy and secretive", "Rebellious, antisocial, and violent", "Arrogant, proud, and aloof",
    "Moody, rash, and stubborn", "Pick-headed and passionate", "Cold, intellectual, and detached",
    "Friendly and outgoing", "Cynical, sarcastic, and scheming", "Focused, disciplined, and calm",
    "Sneaky and deceptive"
  ],
  clothingStyles: [
    "Generic Chic (Standard, colorful modular)", "Leisurewear (Comfortable, athletic tracksuits)",
    "Urban Flash (Flashy neon, leather, high-tech LED)", "Businesswear (Tailored corporate suit)",
    "High Fashion (Exclusive, designer silks and velvet)", "Bohemian (Layered vintage and thrifted)",
    "Bag Lady Chic (Padded ragged survival wear)", "Gang Colors (Faction identifiers and combat vests)",
    "Nomad Leathers (Dust-worn reinforced hide)", "Asia Pop (Bright hyper-stylized anime aesthetic)"
  ],
  hairstyles: [
    "Mohawk with neon dyes", "Long and flowing dreadlocks", "Short and cropped buzzcut",
    "Wild and spiked anime mane", "Braided high ponytail", "Slicked-back corporate undercut",
    "Shaved sides with top knot", "Colored afro", "Tech-infused optical fiber weaves",
    "Completely bald with subdermal skull tattoos"
  ],
  affectations: [
    "Subdermal LED tattoos that pulse with heartbeat", "Mirror cyber-optics that reflect light",
    "Chemskin that shifts color based on mood", "Perpetual electronic cigarette smoke cloud",
    "Combat scarred face from close-range shrapnel", "Heavy titanium cyber-jewelry",
    "Voice synthesizer with a lingering harmonic reverb", "Signature leather duster lined with thermal foil",
    "Custom gold-plated neural interface plugs", "Finger-mounted micro laser pointers"
  ],
  valueMost: [
    "Money (Eurodollars are the only truth)", "Honor (Your word is your bonded guarantee)",
    "Your word (Never betray a deal)", "Honesty (Never lie to your crew)",
    "Knowledge (Information is real leverage)", "Vengeance (Pay every debt with blood)",
    "Love (Protecting your bonded soul)", "Power (Control over Night City streets)",
    "Having a good time (Live fast before flatlining)", "Friendship (Your crew over everything)"
  ],
  aboutPeople: [
    "I stay neutral. Everyone is just trying to survive.",
    "I like almost everyone until they give me a reason not to.",
    "I hate almost everyone. People are treacherous parasites.",
    "People are tools to be used and discarded when dull.",
    "Every choomba is a potential friend and ally.",
    "Nobody is trustworthy. Watch your own back at all times."
  ],
  familyBackgrounds: [
    "Corporate Execs (Born in a high-rise ivory tower)",
    "Corporate Managers (Middle-class salarymen sacrificed in a buyout)",
    "Corporate Technicians (Factory floor drones who built the chrome)",
    "Nomad Pack (Raised in a desert dust convoy)",
    "Ganger Family (Born into a turf war in the Combat Zone)",
    "Combat Zone Scavengers (Surviving on recycled scrap and salvage)",
    "Urban Homeless (Living in shipping containers and tent alleys)",
    "Megabuilding Blue Collar (Ordinary working-class dockworkers)",
    "Law Enforcement Family (Raised in the precinct house shadows)",
    "Street Fixers / Smugglers (Raised under bar counters and back alleys)"
  ],
  familyCrises: [
    "Family lost everything through bad market trades and corporate betrayal.",
    "Family was murdered by a rival syndicate in a home invasion.",
    "Family was exiled from their nomad pack or corporate enclave.",
    "Parents were arrested and executed by NCPD / CorpSec.",
    "Parents vanished into the Combat Zone without a trace.",
    "Family was wiped out by a biological plague in the 2030s.",
    "One parent turned traitor and sold the family out to Arasaka.",
    "Family is currently in deep debt to a high-interest loanshark.",
    "Family was forced to sign lifetime labor contracts in an orbital work camp.",
    "Family broke apart after a devastating blood feud."
  ],
  lifeGoals: [
    "Clear my family's name and reclaim our lost status.",
    "Gain fame, renown, and become an immortal legend at the Afterlife.",
    "Amass ten million Eurodollars and retire to an orbital villa.",
    "Destroy the corporation that flatlined my family.",
    "Save someone I love from indentured corporate servitude.",
    "Establish my own syndicate or edgerunner mercenary outfit in Night City.",
    "Hunt down and execute the individual who betrayed me.",
    "Live fast, die young in a glorious firefight.",
    "Find a peaceful place far away from Night City's radioactive dust.",
    "Discover the lost secrets buried in the Old Net."
  ]
};
