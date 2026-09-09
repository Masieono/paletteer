// lib/palette.js — color conversion utilities and tint/shade generation
(function () {
  window.App = window.App || {};

  function hexToRgb(hex) {
    const n = hex.replace("#", "");
    const full = n.length === 3 ? n.split("").map(c => c + c).join("") : n;
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
    };
  }

  function rgbToHex({ r, g, b }) {
    return "#" + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
  }

  function rgbToHsl({ r, g, b }) {
    const R = r / 255, G = g / 255, B = b / 255;
    const max = Math.max(R, G, B), min = Math.min(R, G, B);
    const l = (max + min) / 2;
    if (max === min) return { h: 0, s: 0, l };
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h;
    if (max === R) h = ((G - B) / d + (G < B ? 6 : 0)) / 6;
    else if (max === G) h = ((B - R) / d + 2) / 6;
    else h = ((R - G) / d + 4) / 6;
    return { h: h * 360, s, l };
  }

  function hslToRgb({ h, s, l }) {
    if (s === 0) {
      const v = Math.round(l * 255);
      return { r: v, g: v, b: v };
    }
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hN = h / 360;
    return {
      r: Math.round(hue2rgb(p, q, hN + 1 / 3) * 255),
      g: Math.round(hue2rgb(p, q, hN) * 255),
      b: Math.round(hue2rgb(p, q, hN - 1 / 3) * 255),
    };
  }

  function hexToHsl(hex) { return rgbToHsl(hexToRgb(hex)); }
  function hslToHex(hsl) { return rgbToHex(hslToRgb(hsl)); }

  // OKLCH — perceptually uniform color space (CSS Color 4)
  function linearize(c) {
    return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
  }
  function delinearize(c) {
    return c > 0.0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c;
  }

  function hexToOklch(hex) {
    const { r, g, b } = hexToRgb(hex);
    const lr = linearize(r / 255), lg = linearize(g / 255), lb = linearize(b / 255);
    // Linear sRGB → LMS (Björn Ottosson's M1)
    const l0 = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
    const m0 = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
    const s0 = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
    const l1 = Math.cbrt(l0), m1 = Math.cbrt(m0), s1 = Math.cbrt(s0);
    // LMS^(1/3) → OKLab (M2)
    const L  =  0.2104542553 * l1 + 0.7936177850 * m1 - 0.0040720468 * s1;
    const a  =  1.9779984951 * l1 - 2.4285922050 * m1 + 0.4505937099 * s1;
    const bv =  0.0259040371 * l1 + 0.7827717662 * m1 - 0.8086757660 * s1;
    const C = Math.sqrt(a * a + bv * bv);
    let H = Math.atan2(bv, a) * (180 / Math.PI);
    if (H < 0) H += 360;
    return { l: L, c: C, h: H };
  }

  function oklchToHex({ l, c, h }) {
    const a = c * Math.cos(h * Math.PI / 180);
    const b = c * Math.sin(h * Math.PI / 180);
    // OKLab → LMS^(1/3) (inv M2)
    const l1 = l + 0.3963377774 * a + 0.2158037573 * b;
    const m1 = l - 0.1055613458 * a - 0.0638541728 * b;
    const s1 = l - 0.0894841775 * a - 1.2914855480 * b;
    const l0 = l1 * l1 * l1, m0 = m1 * m1 * m1, s0 = s1 * s1 * s1;
    // LMS → linear sRGB (inv M1)
    const lr =  1.2270138511 * l0 - 0.5577999807 * m0 + 0.2812561490 * s0;
    const lg = -0.0405801784 * l0 + 1.1122568696 * m0 - 0.0716766787 * s0;
    const lb = -0.0763812845 * l0 - 0.4214819784 * m0 + 1.5861632204 * s0;
    const clamp = v => Math.max(0, Math.min(1, v));
    return rgbToHex({
      r: Math.round(delinearize(clamp(lr)) * 255),
      g: Math.round(delinearize(clamp(lg)) * 255),
      b: Math.round(delinearize(clamp(lb)) * 255),
    });
  }

  // CIE76 ΔE — perceptual color difference (values < 10 = very similar)
  function deltaE(hex1, hex2) {
    function toLab(hex) {
      const { r, g, b } = hexToRgb(hex);
      const lr = linearize(r / 255), lg = linearize(g / 255), lb = linearize(b / 255);
      const X = (0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb) / 0.95047;
      const Y = (0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb) / 1.00000;
      const Z = (0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb) / 1.08883;
      const f = v => v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116;
      return { L: 116 * f(Y) - 16, a: 500 * (f(X) - f(Y)), b: 200 * (f(Y) - f(Z)) };
    }
    const l1 = toLab(hex1), l2 = toLab(hex2);
    return Math.sqrt((l1.L - l2.L) ** 2 + (l1.a - l2.a) ** 2 + (l1.b - l2.b) ** 2);
  }

  // Plain Euclidean distance in RGB space (0-255 per channel)
  function rgbDistance(hex1, hex2) {
    const a = hexToRgb(hex1), b = hexToRgb(hex2);
    return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
  }

  // Euclidean distance in OKLab space (perceptually uniform, CSS Color 4)
  function oklabDistance(hex1, hex2) {
    const toAb = hex => {
      const { l, c, h } = hexToOklch(hex);
      const rad = h * Math.PI / 180;
      return { l, a: c * Math.cos(rad), b: c * Math.sin(rad) };
    };
    const p = toAb(hex1), q = toAb(hex2);
    return Math.sqrt((p.l - q.l) ** 2 + (p.a - q.a) ** 2 + (p.b - q.b) ** 2);
  }

  function hexToHslString(hex) {
    const { h, s, l } = hexToHsl(hex);
    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }

  function hexToRgbString(hex) {
    const { r, g, b } = hexToRgb(hex);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Returns array of hex strings: [darkest shade, ..., base color, ..., lightest tint]
  function getTintShade(hex, steps = 5) {
    const { h, s, l } = hexToHsl(hex);
    const result = [];
    for (let i = steps; i >= 1; i--) {
      result.push(hslToHex({ h, s, l: l * (i / (steps + 1)) }));
    }
    result.push(hex);
    for (let i = 1; i <= steps; i++) {
      result.push(hslToHex({ h, s, l: l + (1 - l) * (i / (steps + 1)) }));
    }
    return result;
  }

  // True if the color is perceptually dark enough to need white text
  function needsWhiteText(hex) {
    const { r, g, b } = hexToRgb(hex);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.55;
  }

  // Parse hex, rgb(), hsl(), or a named color (requires App.names to be loaded for names)
  function parseColor(input) {
    const s = (input || "").trim();
    if (!s) return null;

    if (/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s)) {
      const clean = s.replace(/^#/, "");
      const full = clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean;
      return "#" + full.toLowerCase();
    }

    const rgbM = s.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (rgbM) {
      return rgbToHex({
        r: Math.round(Math.min(255, Math.max(0, parseFloat(rgbM[1])))),
        g: Math.round(Math.min(255, Math.max(0, parseFloat(rgbM[2])))),
        b: Math.round(Math.min(255, Math.max(0, parseFloat(rgbM[3])))),
      });
    }

    const hslM = s.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?/i);
    if (hslM) {
      return hslToHex({
        h: parseFloat(hslM[1]),
        s: parseFloat(hslM[2]) / 100,
        l: parseFloat(hslM[3]) / 100,
      });
    }

    if (window.App && App.names && App.names.isLoaded()) {
      return App.names.findByName(s);
    }
    return null;
  }

  window.App.palette = {
    hexToRgb, rgbToHex, rgbToHsl, hslToRgb, hexToHsl, hslToHex,
    hexToHslString, hexToRgbString, getTintShade, needsWhiteText, parseColor,
    hexToOklch, oklchToHex, deltaE, rgbDistance, oklabDistance,
  };
})();
