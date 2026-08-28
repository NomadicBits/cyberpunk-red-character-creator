/**
 * Cyberpunk RED Dynamic Configuration Loader
 * Automatically loads 'config.local.js' if present, falling back to public defaults.
 */

let config = {
  apiUrl: "http://localhost:8000/v1",
  model: "nvidia/Llama-3.3-70B-Instruct-NVFP4",
  apiKey: "vllm"
};

try {
  const local = await import("./config.local.js");
  if (local && local.LOCAL_CONFIG) {
    config = { ...config, ...local.LOCAL_CONFIG };
  }
} catch (e) {
  // config.local.js is not present; using standard defaults
}

export const CONFIG = config;
