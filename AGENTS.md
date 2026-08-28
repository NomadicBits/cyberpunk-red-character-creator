# Cyberpunk RED AI Character Creator

## Architecture Overview
An automated, AI-assisted character creation wizard built for **Cyberpunk RED (cyberpunk-red-core)** running on **Foundry VTT v12**.

- **System Target**: `cyberpunk-red-core` (v0.90+)
- **LLM Engine**: Any OpenAI-compatible inference server (vLLM, Ollama, LM Studio) serving modern instruction models (e.g. `nvidia/Llama-3.3-70B-Instruct-NVFP4`, `Qwen/Qwen2.5-72B-Instruct`).

## Core Features
1. **Streetrat Mode**: Official 62-point stat templates, starting skill packages, weapons, armor, and gear.
2. **Edgerunner Mode**: Role-based stat arrays with custom skill distributions.
3. **AI Concept Brainstormer**: Converts natural language prompts into balanced stat distributions, roles, and tailored lifepaths.
4. **Lifepath Engine**: Full rollable tables + AI Backstory Weaver for gritty, authentic Night City backstories with GM adventure hooks.
5. **1-Click World Actor Creation**: Pulls official items from system compendiums (`weapons`, `armor`, `cyberware`, `roles`, `skills`) and generates a playable Actor sheet.
