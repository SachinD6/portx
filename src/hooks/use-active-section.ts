"use client";

import { useEffect, useState } from "react";

/**
 * Reliable scroll-spy: active section is the last one whose top
 * has crossed a viewport marker (below the fixed header).
 */
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (!sectionIds.length) return;

    const update = () => {
      // Still in hero → no section active yet
      if (window.scrollY < 100) {
        setActive((prev) => (prev === "" ? prev : ""));
        return;
      }

      // Marker just under the island nav
      const marker = 140;
      let current = sectionIds[0] ?? "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= marker) {
          current = id;
        }
      }

      // Near page bottom → force last section (contact)
      const doc = document.documentElement;
      const nearBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 100;
      if (nearBottom) {
        current = sectionIds[sectionIds.length - 1] ?? current;
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    // Defer first paint so layout/sections exist
    const raf = window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionIds]);

  return active;
}
