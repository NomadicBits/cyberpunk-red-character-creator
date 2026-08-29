/**
 * Cyberpunk RED AI Concept Generator & Lifepath Narrative Weaver
 * Connects to configured vLLM / OpenAI API endpoint for intelligent character drafting
 */

import { CONFIG } from "./config.js";

let cachedWorkingUrl = null;

function cleanCommand(cmd) {
  if (!cmd) return "";
  let s = cmd.trim();
  if (s.startsWith('"') && s.endsWith('"')) s = s.slice(1, -1);
  return s.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\'/g, "'");
}

function extractJson(text) {
  if (!text) throw new Error("Empty response from AI");
  let raw = text.trim();
  if (raw.startsWith("```")) {
    raw = raw.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/, "").trim();
  }

  try {
    const data = JSON.parse(raw);
    if (data && typeof data === "object") return data;
  } catch (e) {}

  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try {
      const data = JSON.parse(raw.substring(firstBrace, lastBrace + 1));
      if (data && typeof data === "object") return data;
    } catch (e) {}
  }

  throw new Error("Failed to parse AI-generated character JSON.");
}

export class CPRCharGenAI {
  static getApiUrl() {
    const settingUrl = game.settings.get("cyberpunk-red-character-creator", "apiUrl");
    if (settingUrl && settingUrl !== "http://localhost:8000/v1") {
      return settingUrl.replace(/\/+$/, "");
    }
    if (CONFIG.apiUrl) {
      return CONFIG.apiUrl.replace(/\/+$/, "");
    }
    return (settingUrl || "http://localhost:8000/v1").replace(/\/+$/, "");
  }

  static getModel() {
    return game.settings.get("cyberpunk-red-character-creator", "model") || CONFIG.model || "nvidia/Llama-3.3-70B-Instruct-NVFP4";
  }

  static getApiKey() {
    return game.settings.get("cyberpunk-red-character-creator", "apiKey") || CONFIG.apiKey || "vllm";
  }

  static async complete(messages, options = {}) {
    const configuredUrl = this.getApiUrl();
    const model = this.getModel();
    const apiKey = this.getApiKey();

    // Candidate endpoints
    const candidateUrls = [];
    if (cachedWorkingUrl) candidateUrls.push(cachedWorkingUrl);
    if (CONFIG.apiUrl && !candidateUrls.includes(CONFIG.apiUrl.replace(/\/+$/, ""))) {
      candidateUrls.push(CONFIG.apiUrl.replace(/\/+$/, ""));
    }
    if (CONFIG.candidateUrls && Array.isArray(CONFIG.candidateUrls)) {
      for (const u of CONFIG.candidateUrls) {
        const clean = u.replace(/\/+$/, "");
        if (!candidateUrls.includes(clean)) candidateUrls.push(clean);
      }
    }
    if (configuredUrl && !candidateUrls.includes(configuredUrl)) {
      candidateUrls.push(configuredUrl);
    }

    const payload = {
      model: options.model || model,
      messages: messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 1500,
      top_p: options.top_p ?? 0.95
    };

    let lastError = null;
    for (const u of candidateUrls) {
      try {
        console.log(`CPR CharGen | Connecting to LLM endpoint: ${u}/chat/completions`);
        const res = await fetch(`${u}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`HTTP ${res.status}: ${errText}`);
        }

        const json = await res.json();
        cachedWorkingUrl = u;
        return json.choices?.[0]?.message?.content || "";
      } catch (err) {
        lastError = err;
        console.warn(`CPR CharGen | Endpoint ${u} failed:`, err.message);
      }
    }

    throw lastError || new Error("Failed to connect to AI inference backend.");
  }

  /**
   * Synthesize a complete Cyberpunk RED character draft based on a concept
   * @param {string} prompt Concept description or empty for random street legend
   * @param {string} mode "streetrat" or "edgerunner"
   * @returns {Promise<Object>}
   */
  static async brainstormConcept(prompt = "", mode = "streetrat") {
    const systemPrompt = `You are a master Cyberpunk RED Character Creator & Night City Fixer.
Your role is to design authentic, gritty, balanced characters for Cyberpunk RED (2045 Time of the Red).
Available Roles: Solo, Netrunner, Tech, Medtech, Fixer, Nomad, Rockerboy, Exec, Lawman, Media.
Currency is ALWAYS Eurodollars, Eddies, or eb (NEVER dollars or nuyen).

Return ONLY valid JSON matching this schema:
{
  "name": "Street Handle & Real Name",
  "role": "solo | netrunner | tech | medtech | fixer | nomad | rockerboy | exec | lawman | media",
  "mode": "${mode}",
  "templateIndex": 1,
  "concept": "1-sentence summary of the character concept",
  "personality": "Personality description",
  "clothingStyle": "Style description",
  "hairStyle": "Hairstyle description",
  "affectation": "Visual affectation",
  "valueMost": "What they value most",
  "aboutPeople": "Feeling about people",
  "familyBackground": "Family origin",
  "familyCrisis": "What tragedy struck their family",
  "lifeGoals": "Ultimate life ambition",
  "enemy": {
    "who": "Enemy name and faction",
    "cause": "Why they hate you",
    "resources": "What they can throw at you"
  },
  "friend": {
    "who": "Friend name and connection",
    "relationship": "How you bonded"
  },
  "tragicLove": "What happened to your past lover",
  "backstory": "Rich 2-3 paragraph backstory connecting their origin, why they hit the street in 2045, and current GM hooks."
}`;

    const userPrompt = prompt.trim()
      ? `Create a Cyberpunk RED ${mode.toUpperCase()} character based on this concept: "${prompt}"`
      : `Generate a compelling, gritty, completely original Cyberpunk RED ${mode.toUpperCase()} character concept.`;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ];

    const raw = await this.complete(messages, { temperature: 0.7 });
    return extractJson(raw);
  }

  /**
   * Weave selected Lifepath entries into a cohesive narrative backstory
   * @param {Object} lifepathData
   * @returns {Promise<string>}
   */
  static async weaveLifepathNarrative(lifepathData) {
    const prompt = `Take these Cyberpunk RED Lifepath details and write a compelling, atmospheric 3-paragraph backstory:
Character Name: ${lifepathData.name || "Street Samurai"}
Role: ${lifepathData.role || "Solo"}
Cultural Origin: ${lifepathData.culturalOrigin || "North American"}
Family Background: ${lifepathData.familyBackground || "Combat Zone Street Family"}
Family Crisis: ${lifepathData.familyCrisis || "Lost everything to corp takeover"}
Personality: ${lifepathData.personality || "Rebellious and cynical"}
Enemy: ${lifepathData.enemy || "Maelstrom lieutenant"}
Friend: ${lifepathData.friend || "Trauma Team medic"}
Tragic Love: ${lifepathData.tragicLove || "Lover flatlined in a crossfire"}
Life Goal: ${lifepathData.lifeGoals || "Become an Afterlife Legend"}

Format: 3 narrative paragraphs with gritty street flavor, authentic slang (choomba, preem, delta, eddies), and 2 adventure hooks for the GM.`;

    const messages = [
      { role: "system", content: "You are a dark, immersive Cyberpunk RED chronicler in 2045." },
      { role: "user", content: prompt }
    ];

    return await this.complete(messages, { temperature: 0.65 });
  }
}
