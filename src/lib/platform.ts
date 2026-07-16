export function getModKeyLabel() {
  if (typeof navigator === "undefined") return "⌘";
  const platform = navigator.platform?.toLowerCase() ?? "";
  const ua = navigator.userAgent?.toLowerCase() ?? "";
  const isApple =
    platform.includes("mac") ||
    platform.includes("iphone") ||
    platform.includes("ipad") ||
    ua.includes("mac os");
  return isApple ? "⌘" : "Ctrl";
}

/** Client-safe mod key label without setState-in-effect. */
export function subscribeNoop() {
  return () => {};
}

export function getServerModKeyLabel() {
  return "⌘";
}
