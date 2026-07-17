import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** xAI / Grok — abstract glyph inspired by the brand mark */
export function XaiIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3.2 3.2h4.4L12 9.1 16.4 3.2h4.4L14.2 12l6.6 8.8h-4.4L12 14.9 7.6 20.8H3.2L9.8 12 3.2 3.2Z" />
    </svg>
  );
}

/** Anthropic / Claude — starburst spark */
export function AnthropicIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.2 13.1 9l6.7-2.2-2.2 6.7 6.8 1.1-6.8 1.1 2.2 6.7-6.7-2.2L12 21.8 10.9 15l-6.7 2.2 2.2-6.7L0 9.4l6.8-1.1L4.6 1.6 11.3 3.8 12 2.2Z" />
    </svg>
  );
}

/** OpenAI — simplified hex blossom */
export function OpenaiIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 4.2c1.8-1 4-.5 5 1.3.7 1.2.7 2.7 0 3.9" />
      <path d="M17 9.4c1.8 1 2.4 3.2 1.4 5-.7 1.2-2 2-3.4 2.1" />
      <path d="M15 16.5c0 2-1.6 3.7-3.6 3.8-1.4 0-2.7-.7-3.4-1.9" />
      <path d="M8 16.5c-1.8 1-4 .4-5-1.4-.7-1.2-.7-2.7 0-3.9" />
      <path d="M7 9.4C5.2 8.4 4.6 6.2 5.6 4.4 6.3 3.2 7.6 2.4 9 2.3" />
      <path d="M9 7.5c0-2 1.6-3.7 3.6-3.8 1.4 0 2.7.7 3.4 1.9" />
      <path d="M9 7.5c-1.1.6-1.8 1.8-1.8 3.1 0 1.3.7 2.5 1.8 3.1" />
      <path d="M15 7.5c1.1.6 1.8 1.8 1.8 3.1 0 1.3-.7 2.5-1.8 3.1" />
      <path d="M9 13.7c0 1.3.7 2.5 1.8 3.1 1.1.6 2.4.6 3.5 0 1.1-.6 1.8-1.8 1.8-3.1" />
    </svg>
  );
}

/** Moonshot / Kimi — crescent with mark */
export function KimiIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M15.2 3.1a9 9 0 1 0 5.6 15.8A9.6 9.6 0 0 1 8.4 6.4a9 9 0 0 0 6.8-3.3Z" />
      <circle cx="16.8" cy="7.2" r="1.35" />
    </svg>
  );
}

export type AiBrand = "xai" | "anthropic" | "openai" | "moonshot";

export function AiBrandIcon({
  brand,
  className,
}: {
  brand: AiBrand;
  className?: string;
}) {
  switch (brand) {
    case "xai":
      return <XaiIcon className={className} />;
    case "anthropic":
      return <AnthropicIcon className={className} />;
    case "openai":
      return <OpenaiIcon className={className} />;
    case "moonshot":
      return <KimiIcon className={className} />;
    default:
      return null;
  }
}
