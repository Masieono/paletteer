// lib/colorblind.js — color blindness simulation via RGB color matrices
(function () {
  window.App = window.App || {};

  const TYPES = {
    protanopia:    { label: "Protanopia",    desc: "Red-blind (~1% of males)",    matrix: [0.567, 0.433, 0,     0.558, 0.442, 0,     0,     0.242, 0.758] },
    deuteranopia:  { label: "Deuteranopia",  desc: "Green-blind (~1% of males)",  matrix: [0.625, 0.375, 0,     0.700, 0.300, 0,     0,     0.300, 0.700] },
    tritanopia:    { label: "Tritanopia",    desc: "Blue-blind (~0.01%)",          matrix: [0.950, 0.050, 0,     0,     0.433, 0.567, 0,     0.475, 0.525] },
    achromatopsia: { label: "Achromatopsia", desc: "No color vision (~0.003%)",   matrix: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114] },
  };

  function simulateHex(hex, type) {
    const m = TYPES[type]?.matrix;
    if (!m) return hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const clamp = v => Math.round(Math.max(0, Math.min(255, v)));
    const nr = clamp(r * m[0] + g * m[1] + b * m[2]);
    const ng = clamp(r * m[3] + g * m[4] + b * m[5]);
    const nb = clamp(r * m[6] + g * m[7] + b * m[8]);
    return "#" + [nr, ng, nb].map(v => v.toString(16).padStart(2, "0")).join("");
  }

  window.App.colorblind = { TYPES, simulateHex };
})();
