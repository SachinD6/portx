export function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
  // Update hash without jump
  window.history.replaceState(null, "", `#${sectionId}`);
}

export async function copyToClipboard(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
