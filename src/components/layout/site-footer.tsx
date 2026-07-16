import { person, site } from "@/data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 pt-8 pb-10">
      <div className="content-shell flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted-foreground">
          © {year} {person.name}. Built as a reusable template.
        </p>
        <p className="text-xs text-muted-foreground/80">
          {site.name} · Edit{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[11px]">
            src/data
          </code>{" "}
          to make it yours.
        </p>
      </div>
    </footer>
  );
}
