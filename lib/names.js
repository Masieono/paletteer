// lib/names.js — lazy-loaded color name database (meodai/color-names, 31k+ entries)
(function () {
  window.App = window.App || {};

  let _data = null;
  let _loadPromise = null;
  const _nearestCache = new Map();

  function load() {
    if (_data) return Promise.resolve(_data);
    if (_loadPromise) return _loadPromise;
    _loadPromise = fetch("./vendor/color-names.json")
      .then(r => r.json())
      .then(json => { _data = json; return _data; })
      .catch(() => { _data = []; return _data; });
    return _loadPromise;
  }

  function isLoaded() { return _data !== null; }

  // Nearest color name by RGB Euclidean distance (cached per hex)
  function findNearest(hex) {
    if (!_data || !_data.length) return null;
    if (_nearestCache.has(hex)) return _nearestCache.get(hex);

    const { r: tr, g: tg, b: tb } = App.palette.hexToRgb(hex);
    let bestName = null, bestDist = Infinity;

    for (const entry of _data) {
      const { r, g, b } = App.palette.hexToRgb(entry.hex);
      const d = (tr - r) * (tr - r) + (tg - g) * (tg - g) + (tb - b) * (tb - b);
      if (d < bestDist) {
        bestDist = d;
        bestName = entry.name;
        if (d === 0) break;
      }
    }

    _nearestCache.set(hex, bestName);
    return bestName;
  }

  // Exact match by name (case-insensitive)
  function findByName(query) {
    if (!_data) return null;
    const lower = query.toLowerCase().trim();
    const entry = _data.find(e => e.name.toLowerCase() === lower);
    return entry ? entry.hex : null;
  }

  // Prefix-match suggestions for autocomplete (starts-with, then contains)
  function suggest(query, limit = 8) {
    if (!_data || !query.trim()) return [];
    const lower = query.toLowerCase();
    const starts = _data.filter(e => e.name.toLowerCase().startsWith(lower));
    if (starts.length >= limit) return starts.slice(0, limit);
    const contains = _data.filter(e => !e.name.toLowerCase().startsWith(lower) && e.name.toLowerCase().includes(lower));
    return [...starts, ...contains].slice(0, limit);
  }

  window.App.names = { load, isLoaded, findNearest, findByName, suggest };
})();
