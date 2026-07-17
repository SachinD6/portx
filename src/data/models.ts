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
    role: "Primary thinking partner for product, code, and shipping.",
    accent: "primary",
    status: "active",
  },
  {
    id: "kimi-k3",
    name: "Kimi K3",
    provider: "Moonshot",
    role: "Long-context research and large codebase passes.",
    accent: "muted",
    status: "active",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet",
    provider: "Anthropic",
    role: "Deep review, careful refactors, and design critique.",
    accent: "muted",
    status: "active",
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "OpenAI",
    role: "General reasoning and quick spikes.",
    accent: "muted",
    status: "standby",
  },
];

export const nowUsing: NowUsingConfig = {
  label: "Now using",
  liveLabel: "In rotation",
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
