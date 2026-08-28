# Cyberpunk RED AI Character Creator (Streetrat & Edgerunner)

[![Foundry VTT](https://img.shields.io/badge/Foundry-v12-orange.svg)](https://foundryvtt.com/)
[![System](https://img.shields.io/badge/System-cyberpunk--red--core-red.svg)](https://github.com/foundryvtt/cyberpunk-red-core)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An intelligent, interactive character creation wizard built for **Cyberpunk RED** on **Foundry Virtual Tabletop (Foundry VTT v12)**.

The module guides players and Game Masters through creating authentic **Streetrat** (fast template-based) and **Edgerunner** (semi-custom role-based) characters, rolls and customizes complete Lifepaths, weaves rich backstories via modern AI instruction models, and automatically generates the playable `Actor` sheet populated with official compendium weapons, armor, and cyberware.

---

## Key Features

1. **Official Creation Archetypes**:
   * **Streetrat (Fast Template)**: 10 official 62-point stat templates, starting skill packages, weapons, armor (SP 11), and factory chrome.
   * **Edgerunner (Semi-Custom)**: 1d10 rollable role stat arrays and flexible skill allocations.
2. **AI Concept-to-Character Synthesizer**:
   * Type a free-form concept (e.g. *"Ex-Trauma Team surgeon in debt to Maelstrom"*) or leave blank for a random street legend.
   * The AI automatically determines the role, optimal stat template, weapons, and tailored lifepath.
3. **Interactive Lifepath Engine & Story Weaver**:
   * Rollable tables for Cultural Origin, Personality, Dress & Style, Hairstyle, Affectations, Family Background, Crisis, Goals, Friends, and Enemies.
   * 1-click **AI Weave Backstory** generates 3 paragraphs of gritty Night City lore with 2 GM adventure hooks.
4. **1-Click Foundry Actor Generator**:
   * Creates the native `character` Actor in Foundry VTT.
   * Pulls matching items from system compendiums (`cyberpunk-red-core.weapons`, `armor`, `cyberware`, `roles`).
   * Automatically calculates Derived Stats (HP, Seriously Wounded, Death Save, Humanity).

---

## Local Configuration & Environment Variables

This module features a **Local Variable System** that allows you to prefill your private server endpoints, models, and API keys without ever exposing them to Git.

### Setup Instructions

1. Navigate to the module's `scripts/` directory:
   ```bash
   cd Data/modules/cyberpunk-red-character-creator/scripts
   ```
2. Copy the template configuration file:
   ```bash
   cp config.example.js config.local.js
   ```
3. Edit `config.local.js` with your private network settings:
   ```javascript
   export const LOCAL_CONFIG = {
     // Your private LAN IP or internal inference URL
     apiUrl: "http://192.168.1.200/v1",

     // Model identifier served by your LLM backend
     model: "nvidia/Llama-3.3-70B-Instruct-NVFP4",

     // Optional API key (defaults to 'vllm')
     apiKey: "vllm"
   };
   ```
4. **Security**: `config.local.js` is included in `.gitignore` and will never be committed or leaked to GitHub.

---

## Launch Methods

* **Actor Directory Header**: Click the neon **"⚡ CPR AI Character Creator"** button at the top of the Actors tab.
* **Left Scene Controls**: Click the **User Plus** icon (`fas fa-user-plus`) in the token tool group.
* **Chat Command**: Type `/cpr-char` or `/cpr-chargen` in the chat log.

---

## Installation

1. Clone or download this repository into your Foundry VTT user data directory:
   ```bash
   cd Data/modules/
   git clone https://github.com/NomadicBits/cyberpunk-red-character-creator.git
   ```
2. In Foundry VTT, navigate to **Game Settings $\rightarrow$ Manage Modules**.
3. Enable **"Cyberpunk RED AI Character Creator (Streetrat & Edgerunner)"** and click **Save Module Settings**.

---

## License

MIT License. See `LICENSE` for details.
