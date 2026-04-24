// lib/harmony.js — color harmony generation
(function () {
  window.App = window.App || {};

  function rotate(h, deg) { return (h + deg + 360) % 360; }

  function generate(seedHex, type) {
    const { hexToHsl, hslToHex } = App.palette;
    const { h, s, l } = hexToHsl(seedHex);

    switch (type) {
      case "complementary":
        return [seedHex, hslToHex({ h: rotate(h, 180), s, l })];

      case "analogous":
        return [
          hslToHex({ h: rotate(h, -30), s, l }),
          hslToHex({ h: rotate(h, -15), s, l }),
          seedHex,
          hslToHex({ h: rotate(h, 15), s, l }),
          hslToHex({ h: rotate(h, 30), s, l }),
        ];

      case "triadic":
        return [
          seedHex,
          hslToHex({ h: rotate(h, 120), s, l }),
          hslToHex({ h: rotate(h, 240), s, l }),
        ];

      case "tetradic":
        return [
          seedHex,
          hslToHex({ h: rotate(h, 90), s, l }),
          hslToHex({ h: rotate(h, 180), s, l }),
          hslToHex({ h: rotate(h, 270), s, l }),
        ];

      case "split-complementary":
        return [
          seedHex,
          hslToHex({ h: rotate(h, 150), s, l }),
          hslToHex({ h: rotate(h, 210), s, l }),
        ];

      case "monochromatic":
        return [
          hslToHex({ h, s, l: Math.max(0.12, l - 0.3) }),
          hslToHex({ h, s, l: Math.max(0.12, l - 0.15) }),
          seedHex,
          hslToHex({ h, s, l: Math.min(0.88, l + 0.15) }),
          hslToHex({ h, s, l: Math.min(0.88, l + 0.3) }),
        ];

      default:
        return [seedHex];
    }
  }

  window.App.harmony = { generate };
})();
