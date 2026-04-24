// lib/wcag.js — WCAG 2.1 contrast ratio calculations
(function () {
  window.App = window.App || {};

  function relativeLuminance(hex) {
    const { r, g, b } = App.palette.hexToRgb(hex);
    const lin = c => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  }

  function contrast(hex1, hex2) {
    const L1 = relativeLuminance(hex1);
    const L2 = relativeLuminance(hex2);
    const lighter = Math.max(L1, L2), darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // level for normal-sized body text (AA ≥ 4.5, AAA ≥ 7.0)
  function level(ratio) {
    if (ratio >= 7.0) return "AAA";
    if (ratio >= 4.5) return "AA";
    if (ratio >= 3.0) return "AA large";
    return "fail";
  }

  window.App.wcag = { contrast, level };
})();
