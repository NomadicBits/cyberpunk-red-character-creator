/**
 * Cyberpunk RED Character Creator - Local Environment Configuration Template
 * 
 * Instructions:
 * 1. Copy this file to 'config.local.js':
 *    cp scripts/config.example.js scripts/config.local.js
 * 2. Set your private vLLM / Ollama endpoint and model identifier.
 * 3. 'config.local.js' is gitignored and will never be committed to Git.
 */

export const LOCAL_CONFIG = {
  // Base URL for the OpenAI-compatible vLLM / Ollama server
  apiUrl: "http://localhost:8000/v1",

  // Active Model identifier
  model: "nvidia/Llama-3.3-70B-Instruct-NVFP4",

  // Optional API Key for authentication
  apiKey: "vllm"
};
