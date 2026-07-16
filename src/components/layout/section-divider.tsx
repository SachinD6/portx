export function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-1" aria-hidden="true">
      <div className="section-rule relative">
        <span className="absolute top-1/2 left-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-muted-foreground/40" />
      </div>
    </div>
  );
}
