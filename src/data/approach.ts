import type { ApproachItem } from "./types";

export const approach: ApproachItem[] = [
  {
    id: "clarity",
    title: "Clarity first",
    description:
      "Name the problem, the constraint, and the success metric before writing code. Ambiguity is expensive; a shared sentence is not.",
  },
  {
    id: "slices",
    title: "Ship in thin slices",
    description:
      "Prefer small, reviewable increments with production in mind—observability, errors, and empty states included—not demos that only work on the happy path.",
  },
  {
    id: "ownership",
    title: "Own the outcome",
    description:
      "Interfaces, APIs, and ops are one product. I stay with work until it is measurable, maintainable, and easy for the next person to extend.",
  },
];
