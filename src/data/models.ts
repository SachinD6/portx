import type { AiModel, NowUsingConfig } from "./types";

/**
 * Models currently in the daily toolkit — ramx “last played” analogue.
 * Edit this file to rotate what shows on the homepage widget.
 */
export const aiModels: AiModel[] = [
  {
    id: "grok-4-5",
    name: "Grok 4.5",
    provider: "xAI",
    brand: "xai",
    role: "Primary for product thinking, code, and shipping.",
    accent: "primary",
    status: "active",
  },
  {
    id: "kimi-k3",
    name: "Kimi K3",
    provider: "Moonshot",
    brand: "moonshot",
    role: "Long-context research and large codebase passes.",
    accent: "muted",
    status: "active",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet",
    provider: "Anthropic",
    brand: "anthropic",
    role: "Deep review, careful refactors, design critique.",
    accent: "muted",
    status: "active",
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "OpenAI",
    brand: "openai",
    role: "General reasoning and quick spikes.",
    accent: "muted",
    status: "active",
  },
];

export const nowUsing: NowUsingConfig = {
  label: "Now using",
  liveLabel: "Live",
  primaryId: "grok-4-5",
  models: aiModels,
};

export function getPrimaryModel(): AiModel {
  const primary =
    aiModels.find((m) => m.id === nowUsing.primaryId) ??
    aiModels.find((m) => m.status === "active") ??
    aiModels[0];

  if (!primary) {
    throw new Error("No AI models configured in src/data/models.ts");
  }

  return primary;
}
