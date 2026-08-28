/**
 * Cyberpunk RED Character Creation Rules & Compendium Data
 * Official Streetrat & Edgerunner Stat Arrays, Skills, Gear, and Lifepath Tables
 */

export const CPR_ROLES = {
  solo: {
    name: "Solo",
    ability: "Combat Awareness",
    tagline: "Hired muscle, bodyguard, and tactical assassin",
    statTemplates: [
      { int: 6, ref: 8, dex: 8, tech: 3, cool: 6, will: 7, luck: 6, move: 6, body: 8, emp: 4 }, // 1
      { int: 5, ref: 8, dex: 8, tech: 4, cool: 7, will: 6, luck: 6, move: 7, body: 7, emp: 4 }, // 2
      { int: 7, ref: 8, dex: 7, tech: 2, cool: 7, will: 7, luck: 5, move: 6, body: 8, emp: 5 }, // 3
      { int: 6, ref: 8, dex: 7, tech: 3, cool: 8, will: 6, luck: 6, move: 6, body: 8, emp: 4 }, // 4
      { int: 5, ref: 8, dex: 8, tech: 4, cool: 6, will: 8, luck: 5, move: 6, body: 8, emp: 4 }, // 5
      { int: 6, ref: 8, dex: 8, tech: 2, cool: 7, will: 6, luck: 7, move: 7, body: 7, emp: 4 }, // 6
      { int: 7, ref: 8, dex: 8, tech: 3, cool: 6, will: 6, luck: 6, move: 6, body: 7, emp: 5 }, // 7
      { int: 5, ref: 8, dex: 7, tech: 4, cool: 7, will: 7, luck: 6, move: 7, body: 8, emp: 3 }, // 8
      { int: 6, ref: 8, dex: 8, tech: 3, cool: 6, will: 7, luck: 5, move: 7, body: 8, emp: 4 }, // 9
      { int: 6, ref: 8, dex: 8, tech: 3, cool: 7, will: 7, luck: 6, move: 6, body: 7, emp: 4 }  // 10
    ],
    skills: {
      athletics: 2, brawling: 6, concentration: 2, conversation: 2, education: 2,
      evasion: 6, firstAid: 6, humanPerception: 2, languageStreetslang: 4,
      localExpertYourHome: 2, perception: 6, persuasion: 2, stealth: 2,
      autofire: 6, handgun: 6, shoulderArms: 6, meleeWeapon: 6, resistTortureDrugs: 4,
      tactics: 4
    },
    weapons: ["Assault Rifle", "Very Heavy Pistol", "Heavy Melee Weapon"],
    armor: "Light Armorjack (Head & Body SP 11)",
    cyberware: ["Neural Link", "Interface Plugs", "Subdermal Armor", "Cybereye (Targeting Scope)"],
    gear: ["Agent", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Rifle x50)", "Ammo (Very Heavy x30)", "Basic Medtech Kit", "Eurodollars (500 eb)"]
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
    weapons: ["Heavy Pistol"],
    armor: "Light Armorjack (Head & Body SP 11)",
    cyberware: ["Neural Link", "Interface Plugs", "Virtuality", "Cybereye (Chyron)"],
    gear: ["Cyberdeck (Standard)", "Program: Sword", "Program: Eraser", "Program: Worm", "Program: Armor", "Agent", "Light Armorjack Body", "Light Armorjack Head", "Ammo (Heavy x30)", "Eurodollars (500 eb)"]
  },
  tech: {
    name: "Tech",
    ability: "Maker",
    tagline: "Master engineer, inventor, weapon modder, and field mechanic",
    statTemplates: [
      { int: 7, ref: 6, dex: 7, tech: 8, cool: 6, will: 6, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 8, ref: 6, dex: 7, tech: 8, cool: 5, will: 6, luck: 7, move: 5, body: 6, emp: 4 },
      { int: 6, ref: 7, dex: 7, tech: 8, cool: 6, will: 7, luck: 6, move: 6, body: 5, emp: 4 },
      { int: 7, ref: 6, dex: 8, tech: 8, cool: 6, will: 6, luck: 5, move: 6, body: 6, emp: 4 },
      { int: 8, ref: 7, dex: 6, tech: 8, cool: 5, will: 6, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 7, ref: 7, dex: 7, tech: 8, cool: 6, will: 6, luck: 6, move: 6, body: 5, emp: 4 },
      { int: 6, ref: 6, dex: 8, tech: 8, cool: 7, will: 6, luck: 6, move: 6, body: 5, emp: 4 },
      { int: 8, ref: 6, dex: 6, tech: 8, cool: 6, will: 7, luck: 6, move: 5, body: 6, emp: 4 },
      { int: 7, ref: 7, dex: 6, tech: 8, cool: 6, will: 6, luck: 7, move: 6, body: 5, emp: 4 },
      { int: 7, ref: 6, dex: 7, tech: 8, cool: 6, will: 7, luck: 5, move: 6, body: 6, emp: 4 }
    ],
    skills: {
      athletics: 2, brawling: 2, concentration: 4, conversation: 2, education: 4,
      evasion: 6, firstAid: 4, humanPerception: 2, languageStreetslang: 4,
      localExpertYourHome: 2, perception: 4, persuasion: 2, stealth: 2,
      shoulderArms: 6, basicTech: 6, cybertech: 6, electronicsSecurity: 6,
      weaponstech: 6, landVehicleTech: 6
    },
    weapons: ["Shotgun", "Heavy Pistol"],
    armor: "Light Armorjack (Head & Body SP 11)",
    cyberware: ["Neural Link", "Interface Plugs", "Tool Hand", "Cybereye (Micro-Optics)"],
    gear: ["Tech Toolkit", "Electronics Toolkit", "Agent", "Ammo (Shotgun Slug x20)", "Ammo (Heavy x30)", "Eurodollars (500 eb)"]
  },
  medtech: {
    name: "Medtech",
    ability: "Medicine",
    tagline: "Street doc, trauma surgeon, and pharmaceutical synthesizer",
    statTemplates: [
      { int: 8, ref: 6, dex: 7, tech: 7, cool: 6, will: 6, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 7, ref: 7, dex: 6, tech: 8, cool: 6, will: 7, luck: 5, move: 6, body: 6, emp: 4 },
      { int: 8, ref: 6, dex: 6, tech: 7, cool: 7, will: 6, luck: 6, move: 6, body: 5, emp: 5 },
      { int: 8, ref: 7, dex: 7, tech: 7, cool: 5, will: 6, luck: 6, move: 6, body: 6, emp: 4 },
      { int: 7, ref: 6, dex: 7, tech: 8, cool: 6, will: 6, luck: 7, move: 5, body: 6, emp: 4 },
      { int: 8, ref: 6, dex: 7, tech: 8, cool: 6, will: 6, luck: 5, move: 6, body: 5, emp: 5 },
      { int: 7, ref: 7, dex: 7, tech: 7, cool: 6, will: 7, luck: 6, move: 6, body: 5, emp: 4 },
      { int: 8, ref: 6, dex: 6, tech: 8, cool: 6, will: 7, luck: 6, move: 6, body: 5, emp: 4 },
      { int: 8, ref: 7, dex: 6, tech: 7, cool: 5, will: 6, luck: 7, move: 6, body: 6, emp: 4 },
      { int: 7, ref: 6, dex: 7, tech: 8, cool: 6, will: 6, luck: 6, move: 6, body: 6, emp: 4 }
    ],
    skills: {
      athletics: 2, brawling: 2, concentration: 4, conversation: 4, education: 4,
      evasion: 6, firstAid: 6, humanPerception: 4, languageStreetslang: 4,
      localExpertYourHome: 2, perception: 4, persuasion: 2, stealth: 2,
      handgun: 6, paramedic: 6, surgery: 6, scienceMedical: 6, cybertech: 6
    },
    weapons: ["Heavy Pistol"],
    armor: "Light Armorjack (Head & Body SP 11)",
    cyberware: ["Medscanner Implant", "Cybereye (Low-Light)", "Biomonitor"],
    gear: ["Medtech Bag", "Cryopump", "Speedheal Doses x3", "Antibiotics x2", "Agent", "Ammo (Heavy x30)", "Eurodollars (500 eb)"]
  },
  fixer: {
    name: "Fixer",
    ability: "Operator",
    tagline: "Street broker, smuggler, dealmaker, and Night City insider",
    statTemplates: [
      { int: 7, ref: 6, dex: 6, tech: 4, cool: 8, will: 6, luck: 7, move: 6, body: 5, emp: 7 },
      { int: 6, ref: 7, dex: 6, tech: 4, cool: 8, will: 7, luck: 6, move: 6, body: 5, emp: 7 },
      { int: 7, ref: 6, dex: 7, tech: 3, cool: 8, will: 6, luck: 6, move: 7, body: 5, emp: 7 },
      { int: 6, ref: 6, dex: 7, tech: 4, cool: 8, will: 7, luck: 7, move: 6, body: 4, emp: 7 },
      { int: 7, ref: 7, dex: 6, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 6 },
      { int: 6, ref: 6, dex: 6, tech: 5, cool: 8, will: 7, luck: 6, move: 6, body: 5, emp: 7 },
      { int: 7, ref: 7, dex: 6, tech: 3, cool: 8, will: 6, luck: 7, move: 6, body: 5, emp: 7 },
      { int: 6, ref: 6, dex: 7, tech: 4, cool: 8, will: 6, luck: 8, move: 6, body: 4, emp: 7 },
      { int: 7, ref: 6, dex: 6, tech: 4, cool: 8, will: 7, luck: 6, move: 6, body: 5, emp: 7 },
      { int: 7, ref: 6, dex: 7, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 7 }
    ],
    skills: {
      athletics: 2, brawling: 2, concentration: 2, conversation: 6, education: 4,
      evasion: 6, firstAid: 2, humanPerception: 6, languageStreetslang: 4,
      localExpertYourHome: 6, perception: 6, persuasion: 6, stealth: 2,
      handgun: 6, trading: 6, streetwise: 6, bribery: 4, forgery: 4
    },
    weapons: ["Very Heavy Pistol"],
    armor: "Light Armorjack (Head & Body SP 11)",
    cyberware: ["AudioVox", "Internal Agent Implant", "Subdermal Pocket"],
    gear: ["Agent (Deluxe)", "Flashy Clothing", "Concealable Holster", "Ammo (Very Heavy x30)", "Eurodollars (800 eb)"]
  },
  nomad: {
    name: "Nomad",
    ability: "Moto",
    tagline: "Road warrior, highway convoy convoy driver, and clan scout",
    statTemplates: [
      { int: 6, ref: 8, dex: 7, tech: 6, cool: 6, will: 6, luck: 6, move: 7, body: 7, emp: 3 },
      { int: 5, ref: 8, dex: 8, tech: 6, cool: 6, will: 7, luck: 5, move: 7, body: 7, emp: 3 },
      { int: 6, ref: 8, dex: 7, tech: 7, cool: 5, will: 6, luck: 6, move: 7, body: 7, emp: 3 },
      { int: 6, ref: 8, dex: 8, tech: 5, cool: 7, will: 6, luck: 6, move: 6, body: 7, emp: 3 },
      { int: 5, ref: 8, dex: 7, tech: 6, cool: 6, will: 7, luck: 6, move: 7, body: 7, emp: 3 },
      { int: 6, ref: 8, dex: 8, tech: 6, cool: 5, will: 6, luck: 7, move: 7, body: 6, emp: 3 },
      { int: 6, ref: 8, dex: 7, tech: 6, cool: 6, will: 6, luck: 6, move: 8, body: 7, emp: 2 },
      { int: 5, ref: 8, dex: 7, tech: 7, cool: 6, will: 6, luck: 6, move: 7, body: 7, emp: 3 },
      { int: 6, ref: 8, dex: 8, tech: 6, cool: 6, will: 6, luck: 5, move: 7, body: 7, emp: 3 },
      { int: 6, ref: 8, dex: 7, tech: 6, cool: 6, will: 7, luck: 6, move: 6, body: 7, emp: 3 }
    ],
    skills: {
      athletics: 4, brawling: 4, concentration: 2, conversation: 2, education: 2,
      evasion: 6, firstAid: 4, humanPerception: 2, languageStreetslang: 4,
      localExpertYourHome: 4, perception: 6, persuasion: 2, stealth: 4,
      shoulderArms: 6, driveLandVehicle: 6, landVehicleTech: 6, navigation: 4, wildernessSurvival: 6
    },
    weapons: ["Assault Rifle", "Heavy Pistol"],
    armor: "Light Armorjack (Head & Body SP 11)",
    cyberware: ["Neural Link", "Interface Plugs", "Cybereye (Targeting Scope)"],
    gear: ["Nomad Clan Vehicle (Compact or Bike via Moto 4)", "Field Repair Toolkit", "Sleeping Bag", "Agent", "Ammo (Rifle x50)", "Ammo (Heavy x30)", "Eurodollars (500 eb)"]
  },
  rockerboy: {
    name: "Rockerboy",
    ability: "Charismatic Impact",
    tagline: "Rebel artist, musical demagogue, and street poet",
    statTemplates: [
      { int: 6, ref: 7, dex: 7, tech: 4, cool: 8, will: 7, luck: 6, move: 6, body: 4, emp: 7 },
      { int: 5, ref: 7, dex: 8, tech: 4, cool: 8, will: 6, luck: 7, move: 6, body: 4, emp: 7 },
      { int: 6, ref: 8, dex: 7, tech: 3, cool: 8, will: 7, luck: 6, move: 6, body: 4, emp: 7 },
      { int: 7, ref: 7, dex: 6, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 7 },
      { int: 5, ref: 7, dex: 7, tech: 5, cool: 8, will: 7, luck: 6, move: 6, body: 4, emp: 7 },
      { int: 6, ref: 7, dex: 8, tech: 3, cool: 8, will: 6, luck: 7, move: 6, body: 4, emp: 7 },
      { int: 6, ref: 8, dex: 6, tech: 4, cool: 8, will: 7, luck: 6, move: 6, body: 4, emp: 7 },
      { int: 7, ref: 7, dex: 7, tech: 3, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 7 },
      { int: 5, ref: 7, dex: 7, tech: 4, cool: 8, will: 7, luck: 7, move: 6, body: 4, emp: 7 },
      { int: 6, ref: 7, dex: 7, tech: 4, cool: 8, will: 6, luck: 6, move: 7, body: 4, emp: 7 }
    ],
    skills: {
      athletics: 2, brawling: 4, concentration: 2, conversation: 4, education: 2,
      evasion: 6, firstAid: 2, humanPerception: 6, languageStreetslang: 4,
      localExpertYourHome: 4, perception: 4, persuasion: 6, stealth: 2,
      handgun: 6, playInstrumentGuitar: 6, composition: 6, streetwise: 6, performance: 6
    },
    weapons: ["Heavy Pistol"],
    armor: "Light Armorjack (Head & Body SP 11)",
    cyberware: ["AudioVox", "Chemskin", "Techhair"],
    gear: ["Electric Guitar / Mic", "Amp Pack", "Agent", "Glamour Wardrobe", "Ammo (Heavy x30)", "Eurodollars (500 eb)"]
  },
  exec: {
    name: "Exec",
    ability: "Teamwork",
    tagline: "Corporate operative, suit, and resource administrator",
    statTemplates: [
      { int: 7, ref: 6, dex: 6, tech: 3, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 8 },
      { int: 8, ref: 6, dex: 6, tech: 3, cool: 8, will: 7, luck: 5, move: 5, body: 6, emp: 8 },
      { int: 7, ref: 7, dex: 6, tech: 3, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 8 },
      { int: 8, ref: 6, dex: 7, tech: 2, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 8 },
      { int: 7, ref: 6, dex: 6, tech: 4, cool: 8, will: 6, luck: 7, move: 6, body: 5, emp: 7 },
      { int: 8, ref: 7, dex: 6, tech: 3, cool: 8, will: 6, luck: 5, move: 6, body: 5, emp: 8 },
      { int: 7, ref: 6, dex: 7, tech: 3, cool: 8, will: 7, luck: 6, move: 5, body: 5, emp: 8 },
      { int: 8, ref: 6, dex: 6, tech: 3, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 7 },
      { int: 7, ref: 7, dex: 6, tech: 3, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 7 },
      { int: 7, ref: 6, dex: 6, tech: 4, cool: 8, will: 6, luck: 6, move: 6, body: 6, emp: 7 }
    ],
    skills: {
      athletics: 2, brawling: 2, concentration: 4, conversation: 6, education: 6,
      evasion: 6, firstAid: 2, humanPerception: 6, languageStreetslang: 4,
      localExpertYourHome: 4, perception: 4, persuasion: 6, stealth: 2,
      handgun: 6, accounting: 6, business: 6, deduction: 6, bureaucracy: 4
    },
    weapons: ["Very Heavy Pistol"],
    armor: "Bodyweight Suit (SP 11) + Exec Suit",
    cyberware: ["Internal Agent Implant", "Subdermal Pocket", "Cybereye (Times Square Plus)"],
    gear: ["Executive Suite (Corp Conapt)", "Corporate Assistant / Driver", "Briefcase with Scrambler", "Ammo (Very Heavy x30)", "Eurodollars (1000 eb)"]
  },
  lawman: {
    name: "Lawman",
    ability: "Backup",
    tagline: "NCPD officer, corporate sheriff, and badge on the beat",
    statTemplates: [
      { int: 6, ref: 8, dex: 7, tech: 4, cool: 7, will: 7, luck: 6, move: 6, body: 7, emp: 4 },
      { int: 6, ref: 8, dex: 8, tech: 3, cool: 6, will: 7, luck: 6, move: 6, body: 8, emp: 4 },
      { int: 7, ref: 8, dex: 7, tech: 4, cool: 6, will: 6, luck: 6, move: 7, body: 7, emp: 4 },
      { int: 5, ref: 8, dex: 8, tech: 4, cool: 7, will: 7, luck: 5, move: 6, body: 8, emp: 4 },
      { int: 6, ref: 8, dex: 7, tech: 4, cool: 7, will: 6, luck: 7, move: 6, body: 7, emp: 4 },
      { int: 7, ref: 8, dex: 8, tech: 3, cool: 6, will: 6, luck: 6, move: 6, body: 7, emp: 5 },
      { int: 6, ref: 8, dex: 7, tech: 4, cool: 7, will: 7, luck: 6, move: 6, body: 7, emp: 4 },
      { int: 5, ref: 8, dex: 7, tech: 5, cool: 7, will: 7, luck: 6, move: 6, body: 7, emp: 4 },
      { int: 6, ref: 8, dex: 8, tech: 4, cool: 6, will: 7, luck: 5, move: 7, body: 7, emp: 4 },
      { int: 6, ref: 8, dex: 7, tech: 4, cool: 7, will: 6, luck: 6, move: 7, body: 7, emp: 4 }
    ],
    skills: {
      athletics: 4, brawling: 6, concentration: 2, conversation: 4, education: 2,
      evasion: 6, firstAid: 4, humanPerception: 6, languageStreetslang: 4,
      localExpertYourHome: 6, perception: 6, persuasion: 4, stealth: 2,
      handgun: 6, shoulderArms: 6, deduction: 4, criminology: 6, interrogation: 4
    },
    weapons: ["Heavy Pistol", "Shotgun"],
    armor: "Light Armorjack (Head & Body SP 11)",
    cyberware: ["Neural Link", "Interface Plugs", "Subdermal Armor"],
    gear: ["NCPD Badge & Uniform", "Handcuffs x2", "Radio Communicator", "Agent", "Ammo (Heavy x30)", "Ammo (Shotgun Slug x20)", "Eurodollars (500 eb)"]
  },
  media: {
    name: "Media",
    ability: "Credibility",
    tagline: "Investigative journalist, screamsheet reporter, and truth hound",
    statTemplates: [
      { int: 8, ref: 6, dex: 6, tech: 4, cool: 7, will: 7, luck: 6, move: 6, body: 5, emp: 7 },
      { int: 8, ref: 7, dex: 6, tech: 3, cool: 8, will: 6, luck: 6, move: 6, body: 4, emp: 8 },
      { int: 7, ref: 6, dex: 7, tech: 4, cool: 8, will: 6, luck: 7, move: 6, body: 5, emp: 6 },
      { int: 8, ref: 6, dex: 6, tech: 4, cool: 8, will: 7, luck: 5, move: 6, body: 5, emp: 7 },
      { int: 7, ref: 7, dex: 6, tech: 4, cool: 7, will: 6, luck: 7, move: 6, body: 5, emp: 7 },
      { int: 8, ref: 6, dex: 7, tech: 3, cool: 8, will: 6, luck: 6, move: 6, body: 4, emp: 8 },
      { int: 8, ref: 7, dex: 6, tech: 4, cool: 7, will: 7, luck: 6, move: 5, body: 5, emp: 7 },
      { int: 7, ref: 6, dex: 6, tech: 5, cool: 8, will: 6, luck: 6, move: 6, body: 5, emp: 7 },
      { int: 8, ref: 6, dex: 6, tech: 4, cool: 8, will: 6, luck: 6, move: 7, body: 4, emp: 7 },
      { int: 8, ref: 6, dex: 7, tech: 4, cool: 7, will: 6, luck: 6, move: 6, body: 5, emp: 7 }
    ],
    skills: {
      athletics: 2, brawling: 2, concentration: 4, conversation: 6, education: 4,
      evasion: 6, firstAid: 2, humanPerception: 6, languageStreetslang: 4,
      localExpertYourHome: 6, perception: 6, persuasion: 6, stealth: 4,
      handgun: 6, photographyFilm: 6, deduction: 6, librarySearch: 6, bribery: 4
    },
    weapons: ["Heavy Pistol"],
    armor: "Light Armorjack (Head & Body SP 11)",
    cyberware: ["Cybereye (Video Camera & Audio Recorder)", "Internal Agent Implant"],
    gear: ["Broadcast Feed Rig", "Press Pass", "Scrambler Agent", "Ammo (Heavy x30)", "Eurodollars (500 eb)"]
  }
};

export const CPR_LIFEPATH = {
  culturalOrigins: [
    { origin: "North American", language: "English" },
    { origin: "South/Central American", language: "Spanish" },
    { origin: "Western European", language: "French or German" },
    { origin: "Eastern European", language: "Russian or Polish" },
    { origin: "Middle Eastern", language: "Arabic or Hebrew" },
    { origin: "African", language: "Swahili or Yoruba" },
    { origin: "South Asian", language: "Hindi or Bengali" },
    { origin: "South East Asian", language: "Tagalog or Vietnamese" },
    { origin: "East Asian", language: "Japanese, Cantonese, or Mandarin" },
    { origin: "Oceania / Pacific Islander", language: "Hawaiian, Maori, or Samoan" }
  ],
  personalities: [
    "Shy and secretive", "Rebellious, antisocial, and violent", "Arrogant, proud, and aloof",
    "Moody, rash, and headstrong", "Pickled, calm, and detached", "Hidden valid idealist",
    "Friendly, warm, and outgoing", "Sneaky, deceptive, and untrustworthy", "Intellectual and detached",
    "Goofy, jokester, and manic"
  ],
  clothingStyles: [
    "Generic Chic (Standard, colorful modular street clothes)",
    "Leisurewear (Comfortable athletic, hoodies, runners)",
    "Urban Flash (Bright neons, LED trims, translucent plastics)",
    "Business Exec (Sharp corporate power suits, tailored lines)",
    "Nomad Leathers (Rugged hides, tribal patches, dust goggles)",
    "Bohemian (Layered vintage, retro scarves, eclectic accessories)",
    "Asia Pop (Japanese anime motifs, oversized footwear, hyper-cute decals)",
    "Cyberpunk (Classic dark leather, chrome spikes, heavy combat boots)",
    "High Fashion (Exclusive designer pieces, luminescent fabrics)",
    "Crossover (Mismatched combat military surplus over streetwear)"
  ],
  hairstyles: [
    "Mohawk with neon dyes", "Long and ratty dreadlocks", "Short and spiked with shaved sides",
    "Wild braids with woven fiber-optics", "Clean shaven / completely bald",
    "Striped and multi-tinted buzzcut", "Neat corporate slickback", "Asymmetrical cyberpunk bob",
    "Afro with metallic beads", "Messy anime spikes"
  ],
  affectations: [
    "Tattoos that cover arms and neck", "Mirrored shades worn even at night",
    "Ritual scarification or gang brand", "Cyberware aesthetic exposed with gold plating",
    "Distinctive cigar/cigarette habit", "Chewing stimulant gum constantly",
    "Multiple ear, lip, and brow piercings", "Custom chrome prosthetic fingers",
    "Always wearing heavy combat gloves", "Spiked leather collar or choker"
  ],
  valueMost: [
    "Money and financial independence", "Personal honor and integrity", "Your word and loyalty",
    "Honesty above all", "Forbidden knowledge and data", "Vengeance against those who wronged you",
    "Love and personal devotion", "Power, control, and respect", "Family and clan survival",
    "Friendship and camaraderie"
  ],
  aboutPeople: [
    "I stay neutral; everyone has an angle.", "I like almost everyone until they cross me.",
    "People are untrustworthy and must be watched.", "People are pawns to be used for survival.",
    "People are wonderful, diverse, and worth protecting.", "I hate almost everyone; Night City is trash.",
    "Only your crew matters; outsiders are disposable.", "Everyone is an opportunity for profit."
  ],
  familyBackgrounds: [
    "Corporate Executives (Privileged childhood until the fall)",
    "Nomad Clan (Raised on the open road in armed convoys)",
    "Street Scavengers / Homeless (Raised in shipping containers)",
    "Combat Zone Ganger Family (Surrounded by booster wars)",
    "Middle Class Tech Workers (Quiet childhood in the suburbs)",
    "Media / Pirate Broadcaster Parents (Constant government raids)",
    "Trauma Team / Medical Operatives (Grew up around blood and trauma)",
    "Blue-Collar Harbor / Factory Workers (Tough industrial upbringing)"
  ],
  familyCrises: [
    "Family lost everything to a corporate takeover.",
    "Parents were arrested and executed by NCPD or CorpSec.",
    "Family vanished without a trace in the Combat Zone.",
    "Family was murdered by a rival boostergang; you escaped.",
    "Family was torn apart by deep debt to a loan shark.",
    "A parent succumbed to extreme cyberpsychosis.",
    "Betrayed by a close relative for corporate bounty."
  ],
  lifeGoals: [
    "Clear my family's name and restore our standing.",
    "Get bloody revenge on the corp or gang that ruined me.",
    "Get filthy rich and buy my way into an Executive Conapt.",
    "Become a Night City Legend remembered at the Afterlife.",
    "Protect my crew/family from the dangers of the street.",
    "Escape Night City forever and find peace on the open road."
  ]
};
