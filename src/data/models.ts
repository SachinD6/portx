import type { AiModel, NowUsingConfig } from "./types";

/**
 * Models currently in the daily toolkit — ramx “last played” analogue.
 * Edit this file to rotate what shows on the homepage widget.
 */
export const aiModels: AiModel[] = [
  {
    id: "grok-4-6",
    name: "Grok 4.6",
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
    id: "glm-5-3",
    name: "GLM 5.3",
    provider: "Zhipu AI",
    brand: "zhipu",
    role: "Coding and long-horizon agentic tasks.",
    accent: "muted",
    status: "active",
  },
];

export const nowUsing: NowUsingConfig = {
  label: "Now using",
  liveLabel: "Live",
  primaryId: "grok-4-6",
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
