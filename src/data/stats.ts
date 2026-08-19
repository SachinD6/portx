export type StatItem = {
  id: string;
  label: string;
  value: string;
};

export const stats: StatItem[] = [
  { id: "product", label: "Hero product", value: "FresherGo" },
  { id: "traffic", label: "Monthly traffic", value: "12k+ visits" },
  { id: "mode", label: "Depth", value: "Product + systems" },
  { id: "status", label: "Status", value: "Available for work" },
];
