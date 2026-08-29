/**
 * Cyberpunk RED AI Character Creator - Module Entry Point
 */

import { CPRCharGenWizard } from "./cpr-chargen-wizard.js";
import { CPRCharGenActor } from "./cpr-chargen-actor.js";
import { CONFIG } from "./config.js";

const MODULE_ID = "cyberpunk-red-character-creator";

function displayHelpCard() {
  const content = `
    <div class="cpr-chargen-help-card" style="background: #0d0e15; border: 1px solid #ff003c; border-left: 4px solid #00f0ff; border-radius: 4px; padding: 8px 10px; font-family: 'Rajdhani', sans-serif; color: #e0e6ed;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 0, 60, 0.4); padding-bottom: 6px; margin-bottom: 8px;">
        <span style="font-size: 1.1em; font-weight: 700; color: #00f0ff; text-transform: uppercase; letter-spacing: 1px;">
          <i class="fas fa-terminal" style="color: #ff003c; margin-right: 6px;"></i> CPR Character Creator
        </span>
        <span style="font-size: 0.75em; background: #ff003c; color: #fff; padding: 1px 6px; border-radius: 2px; font-weight: bold;">v1.0.0</span>
      </div>

      <div style="font-size: 0.9em; margin-bottom: 10px; color: #a2a8b9;">
        AI-Powered Cyberpunk RED Character Generation & Testing System.
      </div>

      <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.85em;">
        <div style="background: rgba(255, 255, 255, 0.03); padding: 5px 8px; border-radius: 3px; border-left: 2px solid #00f0ff;">
          <strong style="color: #00f0ff;">/cpr-char</strong> <span style="color: #7b849b;">or</span> <strong style="color: #00f0ff;">/create-char</strong>
          <div style="color: #d1d5db; margin-top: 2px;">Opens the interactive multi-step character creation wizard with local vLLM AI generation.</div>
        </div>

        <div style="background: rgba(255, 255, 255, 0.03); padding: 5px 8px; border-radius: 3px; border-left: 2px solid #ff003c;">
          <strong style="color: #ff003c;">/cpr-batch</strong> <span style="color: #7b849b;">or</span> <strong style="color: #ff003c;">/cpr-test5</strong>
          <div style="color: #d1d5db; margin-top: 2px;">Clears <code>AI test</code> folder and automatically generates & audits 5 core roles (Solo, Netrunner, Tech, Medtech, Rockerboy).</div>
        </div>

        <div style="background: rgba(255, 255, 255, 0.03); padding: 5px 8px; border-radius: 3px; border-left: 2px solid #ffd700;">
          <strong style="color: #ffd700;">/cpr-test</strong>
          <div style="color: #d1d5db; margin-top: 2px;">Generates a single Streetrat Solo in the <code>AI test</code> folder with full sheet validation.</div>
        </div>

        <div style="background: rgba(255, 255, 255, 0.03); padding: 5px 8px; border-radius: 3px; border-left: 2px solid #a855f7;">
          <strong style="color: #a855f7;">/cpr-clean</strong>
          <div style="color: #d1d5db; margin-top: 2px;">Purges all generated test actors located strictly inside the <code>AI test</code> folder.</div>
        </div>

        <div style="background: rgba(255, 255, 255, 0.03); padding: 5px 8px; border-radius: 3px; border-left: 2px solid #22c55e;">
          <strong style="color: #22c55e;">/cpr-help</strong>
          <div style="color: #d1d5db; margin-top: 2px;">Displays this command reference card in chat.</div>
        </div>
      </div>

      <div style="margin-top: 10px; padding-top: 6px; border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; gap: 6px;">
        <button type="button" class="cpr-chat-open-wizard" style="background: #ff003c; color: #fff; border: none; border-radius: 3px; padding: 4px 8px; font-size: 0.8em; font-weight: bold; cursor: pointer; flex: 1;">
          <i class="fas fa-user-plus"></i> Open Creator
        </button>
        <button type="button" class="cpr-chat-run-batch" style="background: #1a1d29; color: #00f0ff; border: 1px solid #00f0ff; border-radius: 3px; padding: 4px 8px; font-size: 0.8em; font-weight: bold; cursor: pointer; flex: 1;">
          <i class="fas fa-vials"></i> Test 5 Roles
        </button>
      </div>
    </div>
  `;

  ChatMessage.create({
    content,
    speaker: { alias: "NetWatch Subroutine" },
    whisper: [game.user.id]
  });
}

Hooks.once("init", () => {
  console.log("CPR CharGen | Initializing Cyberpunk RED AI Character Creator...");

  // Expose global API
  globalThis.CPRCharGen = {
    createActor: (data) => CPRCharGenActor.createActor(data),
    testCreateSolo: (user, folder) => CPRCharGenActor.testCreateSingleRole("solo", null, user),
    testCreateBatch: (roles, folder) => CPRCharGenActor.testCreateBatch(roles, folder),
    cleanTestActors: (folder) => CPRCharGenActor.cleanTestActors(folder),
    help: () => displayHelpCard()
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

// Chat Commands: /cpr-char, /cpr-chargen, /create-char, /cpr-test, /cpr-batch, /cpr-clean, /cpr-help, /cpr
Hooks.on("chatMessage", (chatLog, messageText, chatData) => {
  const text = messageText.trim().toLowerCase();
  
  if (text === "/cpr-help" || text === "/chargen-help" || text === "/cpr help" || text === "/cpr?" || text === "/cpr") {
    displayHelpCard();
    return false;
  }
  if (text === "/cpr-clean" || text === "/chargen-clean") {
    CPRCharGenActor.cleanTestActors("AI test");
    return false;
  }
  if (text === "/cpr-batch" || text === "/cpr-test5" || text === "/chargen-batch") {
    CPRCharGenActor.testCreateBatch(["solo", "netrunner", "tech", "medtech", "rockerboy"], "AI test");
    return false;
  }
  if (text === "/cpr-test" || text === "/chargen-test") {
    CPRCharGenActor.testCreateBatch(["solo"], "AI test");
    return false;
  }
  if (text.startsWith("/cpr-char") || text.startsWith("/cpr-chargen") || text.startsWith("/create-char")) {
    new CPRCharGenWizard().render(true);
    return false;
  }
  return true;
});

// Attach Click Listeners for Interactive Chat Buttons
Hooks.on("renderChatMessage", (message, html, data) => {
  html.find(".cpr-chat-open-wizard").on("click", () => {
    new CPRCharGenWizard().render(true);
  });
  html.find(".cpr-chat-run-batch").on("click", () => {
    CPRCharGenActor.testCreateBatch(["solo", "netrunner", "tech", "medtech", "rockerboy"], "AI test");
  });
});

// Add Single Header Button to Actor Directory
Hooks.on("renderActorDirectory", (app, html, data) => {
  const btn = $(`
    <button type="button" class="cpr-chargen-header-btn" style="background: linear-gradient(135deg, #ff003c 0%, #990022 100%); color: #fff; border: 1px solid #ff003c; font-weight: bold; border-radius: 4px; padding: 5px 8px; margin: 4px 0; width: 100%;">
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
