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

  // Nearest-N named colors by a chosen distance metric, with near-duplicate
  // suppression so the result reads as diverse neighbors rather than one
  // clump of near-identical entries. "rgb" mirrors Colordle's own scoring.
  const _nearestNCache = new Map();
  const BLACK_WHITE_DIST = { rgb: Math.sqrt(255 * 255 * 3), lab: 100, oklab: 1 };

  function distanceFor(metric, hexA, hexB) {
    if (metric === "lab") return App.palette.deltaE(hexA, hexB);
    if (metric === "oklab") return App.palette.oklabDistance(hexA, hexB);
    return App.palette.rgbDistance(hexA, hexB);
  }

  // mode "count": stop once `n` results are picked.
  // mode "threshold": keep every result at or above `minPercent` similarity
  // (candidates are scanned in ascending-distance order, so percent only
  // decreases — the first one below the threshold means every later one is
  // too, so it's safe to stop there). `maxResults` is a hard safety cap so a
  // very low threshold on a dense part of the color space can't render
  // thousands of tiles.
  function findNearestN(hex, { metric = "rgb", mode = "count", n = 32, minPercent = 90, dedupe = 12, maxResults = 300 } = {}) {
    if (!_data || !_data.length) return [];
    const cacheKey = `${hex}|${metric}|${mode}|${n}|${minPercent}|${dedupe}`;
    if (_nearestNCache.has(cacheKey)) return _nearestNCache.get(cacheKey);

    const scored = _data
      .map(entry => ({ name: entry.name, hex: entry.hex, distance: distanceFor(metric, hex, entry.hex) }))
      .sort((a, b) => a.distance - b.distance);

    const bw = BLACK_WHITE_DIST[metric] || BLACK_WHITE_DIST.rgb;
    const picked = [];
    for (const cand of scored) {
      if (mode === "count" && picked.length >= n) break;
      if (picked.length >= maxResults) break;
      if (dedupe > 0 && picked.some(p => App.palette.rgbDistance(p.hex, cand.hex) < dedupe)) continue;
      const percent = Math.max(0, Math.min(100, 100 * (1 - cand.distance / bw)));
      if (mode === "threshold" && percent < minPercent) break;
      picked.push({ ...cand, percent });
    }

    _nearestNCache.set(cacheKey, picked);
    return picked;
  }

  window.App.names = { load, isLoaded, findNearest, findByName, suggest, findNearestN };
})();
