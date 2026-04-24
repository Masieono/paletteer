// lib/state.js
(function () {
  window.App = window.App || {};

  const KEY = "plt_state_v1";

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  }

  function itemFromHex(hex) {
    return { id: uid(), hex, locked: false, name: "" };
  }

  const DEFAULT = {
    palette: [],
    savedPalettes: [],
    seedColor: "#6366f1",
    harmonyType: "complementary",
    extractCount: 6,
    exportFormat: "css",
    exportPrefix: "color",
    exportCustomTemplate: "--{{name}}: {{hex}};",
  };

  let _state = structuredClone(DEFAULT);

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Migrate old string[] palette to object[]
        if (Array.isArray(parsed.palette) && parsed.palette.length) {
          parsed.palette = parsed.palette.map(item =>
            typeof item === "string" ? itemFromHex(item) : { name: "", ...item }
          );
        }
        _state = { ...DEFAULT, ...parsed };
      }
    } catch {}
    return _state;
  }

  function get() { return _state; }

  function set(partial) {
    _state = { ..._state, ...partial };
    try { localStorage.setItem(KEY, JSON.stringify(_state)); } catch {}
  }

  function reset() {
    _state = structuredClone(DEFAULT);
    try { localStorage.removeItem(KEY); } catch {}
  }

  window.App.state = { load, get, set, reset, uid, itemFromHex };
})();
