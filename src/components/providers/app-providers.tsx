"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {reduceMotion ? (
        children
      ) : (
        <ReactLenis
          root
          options={{ lerp: 0.09, duration: 1.1, smoothWheel: true }}
        >
          {children}
        </ReactLenis>
      )}
      <Toaster
        position="bottom-center"
        toastOptions={{
          className:
            "!bg-surface-elevated !text-foreground !border-border !shadow-none !rounded-full !px-4 !py-3",
        }}
      />
    </>
  );
}
