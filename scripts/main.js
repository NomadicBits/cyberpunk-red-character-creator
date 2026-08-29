/**
 * Cyberpunk RED AI Character Creator - Module Entry Point
 */

import { CPRCharGenWizard } from "./cpr-chargen-wizard.js";
import { CPRCharGenActor } from "./cpr-chargen-actor.js";
import { CONFIG } from "./config.js";

const MODULE_ID = "cyberpunk-red-character-creator";

Hooks.once("init", () => {
  console.log("CPR CharGen | Initializing Cyberpunk RED AI Character Creator...");

  // Expose global API
  globalThis.CPRCharGen = {
    createActor: (data) => CPRCharGenActor.createActor(data),
    testCreateSolo: (user, folder) => CPRCharGenActor.testCreateSolo(user, folder)
  };

  // Register Settings
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

// Chat Commands: /cpr-char, /cpr-chargen, /create-char, /cpr-test, /chargen-test
Hooks.on("chatMessage", (chatLog, messageText, chatData) => {
  const text = messageText.trim();
  if (text === "/cpr-test" || text === "/chargen-test") {
    CPRCharGenActor.testCreateSolo("Brad", "AI test");
    return false;
  }
  if (text.startsWith("/cpr-char") || text.startsWith("/cpr-chargen") || text.startsWith("/create-char")) {
    new CPRCharGenWizard().render(true);
    return false;
  }
  return true;
});

// Add Header Buttons to Actor Directory
Hooks.on("renderActorDirectory", (app, html, data) => {
  const btnGroup = $(`
    <div class="cpr-chargen-btn-group flexrow" style="margin: 4px 0; gap: 4px;">
      <button type="button" class="cpr-chargen-header-btn" style="background: linear-gradient(135deg, #ff003c 0%, #990022 100%); color: #fff; border: 1px solid #ff003c; font-weight: bold; border-radius: 4px; padding: 4px 6px;">
        <i class="fas fa-user-plus"></i> CPR AI Creator
      </button>
      <button type="button" class="cpr-chargen-test-btn" style="background: #1a1d29; color: #00f0ff; border: 1px solid #00f0ff; font-weight: bold; border-radius: 4px; padding: 4px 6px; flex: 0 0 auto;" title="Run Automated Test: Create Streetrat Solo under Brad in 'AI test' folder">
        <i class="fas fa-vial"></i> AI Test
      </button>
    </div>
  `);

  btnGroup.find(".cpr-chargen-header-btn").on("click", () => {
    new CPRCharGenWizard().render(true);
  });

  btnGroup.find(".cpr-chargen-test-btn").on("click", () => {
    CPRCharGenActor.testCreateSolo("Brad", "AI test");
  });

  html.find(".directory-header .header-actions").append(btnGroup);
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
