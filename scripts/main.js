/**
 * Cyberpunk RED AI Character Creator - Module Entry Point
 */

import { CPRCharGenWizard } from "./cpr-chargen-wizard.js";
import { CONFIG } from "./config.js";

const MODULE_ID = "cyberpunk-red-character-creator";

Hooks.once("init", () => {
  console.log("CPR CharGen | Initializing Cyberpunk RED AI Character Creator...");

  // Register Settings (Prefilled with CONFIG if local env exists)
  game.settings.register(MODULE_ID, "apiUrl", {
    name: "vLLM / OpenAI API Endpoint",
    hint: "Base URL for the OpenAI-compatible vLLM inference server (e.g. http://localhost:8000/v1 or internal host IP).",
    scope: "world",
    config: true,
    type: String,
    default: CONFIG.apiUrl || "http://localhost:8000/v1"
  });

  game.settings.register(MODULE_ID, "model", {
    name: "Active AI Model",
    hint: "LLM Model identifier served by vLLM (defaults to Llama 3.3 70B Instruct).",
    scope: "world",
    config: true,
    type: String,
    default: CONFIG.model || "nvidia/Llama-3.3-70B-Instruct-NVFP4"
  });

  game.settings.register(MODULE_ID, "apiKey", {
    name: "API Key",
    hint: "Optional API Key for authentication (defaults to 'vllm').",
    scope: "world",
    config: true,
    type: String,
    default: CONFIG.apiKey || "vllm"
  });

  // Handlebars Helper for Math
  Handlebars.registerHelper("add", function (a, b) {
    return parseInt(a, 10) + parseInt(b, 10);
  });
});

Hooks.once("ready", () => {
  console.log("CPR CharGen | System Ready. AI Character Creator Online.");
});

// Chat Commands: /cpr-char, /cpr-chargen, /create-char
Hooks.on("chatMessage", (chatLog, messageText, chatData) => {
  const text = messageText.trim();
  if (text.startsWith("/cpr-char") || text.startsWith("/cpr-chargen") || text.startsWith("/create-char")) {
    new CPRCharGenWizard().render(true);
    return false;
  }
  return true;
});

// Add Header Button to Actor Directory
Hooks.on("renderActorDirectory", (app, html, data) => {
  const btn = $(`
    <button type="button" class="cpr-chargen-header-btn" style="background: linear-gradient(135deg, #ff003c 0%, #990022 100%); color: #fff; border: 1px solid #ff003c; margin: 4px 0; font-weight: bold; border-radius: 4px; padding: 4px;">
      <i class="fas fa-user-plus"></i> CPR AI Character Creator
    </button>
  `);

  btn.on("click", () => {
    new CPRCharGenWizard().render(true);
  });

  html.find(".directory-header .header-actions").append(btn);
});

// Add Tool to Scene Controls
Hooks.on("getSceneControlButtons", (controls) => {
  const tokenControls = controls.find(c => c.name === "token");
  if (tokenControls) {
    tokenControls.tools.push({
      name: "cpr-chargen",
      title: "CPR Character Creator",
      icon: "fas fa-user-plus",
      button: true,
      onClick: () => {
        new CPRCharGenWizard().render(true);
      }
    });
  }
});
