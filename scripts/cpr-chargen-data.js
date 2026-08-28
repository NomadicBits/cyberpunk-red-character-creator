/**
 * Cyberpunk RED Character Creation Rules & Compendium Data
 * Official Streetrat & Edgerunner Stat Arrays, Skills, Gear, and Lifepath Tables
 * Updated with official Cyberpunk RED Core Rulebook (p. 97-108) loadouts and choices
 */

export const CPR_ROLES = {
  solo: {
    name: "Solo",
    ability: "Combat Awareness",
    tagline: "Hired muscle, bodyguard, and tactical assassin",
    statTemplates: [
      { int: 6, ref: 8, dex: 8, tech: 3, cool: 6, will: 7, luck: 6, move: 6, body: 8, emp: 4 },
      { int: 5, ref: 8, dex: 8, tech: 4, cool: 7, will: 6, luck: 6, move: 7, body: 7, emp: 4 },
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
      athletics: 2, brawling: 6, concentration: 2, conversation: 2, education: 2,
      evasion: 6, firstAid: 6, humanPerception: 2, languageStreetslang: 4,
      localExpertYourHome: 2, perception: 6, persuasion: 2, stealth: 2,
      autofire: 6, handgun: 6, shoulderArms: 6, meleeWeapon: 6, resistTortureDrugs: 4,
      tactics: 4
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
    gear: ["Agent", "Light Armorjack Body", "Light Armorjack Head", "Basic Medtech Kit", "Ammo (Basic x50)", "Eurodollars (500 eb)"]
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
      athletics: 2, brawling: 2, concentration: 4, conversation: 2, education: 4,
      evasion: 6, firstAid: 2, humanPerception: 2, languageStreetslang: 4,
      localExpertYourHome: 2, perception: 4, persuasion: 2, stealth: 6,
      handgun: 6, cybertech: 6, electronicsSecurity: 6, cryptography: 6,
      librarySearch: 6, basicTech: 4
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Sidearm", options: ["Heavy Pistol", "Very Heavy Pistol", "SMG"] }
    ],
    cyberwareChoices: [
      { id: "netVisual", label: "Virtuality Interface", options: ["Virtuality Goggles (Gear)", "Virtuality (Cyberware Cybereye)", "Chyron (Subdermal Display)"] }
    ],
    baseCyberware: ["Neural Link", "Interface Plugs"],
    armor: "Light Armorjack (Head & Body SP 11)",
    deckPrograms: ["Sword", "Armor", "Eraser", "SeeYa", "Wurm", "Speedbrk"],
    gear: ["Standard Quality Cyberdeck", "Cables", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Pistol x30)", "Eurodollars (500 eb)"]
  },

  tech: {
    name: "Tech",
    ability: "Maker",
    tagline: "Renegade mechanic, inventor, and combat fabricator",
    statTemplates: [
      { int: 7, ref: 6, dex: 7, tech: 8, cool: 6, will: 6, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 6, ref: 7, dex: 7, tech: 8, cool: 5, will: 7, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 7, ref: 7, dex: 6, tech: 8, cool: 6, will: 6, luck: 5, move: 7, body: 5, emp: 5 },
      { int: 8, ref: 6, dex: 6, tech: 8, cool: 6, will: 6, luck: 7, move: 6, body: 5, emp: 4 },
      { int: 6, ref: 6, dex: 8, tech: 8, cool: 7, will: 6, luck: 6, move: 5, body: 6, emp: 4 },
      { int: 7, ref: 8, dex: 6, tech: 8, cool: 5, will: 6, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 6, ref: 7, dex: 7, tech: 8, cool: 6, will: 6, luck: 6, move: 7, body: 5, emp: 5 },
      { int: 7, ref: 6, dex: 7, tech: 8, cool: 6, will: 7, luck: 5, move: 6, body: 6, emp: 4 },
      { int: 8, ref: 7, dex: 6, tech: 8, cool: 5, will: 6, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 6, ref: 7, dex: 8, tech: 8, cool: 6, will: 6, luck: 6, move: 6, body: 5, emp: 4 }
    ],
    skills: {
      athletics: 2, brawling: 2, concentration: 4, conversation: 2, education: 4,
      evasion: 6, firstAid: 6, humanPerception: 2, languageStreetslang: 4,
      localExpertYourHome: 2, perception: 4, persuasion: 2, stealth: 4,
      basicTech: 6, cybertech: 6, weaponstech: 6, electronicsSecurity: 6,
      shoulderArms: 6, landVehicleTech: 4
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Primary Weapon", options: ["Shotgun", "Assault Rifle"] },
      { id: "secondaryWeapon", label: "Sidearm", options: ["Heavy Pistol", "Light Melee Weapon"] }
    ],
    cyberwareChoices: [
      { id: "techMod", label: "Tech Augmentation", options: ["Cybereye (Micro-Optics)", "Tool Hand (Cyberarm)", "Techhair"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Tech Tool Kit", "Techscanner", "Duct Tape & Wire", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Eurodollars (500 eb)"]
  },

  medtech: {
    name: "Medtech",
    ability: "Medicine",
    tagline: "Street doctor, combat surgeon, and cyber-ripdoc",
    statTemplates: [
      { int: 8, ref: 6, dex: 7, tech: 7, cool: 6, will: 7, luck: 5, move: 6, body: 6, emp: 4 },
      { int: 7, ref: 7, dex: 6, tech: 8, cool: 6, will: 6, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 8, ref: 7, dex: 6, tech: 7, cool: 6, will: 6, luck: 6, move: 7, body: 5, emp: 5 },
      { int: 7, ref: 6, dex: 7, tech: 8, cool: 5, will: 7, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 8, ref: 6, dex: 7, tech: 7, cool: 7, will: 6, luck: 5, move: 6, body: 6, emp: 4 },
      { int: 7, ref: 7, dex: 7, tech: 8, cool: 6, will: 6, luck: 6, move: 5, body: 6, emp: 4 },
      { int: 8, ref: 7, dex: 6, tech: 7, cool: 5, will: 7, luck: 6, move: 6, body: 5, emp: 5 },
      { int: 6, ref: 7, dex: 7, tech: 8, cool: 6, will: 7, luck: 6, move: 6, body: 5, emp: 4 },
      { int: 7, ref: 6, dex: 8, tech: 8, cool: 6, will: 6, luck: 6, move: 6, body: 5, emp: 4 },
      { int: 8, ref: 7, dex: 7, tech: 7, cool: 6, will: 6, luck: 5, move: 6, body: 6, emp: 4 }
    ],
    skills: {
      athletics: 2, brawling: 2, concentration: 4, conversation: 4, education: 6,
      evasion: 6, firstAid: 6, humanPerception: 4, languageStreetslang: 4,
      localExpertYourHome: 2, perception: 6, persuasion: 2, stealth: 2,
      paramedic: 6, cybertech: 6, basicTech: 4, shoulderArms: 6, diagnoseInjury: 6
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Primary Weapon", options: ["Shotgun", "Assault Rifle"] },
      { id: "secondaryWeapon", label: "Sidearm", options: ["Heavy Pistol", "Cryo-Spray Injector"] }
    ],
    cyberwareChoices: [
      { id: "medOptic", label: "Medical Diagnostics", options: ["Cybereye (Micro-Optics)", "Cybereye (Tele-Optics)", "Biomonitor"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Medtech Bag", "Cryopump Bag", "Trauma Dermal Patches (x3)", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Eurodollars (500 eb)"]
  },

  fixer: {
    name: "Fixer",
    ability: "Operator",
    tagline: "Dealmaker, smuggler, info-broker, and street broker",
    statTemplates: [
      { int: 7, ref: 6, dex: 6, tech: 4, cool: 8, will: 7, luck: 7, move: 6, body: 5, emp: 6 },
      { int: 6, ref: 7, dex: 6, tech: 4, cool: 8, will: 6, luck: 7, move: 7, body: 5, emp: 6 },
      { int: 7, ref: 6, dex: 7, tech: 3, cool: 8, will: 7, luck: 6, move: 6, body: 6, emp: 6 },
      { int: 6, ref: 6, dex: 7, tech: 5, cool: 8, will: 6, luck: 7, move: 6, body: 5, emp: 6 },
      { int: 7, ref: 7, dex: 6, tech: 4, cool: 8, will: 6, luck: 6, move: 7, body: 5, emp: 6 },
      { int: 6, ref: 6, dex: 6, tech: 5, cool: 8, will: 7, luck: 7, move: 6, body: 6, emp: 5 },
      { int: 7, ref: 7, dex: 6, tech: 3, cool: 8, will: 7, luck: 6, move: 6, body: 5, emp: 7 },
      { int: 6, ref: 7, dex: 7, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 6 },
      { int: 7, ref: 6, dex: 6, tech: 5, cool: 8, will: 6, luck: 7, move: 6, body: 5, emp: 6 },
      { int: 6, ref: 6, dex: 7, tech: 4, cool: 8, will: 7, luck: 6, move: 7, body: 5, emp: 6 }
    ],
    skills: {
      athletics: 2, brawling: 2, concentration: 2, conversation: 6, education: 4,
      evasion: 6, firstAid: 2, humanPerception: 6, languageStreetslang: 6,
      localExpertYourHome: 6, perception: 6, persuasion: 6, stealth: 2,
      handgun: 6, streetwise: 6, trading: 6, bribery: 6, lipReading: 4
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Concealable Weapon", options: ["Heavy Pistol", "Very Heavy Pistol", "SMG"] }
    ],
    cyberwareChoices: [
      { id: "fixerComm", label: "Street Comms", options: ["Internal Agent (Audio Suite)", "Voice Synthesizer", "Cybereye (Chyron)"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Agent (Flagship Model)", "Disposable Burner Phones (x2)", "Lockpicks", "Light Armorjack Body", "Eurodollars (800 eb)"]
  },

  nomad: {
    name: "Nomad",
    ability: "Moto",
    tagline: "Outrunner, convoy specialist, and wasteland driver",
    statTemplates: [
      { int: 6, ref: 8, dex: 7, tech: 6, cool: 6, will: 7, luck: 6, move: 7, body: 7, emp: 4 },
      { int: 5, ref: 8, dex: 8, tech: 6, cool: 6, will: 6, luck: 6, move: 7, body: 7, emp: 4 },
      { int: 6, ref: 7, dex: 7, tech: 7, cool: 6, will: 7, luck: 6, move: 6, body: 8, emp: 4 },
      { int: 6, ref: 8, dex: 6, tech: 7, cool: 6, will: 6, luck: 7, move: 7, body: 7, emp: 4 },
      { int: 5, ref: 7, dex: 8, tech: 6, cool: 7, will: 6, luck: 6, move: 7, body: 8, emp: 3 },
      { int: 6, ref: 8, dex: 7, tech: 5, cool: 7, will: 6, luck: 6, move: 6, body: 8, emp: 4 },
      { int: 7, ref: 7, dex: 7, tech: 6, cool: 6, will: 6, luck: 6, move: 7, body: 7, emp: 5 },
      { int: 5, ref: 8, dex: 7, tech: 7, cool: 6, will: 7, luck: 6, move: 6, body: 8, emp: 3 },
      { int: 6, ref: 7, dex: 8, tech: 6, cool: 6, will: 7, luck: 5, move: 7, body: 7, emp: 5 },
      { int: 6, ref: 8, dex: 7, tech: 6, cool: 6, will: 6, luck: 6, move: 7, body: 8, emp: 4 }
    ],
    skills: {
      athletics: 4, brawling: 4, concentration: 2, conversation: 2, education: 2,
      evasion: 6, firstAid: 4, humanPerception: 2, languageStreetslang: 4,
      localExpertYourHome: 4, perception: 6, persuasion: 2, stealth: 4,
      driveLandVehicle: 6, shoulderArms: 6, handgun: 6, landVehicleTech: 6,
      wildernessSurvival: 6, animalHandling: 2
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Primary Longarm", options: ["Assault Rifle", "Shotgun", "Sniper Rifle"] },
      { id: "secondaryWeapon", label: "Sidearm", options: ["Heavy Pistol", "Heavy Melee Weapon"] }
    ],
    vehicleChoices: [
      { id: "nomadVehicle", label: "Moto Clan Vehicle", options: ["Compact Car (Sedan)", "Road Motorcycle", "Off-Road Bike", "Gyrocopter Chassis"] }
    ],
    cyberwareChoices: [
      { id: "nomadLink", label: "Vehicle Interface", options: ["Interface Plugs & Neural Link", "Cybereye (Tele-Optics)", "Subdermal Armor"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Vehicle Tool Kit", "Road Flares (x4)", "Sleeping Bag", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Eurodollars (500 eb)"]
  },

  rockerboy: {
    name: "Rockerboy",
    ability: "Charismatic Impact",
    tagline: "Rebel rocker, poet of the street, and underground icon",
    statTemplates: [
      { int: 6, ref: 7, dex: 7, tech: 4, cool: 8, will: 7, luck: 6, move: 6, body: 6, emp: 6 },
      { int: 5, ref: 7, dex: 8, tech: 3, cool: 8, will: 6, luck: 7, move: 6, body: 6, emp: 6 },
      { int: 6, ref: 6, dex: 7, tech: 4, cool: 8, will: 7, luck: 6, move: 7, body: 5, emp: 7 },
      { int: 7, ref: 6, dex: 6, tech: 5, cool: 8, will: 6, luck: 7, move: 6, body: 5, emp: 6 },
      { int: 5, ref: 8, dex: 7, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 6 },
      { int: 6, ref: 7, dex: 7, tech: 4, cool: 8, will: 7, luck: 5, move: 7, body: 6, emp: 6 },
      { int: 7, ref: 6, dex: 7, tech: 3, cool: 8, will: 6, luck: 7, move: 6, body: 6, emp: 6 },
      { int: 6, ref: 7, dex: 6, tech: 4, cool: 8, will: 7, luck: 6, move: 6, body: 6, emp: 6 },
      { int: 5, ref: 7, dex: 7, tech: 5, cool: 8, will: 6, luck: 6, move: 7, body: 5, emp: 7 },
      { int: 6, ref: 8, dex: 6, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 6 }
    ],
    skills: {
      athletics: 2, brawling: 4, concentration: 2, conversation: 4, education: 2,
      evasion: 6, firstAid: 2, humanPerception: 6, languageStreetslang: 4,
      localExpertYourHome: 4, perception: 4, persuasion: 6, stealth: 4,
      playInstrument: 6, composition: 6, handgun: 6, streetwise: 6, wardrobeStyle: 6
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Sidearm", options: ["Very Heavy Pistol", "Heavy Pistol", "SMG"] }
    ],
    instrumentChoices: [
      { id: "rockerInstrument", label: "Signature Instrument", options: ["Electric Guitar & Pocket Amp", "Keytar Synthesizer", "Vocal Vocoder Mic", "Electronic Drum Pad"] }
    ],
    cyberwareChoices: [
      { id: "rockerStyle", label: "Style Chrome", options: ["Techhair & Chemskin", "Audio Suite (Cyberaudio)", "Voice Synthesizer"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Pocket Amp", "Concert Cables", "Stage Costume", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Eurodollars (500 eb)"]
  },

  exec: {
    name: "Exec",
    ability: "Teamwork",
    tagline: "Corporate operative, division manager, and suit with firepower",
    statTemplates: [
      { int: 7, ref: 6, dex: 6, tech: 4, cool: 8, will: 7, luck: 6, move: 6, body: 6, emp: 6 },
      { int: 8, ref: 6, dex: 6, tech: 3, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 7 },
      { int: 7, ref: 7, dex: 6, tech: 4, cool: 8, will: 6, luck: 7, move: 6, body: 5, emp: 6 },
      { int: 6, ref: 7, dex: 7, tech: 4, cool: 8, will: 6, luck: 6, move: 7, body: 5, emp: 6 },
      { int: 7, ref: 6, dex: 7, tech: 5, cool: 8, will: 7, luck: 5, move: 6, body: 5, emp: 6 },
      { int: 8, ref: 7, dex: 6, tech: 3, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 7 },
      { int: 6, ref: 6, dex: 7, tech: 4, cool: 8, will: 7, luck: 7, move: 6, body: 6, emp: 5 },
      { int: 7, ref: 7, dex: 6, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 6 },
      { int: 8, ref: 6, dex: 6, tech: 5, cool: 8, will: 7, luck: 5, move: 6, body: 5, emp: 6 },
      { int: 7, ref: 6, dex: 7, tech: 4, cool: 8, will: 6, luck: 6, move: 7, body: 5, emp: 6 }
    ],
    skills: {
      athletics: 2, brawling: 2, concentration: 4, conversation: 6, education: 6,
      evasion: 6, firstAid: 2, humanPerception: 6, languageStreetslang: 4,
      localExpertYourHome: 4, perception: 4, persuasion: 6, stealth: 2,
      business: 6, handgun: 6, accounting: 6, deduction: 6, bureaucracy: 6
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Executive Sidearm", options: ["Very Heavy Pistol (Quality)", "Heavy Pistol (Quality)", "SMG (Concealed)"] }
    ],
    corpPerkChoices: [
      { id: "execPerk", label: "Corporate Asset", options: ["Corporate Conapt (Subsidized Housing)", "Company Aerodyne/Car Commute", "Junior Associate (Bodyguard/Driver)"] }
    ],
    cyberwareChoices: [
      { id: "execComm", label: "Executive Augmentation", options: ["Internal Agent (Cyberaudio)", "Neural Link & Interface Plugs", "Subdermal Pocket"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Tailored Suit SP 11)",
    gear: ["Executive Briefcase", "Flagship Agent", "Business Wardrobe", "Light Armorjack Body", "Eurodollars (1000 eb)"]
  },

  lawman: {
    name: "Lawman",
    ability: "Backup",
    tagline: "NCPD officer, corporate badge, and highway patrolman",
    statTemplates: [
      { int: 6, ref: 8, dex: 7, tech: 4, cool: 7, will: 7, luck: 6, move: 6, body: 8, emp: 4 },
      { int: 5, ref: 8, dex: 8, tech: 3, cool: 7, will: 6, luck: 6, move: 7, body: 7, emp: 4 },
      { int: 6, ref: 7, dex: 7, tech: 4, cool: 7, will: 7, luck: 6, move: 6, body: 8, emp: 5 },
      { int: 7, ref: 8, dex: 6, tech: 4, cool: 6, will: 7, luck: 5, move: 6, body: 8, emp: 4 },
      { int: 5, ref: 7, dex: 8, tech: 4, cool: 7, will: 7, luck: 6, move: 7, body: 7, emp: 4 },
      { int: 6, ref: 8, dex: 7, tech: 3, cool: 8, will: 6, luck: 6, move: 6, body: 8, emp: 4 },
      { int: 7, ref: 7, dex: 7, tech: 4, cool: 7, will: 6, luck: 6, move: 6, body: 7, emp: 5 },
      { int: 5, ref: 8, dex: 7, tech: 4, cool: 7, will: 7, luck: 6, move: 7, body: 8, emp: 3 },
      { int: 6, ref: 8, dex: 8, tech: 4, cool: 6, will: 6, luck: 6, move: 6, body: 8, emp: 4 },
      { int: 6, ref: 8, dex: 7, tech: 4, cool: 7, will: 7, luck: 5, move: 7, body: 7, emp: 4 }
    ],
    skills: {
      athletics: 4, brawling: 6, concentration: 2, conversation: 4, education: 2,
      evasion: 6, firstAid: 4, humanPerception: 4, languageStreetslang: 4,
      localExpertYourHome: 4, perception: 6, persuasion: 4, stealth: 2,
      shoulderArms: 6, handgun: 6, criminology: 6, interrogation: 6, deduction: 4
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Duty Longarm", options: ["Shotgun", "Assault Rifle", "Heavy SMG"] },
      { id: "secondaryWeapon", label: "Service Sidearm", options: ["Heavy Pistol", "Very Heavy Pistol"] }
    ],
    cyberwareChoices: [
      { id: "lawAudio", label: "Tactical Augmentation", options: ["Cyberaudio (Radio Communicator)", "Cybereye (Targeting Scope)", "Subdermal Armor"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["Handcuffs (x2)", "Flashlight", "Badge & Holster", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Duty x50)", "Eurodollars (500 eb)"]
  },

  media: {
    name: "Media",
    ability: "Credibility",
    tagline: "Investigative journalist, screamer anchor, and truth seeker",
    statTemplates: [
      { int: 8, ref: 6, dex: 6, tech: 4, cool: 7, will: 7, luck: 6, move: 6, body: 5, emp: 7 },
      { int: 7, ref: 7, dex: 6, tech: 5, cool: 7, will: 6, luck: 7, move: 6, body: 5, emp: 6 },
      { int: 8, ref: 6, dex: 7, tech: 4, cool: 7, will: 7, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 7, ref: 7, dex: 6, tech: 4, cool: 8, will: 6, luck: 6, move: 7, body: 5, emp: 6 },
      { int: 8, ref: 6, dex: 6, tech: 5, cool: 7, will: 6, luck: 7, move: 6, body: 6, emp: 6 },
      { int: 7, ref: 6, dex: 7, tech: 4, cool: 8, will: 7, luck: 5, move: 6, body: 5, emp: 7 },
      { int: 8, ref: 7, dex: 6, tech: 4, cool: 7, will: 6, luck: 6, move: 6, body: 6, emp: 6 },
      { int: 7, ref: 6, dex: 6, tech: 5, cool: 8, will: 7, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 8, ref: 7, dex: 6, tech: 4, cool: 7, will: 7, luck: 6, move: 6, body: 5, emp: 6 },
      { int: 7, ref: 7, dex: 7, tech: 4, cool: 7, will: 6, luck: 6, move: 6, body: 5, emp: 7 }
    ],
    skills: {
      athletics: 2, brawling: 2, concentration: 4, conversation: 6, education: 6,
      evasion: 6, firstAid: 2, humanPerception: 6, languageStreetslang: 4,
      localExpertYourHome: 6, perception: 6, persuasion: 6, stealth: 4,
      handgun: 6, deduction: 6, lipReading: 4, photographyFilm: 6, librarySearch: 6
    },
    weaponChoices: [
      { id: "primaryWeapon", label: "Sidearm", options: ["Heavy Pistol", "Very Heavy Pistol", "SMG"] }
    ],
    cyberwareChoices: [
      { id: "mediaCam", label: "Investigative Chrome", options: ["Cybereye (Video Recorder & Micro-Optics)", "Audio Suite (Recorder)", "Voice Synthesizer"] }
    ],
    baseCyberware: [],
    armor: "Light Armorjack (Head & Body SP 11)",
    gear: ["High-Def Video Camera", "Audio Recorder", "Press Pass Badge", "Agent", "Light Armorjack Body", "Eurodollars (500 eb)"]
  }
};

export const CPR_LIFEPATH = {
  culturalOrigins: [
    { origin: "North American", language: "English" },
    { origin: "South/Central American", language: "Spanish" },
    { origin: "Western European", language: "French/German/Italian" },
    { origin: "Eastern European", language: "Russian/Polish/Ukrainian" },
    { origin: "Middle Eastern", language: "Arabic" },
    { origin: "African", language: "Swahili/Yoruba" },
    { origin: "East Asian", language: "Japanese/Mandarin/Korean" },
    { origin: "South/Southeast Asian", language: "Hindi/Tagalog/Vietnamese" },
    { origin: "Oceanian", language: "Maori/Hawaiian" }
  ],
  personalities: [
    "Shy and secretive", "Rebellious, antisocial, and violent", "Arrogant, proud, and aloof",
    "Moody, rash, and headstrong", "Pick and picky", "Stable, serious, and professional",
    "Friendly and outgoing", "Cynical, sarcastic, and biting", "Intellectual and detached",
    "Live-wire, chaotic, and loud"
  ],
  clothingStyles: [
    "Generic Chic (Standard, colorful, modular)",
    "Leisurewear (Comfortable, athletic streetwear)",
    "Urban Flash (Neon, bright, glowing streetwear)",
    "Businesswear (Crisp, sharp corporate suit)",
    "High Fashion (Exclusive designer labels)",
    "Bohemian (Layered, retro, vintage fabrics)",
    "Bag Lady Chic (Ragged, combat zone patchwork)",
    "Gang Colors (Faction tattoos, bandanas, sigils)",
    "Nomad Leathers (Hardened road gear, dust goggles)",
    "Asia Pop (Hyper-stylized anime/cyber aesthetic)"
  ],
  hairstyles: [
    "Mohawk (Neon dyed)", "Long and ratty", "Short and cropped", "Wild and voluminous",
    "Braids / Dreadlocks", "Clean fade / undercut", "Bald / Chrome scalp", "Spiky shock",
    "Topknot / Cyber-bun", "Classic parted"
  ],
  affectations: [
    "Tattoos all over face and body", "Mirrored cyber-shades at night", "Chewing synth-gum constantly",
    "Smelling of ozone and cheap stims", "Carrying a lucky tarot card", "Gold cyber-teeth",
    "Metallic nail claws", "Cyber-implanted barcode", "Constant finger-tapping rhythm", "Heavy vocal modulator"
  ],
  valueMost: [
    "Money (Eddies buy freedom)", "Honor (A word given is unbroken)", "Your Word (Reputation is all you have)",
    "Honesty (Cut through the corporate lies)", "Knowledge (Data is power in 2045)", "Vengeance (Nobody crosses you)",
    "Love (Someone worth fighting for)", "Power (Control your own destiny)", "Having Fun (Live fast, leave a corpse)",
    "Friendship (Choombas to the grave)"
  ],
  aboutPeople: [
    "I stay neutral. Everyone is just trying to survive.",
    "I like almost everyone until they give me a reason not to.",
    "I hate almost everyone. People are treacherous snakes.",
    "People are tools to be used and discarded.",
    "Every choomba is valuable; loyalty is everything.",
    "Nobody gets close. Distance keeps you breathing."
  ],
  familyBackgrounds: [
    "Corporate Execs: Raised in a gated arcology before the collapse.",
    "Corporate Managers: Middle-management suburbia lost to foreclosure.",
    "Corporate Technicians: Factory workers living in company dormitories.",
    "Nomad Pack: Wandering highway convoys and desert camps.",
    "Ganger Family: Raised in the turf of an active combat zone gang.",
    "Combat Zone Scavengers: Survived on scraps, ruins, and salvage.",
    "Urban Homeless: Lived in shipping container stacks in the Megabuildings.",
    "Megabuilding Workers: Grinding paycheck to paycheck in overcrowded housing.",
    "High Tech Pirates: Raised on offshore smuggling rigs and airships.",
    "Reclaimer Settlers: Trying to rebuild the shattered ruins of the Old City."
  ],
  familyCrises: [
    "Family lost everything through corporate betrayal.",
    "Family flatlined in a crossfire between Arasaka and Militech.",
    "Family was exiled from their home or Nomad pack.",
    "Family was imprisoned on fabricated charges.",
    "Family vanished without a trace in the Combat Zone.",
    "Family was murdered by an unknown hit squad.",
    "A massive debt was inherited from a dead relative.",
    "Family broke apart due to internal feud and betrayal.",
    "A terrible disease or bioweapon wiped them out.",
    "A sibling or parent sold out to a rival megacorp."
  ],
  lifeGoals: [
    "Clear your name and avenge your slaughtered family.",
    "Live fast, die young, and become an Afterlife Legend with a drink named after you.",
    "Get rich enough to buy a penthouse in the Executive Zone and never look back.",
    "Burn Arasaka or Militech to the ground for what they took.",
    "Find your missing sibling or lover in the dark underground.",
    "Run your own high-stakes Fixer syndicate or Combat Zone gang.",
    "Master the Net and crack the Blackwall to find the ghost of an old friend.",
    "Save enough eddies to get your family out of Night City forever.",
    "Survive long enough to die of old age with chrome intact."
  ]
};
