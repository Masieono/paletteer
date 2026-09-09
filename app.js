// -------------------------
// DOM
// -------------------------
const settingsBtn         = document.getElementById("settingsBtn");
const settingsMenu        = document.getElementById("settingsMenu");
const themeToggleBtn      = document.getElementById("themeToggleBtn");
const factoryResetBtn     = document.getElementById("factoryResetBtn");

const paletteTrack        = document.getElementById("paletteTrack");
const colorAddInput       = document.getElementById("colorAddInput");
const colorInputSwatch    = document.getElementById("colorInputSwatch");
const colorSuggestions    = document.getElementById("colorSuggestions");
const eyedropperBtn       = document.getElementById("eyedropperBtn");
const addColorBtn         = document.getElementById("addColorBtn");
const undoBtn             = document.getElementById("undoBtn");
const redoBtn             = document.getElementById("redoBtn");
const clearPaletteBtn     = document.getElementById("clearPaletteBtn");

const tintShadeSection    = document.getElementById("tintShadeSection");
const tintShadeSource     = document.getElementById("tintShadeSource");
const tintShadeTrack      = document.getElementById("tintShadeTrack");
const selectedColorInfo   = document.getElementById("selectedColorInfo");
const selectedWcagRow     = document.getElementById("selectedWcagRow");
const selectedUseAsSeedBtn = document.getElementById("selectedUseAsSeedBtn");
const selectedColorName    = document.getElementById("selectedColorName");

const proximityMetricSelect = document.getElementById("proximityMetricSelect");
const proximityPlot         = document.getElementById("proximityPlot");
const proximityTrack        = document.getElementById("proximityTrack");
const proximityTooltip      = document.getElementById("proximityTooltip");

let proximityCurrentHex = null;
let proximityCurrentNeighbors = [];
let proximityDots = []; // [{x, y, r}] in canvas CSS-pixel space, indexed like proximityCurrentNeighbors
let proximityHoverIdx = null;  // transient — mouse over a dot or its list tile
let proximityPinnedIdx = null; // sticky — set by clicking a dot (also serves touch/tap)

const wcagHealthBadge     = document.getElementById("wcagHealthBadge");

const paletteActions      = document.getElementById("paletteActions");
const generateDetails     = document.getElementById("generateDetails");
const accessibilityDetails = document.getElementById("accessibilityDetails");
const outputDetails       = document.getElementById("outputDetails");
const tabHarmony          = document.getElementById("tabHarmony");
const tabScale            = document.getElementById("tabScale");
const tabRandom           = document.getElementById("tabRandom");
const tabMix              = document.getElementById("tabMix");
const tabExtract          = document.getElementById("tabExtract");
const tabWcag             = document.getElementById("tabWcag");
const tabColorblind       = document.getElementById("tabColorblind");

const randomCountInput    = document.getElementById("randomCountInput");
const randomPreviewTrack  = document.getElementById("randomPreviewTrack");
const randomGenerateBtn   = document.getElementById("randomGenerateBtn");
const randomApplyBtn      = document.getElementById("randomApplyBtn");
const randomAddBtn        = document.getElementById("randomAddBtn");

const mixColorA           = document.getElementById("mixColorA");
const mixColorB           = document.getElementById("mixColorB");
const mixRatioInput       = document.getElementById("mixRatioInput");
const mixRatioVal         = document.getElementById("mixRatioVal");
const mixPreviewTrack     = document.getElementById("mixPreviewTrack");
const mixAddBtn           = document.getElementById("mixAddBtn");

const exportColorNames    = document.getElementById("exportColorNames");
const exportColorNameRow  = document.getElementById("exportColorNameRow");
const exportTextColor     = document.getElementById("exportTextColor");
const exportTextColorRow  = document.getElementById("exportTextColorRow");
const customTemplateRow   = document.getElementById("customTemplateRow");
const customTemplateInput = document.getElementById("customTemplateInput");
const savedSearchInput    = document.getElementById("savedSearchInput");

const scaleStartInput     = document.getElementById("scaleStartInput");
const scaleEndInput       = document.getElementById("scaleEndInput");
const scaleStepsInput     = document.getElementById("scaleStepsInput");
const scaleSwapBtn        = document.getElementById("scaleSwapBtn");
const scaleAddBtn         = document.getElementById("scaleAddBtn");
const scaleReplaceBtn     = document.getElementById("scaleReplaceBtn");
const scalePreviewTrack   = document.getElementById("scalePreviewTrack");

const colorblindBody      = document.getElementById("colorblindBody");

const seedColorInput      = document.getElementById("seedColorInput");
const harmonyPreviewTrack = document.getElementById("harmonyPreviewTrack");
const harmonyApplyBtn     = document.getElementById("harmonyApplyBtn");
const harmonyDesc         = document.getElementById("harmonyDesc");
const harmonyAddBtn       = document.getElementById("harmonyAddBtn");

const imageDropZone       = document.getElementById("imageDropZone");
const imageChooseBtn      = document.getElementById("imageChooseBtn");
const imageFileInput      = document.getElementById("imageFileInput");
const imageWorkArea       = document.getElementById("imageWorkArea");
const imagePreviewEl      = document.getElementById("imagePreview");
const extractCountInput   = document.getElementById("extractCountInput");
const extractPreviewTrack = document.getElementById("extractPreviewTrack");
const extractApplyBtn     = document.getElementById("extractApplyBtn");
const extractAddBtn       = document.getElementById("extractAddBtn");
const imageRemoveBtn      = document.getElementById("imageRemoveBtn");

const wcagBody            = document.getElementById("wcagBody");

const exportPrefixInput   = document.getElementById("exportPrefixInput");
const exportPreview       = document.getElementById("exportPreview");
const exportCopyBtn       = document.getElementById("exportCopyBtn");
const exportDownloadBtn   = document.getElementById("exportDownloadBtn");
const exportPngBtn        = document.getElementById("exportPngBtn");

const paletteNameInput    = document.getElementById("paletteNameInput");
const savePaletteBtn      = document.getElementById("savePaletteBtn");
const savedList           = document.getElementById("savedList");
const savedCount          = document.getElementById("savedCount");

const toastContainer      = document.getElementById("toastContainer");

const sortSelect          = document.getElementById("sortSelect");
const exportShareBtn      = document.getElementById("exportShareBtn");

const adjDetails          = document.getElementById("adjustDetails");
const adjHueShift         = document.getElementById("adjHueShift");
const adjSat              = document.getElementById("adjSat");
const adjLum              = document.getElementById("adjLum");
const adjHueVal           = document.getElementById("adjHueVal");
const adjSatVal           = document.getElementById("adjSatVal");
const adjLumVal           = document.getElementById("adjLumVal");
const adjPreviewTrack     = document.getElementById("adjPreviewTrack");
const adjApplyBtn         = document.getElementById("adjApplyBtn");
const adjResetBtn         = document.getElementById("adjResetBtn");
const adjRandomizeBtn     = document.getElementById("adjRandomizeBtn");

const batchDialog         = document.getElementById("batchDialog");
const batchInput          = document.getElementById("batchInput");
const batchAddBtn         = document.getElementById("batchAddBtn");
const batchReplaceBtn     = document.getElementById("batchReplaceBtn");
const batchCancelBtn      = document.getElementById("batchCancelBtn");
const batchImportBtn      = document.getElementById("batchImportBtn");

// -------------------------
// App state
// -------------------------
let selectedTileIdx   = null;
let dragSrcIdx        = null;
let dragSrcId         = null;
let dropCommitted     = false;
let tileRects         = [];
let lastInsertPos     = -1;
let extractedColors   = [];
let currentImageFile  = null;
let scaleColors       = [];
let randomColors      = [];
let mixedColor        = "#888888";

const undoStack = [];
const redoStack = [];
const MAX_HISTORY = 50;

// -------------------------
// Constants
// -------------------------
const HARMONY_DESCS = {
  complementary:        "Opposite on the wheel — high contrast, vibrant",
  analogous:            "Adjacent hues — cohesive and natural",
  triadic:              "Three equally spaced hues — colorful, balanced",
  tetradic:             "Four hues in a rectangle — rich variety",
  "split-complementary": "Base + two neighbors of its complement — softer contrast",
  monochromatic:        "Tints and shades of one hue — subtle, unified",
};

const RANDOM_MOODS = {
  any:     { sMin: 0.30, sMax: 0.90, lMin: 0.25, lMax: 0.75 },
  pastel:  { sMin: 0.25, sMax: 0.55, lMin: 0.70, lMax: 0.88 },
  vibrant: { sMin: 0.70, sMax: 1.00, lMin: 0.40, lMax: 0.60 },
  earth:   { sMin: 0.20, sMax: 0.55, lMin: 0.30, lMax: 0.55 },
  muted:   { sMin: 0.10, sMax: 0.35, lMin: 0.35, lMax: 0.65 },
  neon:    { sMin: 0.85, sMax: 1.00, lMin: 0.50, lMax: 0.65 },
};

const TEXT_PAIRING_FORMATS  = new Set(["css", "scss", "tailwind", "json"]);
const COLOR_NAMES_FORMATS   = new Set(["css", "scss", "tailwind", "hex", "json", "android", "swift", "tokens", "custom"]);

// -------------------------
// Tab navigation
// -------------------------
function activateTab(detailsEl, tabKey) {
  detailsEl.querySelectorAll(".plt-tab").forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tabKey));
  detailsEl.querySelectorAll(".plt-tab-panel").forEach(panel => { panel.hidden = panel.dataset.panel !== tabKey; });
}

function wireTabGroup(detailsEl) {
  detailsEl.querySelectorAll(".plt-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      activateTab(detailsEl, btn.dataset.tab);
      if (detailsEl === generateDetails && btn.dataset.tab === "scale")  renderScale();
      if (detailsEl === generateDetails && btn.dataset.tab === "random") renderRandom();
      if (detailsEl === generateDetails && btn.dataset.tab === "mix")    renderMix();
      if (detailsEl === accessibilityDetails && btn.dataset.tab === "colorblind") renderColorblind();
    });
  });
}

wireTabGroup(generateDetails);
wireTabGroup(accessibilityDetails);

// -------------------------
// Boot
// -------------------------
App.state.load();
App.theme.init({ toggleBtnEl: themeToggleBtn });
parseHashPalette();
restoreFormState();
renderAll();

// Load color names in background; update tile names and export preview once loaded
App.names.load().then(() => {
  updateAllTileNames();
  if (exportColorNames.checked) renderExportPreview();
});

// Show eyedropper if supported
if ("EyeDropper" in window) eyedropperBtn.hidden = false;

// Deselect tile when clicking outside the palette track and tint/shade section
document.addEventListener("pointerdown", (e) => {
  if (selectedTileIdx === null) return;
  const clickedTile = e.target.closest(".plt-tile");
  if (clickedTile && paletteTrack.contains(clickedTile)) return;
  if (tintShadeSection.contains(e.target)) return;
  selectedTileIdx = null;
  updateTileSelection();
  tintShadeSection.hidden = true;
});

// -------------------------
// Undo / redo
// -------------------------
function pushUndo() {
  undoStack.push(structuredClone(App.state.get().palette));
  if (undoStack.length > MAX_HISTORY) undoStack.shift();
  redoStack.length = 0;
  updateUndoRedoBtns();
}

function undo() {
  if (!undoStack.length) return;
  redoStack.push(structuredClone(App.state.get().palette));
  App.state.set({ palette: undoStack.pop() });
  updateUndoRedoBtns();
  renderAll();
  toast("Undo", "info");
}

function redo() {
  if (!redoStack.length) return;
  undoStack.push(structuredClone(App.state.get().palette));
  App.state.set({ palette: redoStack.pop() });
  updateUndoRedoBtns();
  renderAll();
  toast("Redo", "info");
}

function updateUndoRedoBtns() {
  undoBtn.disabled = undoStack.length === 0;
  redoBtn.disabled = redoStack.length === 0;
}

// -------------------------
// Palette helpers
// -------------------------

// Always use this instead of App.state.set({palette:...}) to track undo
function setPalette(newPalette) {
  pushUndo();
  App.state.set({ palette: newPalette });
}

// When applying harmony/extract, keep locked tiles in place
function applyColorsPreservingLocks(newHexes) {
  const current = App.state.get().palette;
  if (!current.some(item => item.locked)) {
    return newHexes.map(hex => App.state.itemFromHex(hex));
  }
  const result = [...current];
  const queue = [...newHexes];
  for (let i = 0; i < result.length && queue.length; i++) {
    if (!result[i].locked) result[i] = App.state.itemFromHex(queue.shift());
  }
  while (queue.length) result.push(App.state.itemFromHex(queue.shift()));
  return result;
}

function addColorToPalette(hex) {
  const p = App.state.get().palette.slice();
  p.push(App.state.itemFromHex(hex));
  setPalette(p);
  selectedTileIdx = p.length - 1;
  renderAll();
}

// -------------------------
// Render: full refresh
// -------------------------
function renderAll() {
  renderPaletteAnimated();
  renderHarmonyPreview();
  renderTintShade();
  renderWcag();
  renderExportPreview();
  renderSaved();
  if (adjDetails.open) renderAdjPreview();
  if (generateDetails.open && !tabScale.hidden)  renderScale();
  if (generateDetails.open && !tabRandom.hidden) renderRandom();
  if (generateDetails.open && !tabMix.hidden)    renderMix();
  if (accessibilityDetails.open && !tabColorblind.hidden) renderColorblind();
  renderProximity();
}

// -------------------------
// Render: palette track
// -------------------------
function renderPalette() {
  const palette = App.state.get().palette;
  paletteActions.hidden = !palette.length;
  paletteTrack.innerHTML = "";

  if (!palette.length) {
    const empty = document.createElement("div");
    empty.className = "plt-track-empty";
    empty.textContent = "No colors yet — type a color above or generate a harmony.";
    paletteTrack.appendChild(empty);
    return;
  }

  palette.forEach((item, i) => {
    paletteTrack.appendChild(makeFullTile(item, i, i === selectedTileIdx));
  });
}

// FLIP-animated palette render (used by renderAll)
function renderPaletteAnimated() {
  const before = new Map();
  paletteTrack.querySelectorAll(".plt-tile[data-item-id]").forEach(el => {
    // Skip the dragged tile so it materializes at the new position instead of
    // flying in from its original grid slot
    if (el.dataset.itemId === dragSrcId) return;
    before.set(el.dataset.itemId, el.getBoundingClientRect());
  });

  renderPalette();

  paletteTrack.querySelectorAll(".plt-tile[data-item-id]").forEach(el => {
    const prev = before.get(el.dataset.itemId);
    if (!prev) return;
    const next = el.getBoundingClientRect();
    const dx = prev.left - next.left;
    const dy = prev.top - next.top;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
    el.style.transition = "none";
    el.style.transform = `translate(${dx}px,${dy}px)`;
    requestAnimationFrame(() => {
      el.style.transition = "transform 220ms cubic-bezier(0.25,0.46,0.45,0.94)";
      el.style.transform = "";
      el.addEventListener("transitionend", () => {
        el.style.transition = "";
        el.style.transform = "";
      }, { once: true });
    });
  });
}

// Update only the .selected class on existing tiles (no DOM re-creation)
function updateTileSelection() {
  paletteTrack.querySelectorAll(".plt-tile").forEach((t, i) => {
    t.classList.toggle("selected", i === selectedTileIdx);
  });
}

function selectTile(idx) {
  selectedTileIdx = idx;
  updateTileSelection();
  renderTintShade();
  renderProximity();
}

// Update name labels across all rendered tiles (called after names load)
// Only updates tiles that don't have a user-assigned name
function updateAllTileNames() {
  const palette = App.state.get().palette;
  document.querySelectorAll(".plt-tile-name").forEach(nameEl => {
    if (nameEl.querySelector("input")) return; // skip tiles being edited
    const tile = nameEl.closest(".plt-tile");
    const hexEl = tile?.querySelector(".plt-tile-hex");
    if (!hexEl) return;
    const hex = hexEl.textContent.trim();
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return;
    // Skip if user has assigned a name (check state by index)
    const idx = tile.dataset.idx != null ? parseInt(tile.dataset.idx) : -1;
    if (idx >= 0 && palette[idx]?.name) return;
    if (!nameEl.textContent) {
      const n = App.names.findNearest(hex) || "";
      nameEl.textContent = n;
      if (n) nameEl.title = `${n} — click to edit`;
    }
  });
}

// -------------------------
// Full tile factory (palette track)
// -------------------------
function makeFullTile(item, idx, selected) {
  const { hex, locked } = item;

  const tile = document.createElement("div");
  tile.className = "plt-tile" + (selected ? " selected" : "") + (locked ? " locked" : "");
  tile.setAttribute("role", "listitem");
  tile.draggable = true;
  tile.dataset.idx = idx;
  tile.dataset.itemId = item.id;

  // --- Swatch area ---
  const swatch = document.createElement("div");
  swatch.className = "plt-tile-swatch";
  swatch.style.background = hex;

  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.value = hex;
  colorInput.className = "plt-tile-color-input";
  if (locked) colorInput.disabled = true;

  // Hover controls
  const controls = document.createElement("div");
  controls.className = "plt-tile-controls";

  const lockBtn = document.createElement("button");
  lockBtn.type = "button";
  lockBtn.className = "plt-tile-btn plt-tile-lock-btn";
  lockBtn.title = locked ? "Unlock" : "Lock";
  lockBtn.innerHTML = `<svg viewBox="0 0 24 24"><use href="#i-lock"></use></svg>`;

  const dupeBtn = document.createElement("button");
  dupeBtn.type = "button";
  dupeBtn.className = "plt-tile-btn plt-tile-dupe-btn";
  dupeBtn.title = "Duplicate";
  dupeBtn.innerHTML = `<svg viewBox="0 0 16 16"><use href="#i-duplicate"></use></svg>`;

  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "plt-tile-btn plt-tile-copy-btn";
  copyBtn.title = "Copy hex";
  copyBtn.innerHTML = `<svg viewBox="0 0 12 12"><use href="#i-copy"></use></svg>`;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "plt-tile-btn plt-tile-remove-btn";
  removeBtn.title = "Remove";
  removeBtn.innerHTML = `<svg viewBox="0 0 16 16"><use href="#i-clear"></use></svg>`;

  controls.appendChild(lockBtn);
  controls.appendChild(dupeBtn);
  controls.appendChild(copyBtn);
  controls.appendChild(removeBtn);

  // Lock badge (always visible when locked)
  const lockBadge = document.createElement("div");
  lockBadge.className = "plt-tile-lock-badge";
  lockBadge.innerHTML = `<svg viewBox="0 0 24 24"><use href="#i-lock"></use></svg>`;

  swatch.appendChild(colorInput);
  swatch.appendChild(controls);
  swatch.appendChild(lockBadge);

  // --- Footer ---
  const footer = document.createElement("div");
  footer.className = "plt-tile-footer";

  const hexLabel = document.createElement("span");
  hexLabel.className = locked ? "plt-tile-hex" : "plt-tile-hex plt-tile-hex--clickable";
  hexLabel.textContent = hex;
  hexLabel.style.pointerEvents = locked ? "" : "auto";
  if (!locked) {
    hexLabel.title = "Click to change color";
    hexLabel.addEventListener("click", (e) => {
      e.stopPropagation();
      if (selectedTileIdx !== idx) selectTile(idx);
      colorInput.click();
    });
  }

  const nameLabel = document.createElement("span");
  nameLabel.className = "plt-tile-name";
  const resolvedName = item.name || (App.names.isLoaded() ? (App.names.findNearest(hex) || "") : "");
  nameLabel.textContent = resolvedName;
  nameLabel.title = resolvedName ? `${resolvedName} — click to edit` : "Click to set label";
  nameLabel.style.pointerEvents = "auto";
  nameLabel.style.cursor = "text";

  footer.appendChild(hexLabel);
  footer.appendChild(nameLabel);

  tile.appendChild(swatch);
  tile.appendChild(footer);

  // Double-click on swatch as secondary way to open color picker
  if (!locked) {
    swatch.addEventListener("dblclick", (e) => {
      if (e.target.closest(".plt-tile-btn")) return;
      colorInput.click();
    });
  }

  // --- Events ---

  colorInput.addEventListener("input", () => {
    swatch.style.background = colorInput.value;
    hexLabel.textContent = colorInput.value;
  });

  colorInput.addEventListener("change", () => {
    const p = App.state.get().palette.slice();
    const newHex = colorInput.value;
    if (newHex === p[idx]?.hex) return;
    setPalette(p.map((it, i) => i === idx ? { ...it, hex: newHex } : it));
    selectedTileIdx = idx;
    renderAll();
  });

  tile.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".plt-tile-btn")) return;
    if (e.target.closest(".plt-tile-name")) return;
    if (e.target.closest(".plt-tile-hex--clickable")) return;
    if (selectedTileIdx === idx) {
      selectedTileIdx = null;
      updateTileSelection();
      tintShadeSection.hidden = true;
    } else {
      selectTile(idx);
    }
  });

  // Inline name editing
  nameLabel.addEventListener("click", (e) => {
    e.stopPropagation();
    if (nameLabel.querySelector("input")) return;
    if (selectedTileIdx !== idx) selectTile(idx);
    const currentItem = App.state.get().palette[idx];
    if (!currentItem) return;
    const savedName = currentItem.name || "";
    const input = document.createElement("input");
    input.type = "text";
    input.value = savedName;
    input.placeholder = App.names.isLoaded() ? (App.names.findNearest(hex) || "label…") : "label…";
    input.style.cssText = "font-size:11px;padding:1px 3px;width:100%;box-sizing:border-box;border:1px solid var(--accent);border-radius:2px;background:var(--page-bg);color:inherit;outline:none;";
    nameLabel.textContent = "";
    nameLabel.appendChild(input);
    input.focus();
    input.select();
    function commitName() {
      if (!nameLabel.contains(input)) return;
      const newName = input.value.trim();
      const p = App.state.get().palette.slice();
      if (p[idx]) p[idx] = { ...p[idx], name: newName };
      App.state.set({ palette: p });
      nameLabel.removeChild(input);
      const displayName = newName || (App.names.isLoaded() ? (App.names.findNearest(hex) || "") : "");
      nameLabel.textContent = displayName;
      nameLabel.title = displayName ? `${displayName} — click to edit` : "Click to set label";
    }
    input.addEventListener("blur", commitName);
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") { ev.preventDefault(); input.blur(); }
      if (ev.key === "Escape") { input.value = savedName; input.blur(); }
    });
  });

  lockBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const p = App.state.get().palette.slice();
    setPalette(p.map((it, i) => i === idx ? { ...it, locked: !it.locked } : it));
    renderPalette();
    renderTintShade();
  });

  dupeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const p = App.state.get().palette.slice();
    p.splice(idx + 1, 0, { ...p[idx], id: App.state.uid() });
    setPalette(p);
    selectedTileIdx = idx + 1;
    renderAll();
  });

  copyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const origHTML = copyBtn.innerHTML;
    navigator.clipboard.writeText(hex).then(() => {
      copyBtn.textContent = "✓";
      copyBtn.style.cssText = "background:rgba(74,222,128,0.85);color:#000;";
      setTimeout(() => { copyBtn.innerHTML = origHTML; copyBtn.style.cssText = ""; }, 1200);
    }).catch(() => toast("Copy failed.", "error"));
  });

  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const p = App.state.get().palette.slice();
    p.splice(idx, 1);
    setPalette(p);
    if (selectedTileIdx !== null && selectedTileIdx >= p.length) {
      selectedTileIdx = p.length - 1;
    }
    renderAll();
  });

  // Drag-to-reorder with live tile repositioning
  tile.addEventListener("dragstart", (e) => {
    dragSrcIdx = idx;
    dragSrcId = item.id;
    dropCommitted = false;
    lastInsertPos = -1;
    e.dataTransfer.effectAllowed = "move";

    // Snapshot track-relative positions of all tiles before any transforms
    const trackRect = paletteTrack.getBoundingClientRect();
    tileRects = Array.from(paletteTrack.querySelectorAll(".plt-tile[data-item-id]")).map(t => {
      const r = t.getBoundingClientRect();
      return { left: r.left - trackRect.left, top: r.top - trackRect.top };
    });

    // Custom drag image — full-opacity clone
    const ghost = tile.cloneNode(true);
    const tileRect = tile.getBoundingClientRect();
    ghost.style.cssText = `position:fixed;top:-9999px;left:-9999px;width:${tileRect.width}px;opacity:1;transform:none;transition:none;pointer-events:none;`;
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, e.clientX - tileRect.left, e.clientY - tileRect.top);
    requestAnimationFrame(() => {
      ghost.remove();
      tile.classList.add("dragging");
    });
  });
  tile.addEventListener("dragend", () => {
    tile.classList.remove("dragging");
    dragSrcIdx = null;
    dragSrcId = null;
    tileRects = [];
    // Skip clearDragTransforms on successful drop — FLIP animation is already
    // running on the new DOM and clearing transforms would cancel it mid-flight
    if (!dropCommitted) clearDragTransforms();
    dropCommitted = false;
  });
  tile.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragSrcIdx === null || dragSrcIdx === idx) return;
    const rect = tile.getBoundingClientRect();
    const insertPos = e.clientX < rect.left + rect.width / 2 ? idx : idx + 1;
    applyDragTransforms(insertPos);
  });
  tile.addEventListener("drop", (e) => {
    e.preventDefault();
    if (dragSrcIdx === null || dragSrcIdx === idx) return;
    if (lastInsertPos === -1) {
      // fallback if dragover never fired (very fast drag)
      const rect = tile.getBoundingClientRect();
      lastInsertPos = e.clientX < rect.left + rect.width / 2 ? idx : idx + 1;
    }
    commitDrop();
  });

  return tile;
}

// -------------------------
// Small tile factory (tint/shade — includes hover action buttons)
// -------------------------
function makeTintShadeTile(hex, opts = {}) {
  const tile = document.createElement("div");
  tile.className = "plt-tile plt-tile--small";
  tile.setAttribute("role", "listitem");

  const swatch = document.createElement("div");
  swatch.className = "plt-tile-small-swatch";
  swatch.style.background = hex;

  const controls = document.createElement("div");
  controls.className = "plt-tile-small-controls";

  const swapBtn = document.createElement("button");
  swapBtn.type = "button";
  swapBtn.className = "plt-tile-small-btn";
  swapBtn.title = "Swap selected tile with this shade";
  swapBtn.innerHTML = `<svg viewBox="0 0 16 16"><use href="#i-swap"></use></svg>`;

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "plt-tile-small-btn";
  addBtn.title = "Add to palette";
  addBtn.innerHTML = `<svg viewBox="0 0 12 12"><use href="#i-plus"></use></svg>`;

  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "plt-tile-small-btn";
  copyBtn.title = "Copy hex";
  copyBtn.innerHTML = `<svg viewBox="0 0 12 12"><use href="#i-copy"></use></svg>`;

  controls.appendChild(swapBtn);
  controls.appendChild(addBtn);
  controls.appendChild(copyBtn);
  swatch.appendChild(controls);

  const footer = document.createElement("div");
  footer.className = "plt-tile-small-footer";

  const hexLabel = document.createElement("span");
  hexLabel.className = "plt-tile-hex";
  hexLabel.textContent = hex;

  const nameLabel = document.createElement("span");
  nameLabel.className = "plt-tile-name";
  const tintName = opts.name != null ? opts.name : (App.names.isLoaded() ? (App.names.findNearest(hex) || "") : "");
  nameLabel.textContent = tintName;
  if (tintName) nameLabel.title = tintName;

  footer.appendChild(hexLabel);
  footer.appendChild(nameLabel);

  if (opts.badge) {
    const badgeLabel = document.createElement("span");
    badgeLabel.className = "plt-tile-badge";
    badgeLabel.textContent = opts.badge;
    footer.appendChild(badgeLabel);
  }
  tile.appendChild(swatch);
  tile.appendChild(footer);

  tile.addEventListener("click", (e) => {
    if (e.target.closest(".plt-tile-small-btn")) return;
    const p = App.state.get().palette.slice();
    setPalette([...p, App.state.itemFromHex(hex)]);
    selectedTileIdx = p.length;
    renderAll();
    toast(`Added ${hex}`, "success");
  });

  swapBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (selectedTileIdx === null) return;
    const p = App.state.get().palette.slice();
    if (!p[selectedTileIdx]) return;
    p[selectedTileIdx] = { ...p[selectedTileIdx], hex };
    setPalette(p);
    renderAll();
    toast(`Swapped to ${hex}`, "success");
  });

  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const p = App.state.get().palette.slice();
    setPalette([...p, App.state.itemFromHex(hex)]);
    selectedTileIdx = p.length;
    renderAll();
    toast(`Added ${hex}`, "success");
  });

  copyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const origHTML = copyBtn.innerHTML;
    navigator.clipboard.writeText(hex).then(() => {
      copyBtn.textContent = "✓";
      copyBtn.style.cssText = "background:rgba(74,222,128,0.85);color:#000;";
      setTimeout(() => { copyBtn.innerHTML = origHTML; copyBtn.style.cssText = ""; }, 1200);
    }).catch(() => toast("Copy failed.", "error"));
  });

  return tile;
}

// -------------------------
// Small tile factory (previews)
// -------------------------
function makeSmallTile(hex) {
  const tile = document.createElement("div");
  tile.className = "plt-tile plt-tile--small";
  tile.setAttribute("role", "listitem");

  const swatch = document.createElement("div");
  swatch.className = "plt-tile-small-swatch";
  swatch.style.background = hex;

  const controls = document.createElement("div");
  controls.className = "plt-tile-small-controls";

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "plt-tile-small-btn";
  addBtn.title = "Add to palette";
  addBtn.innerHTML = `<svg viewBox="0 0 12 12"><use href="#i-plus"></use></svg>`;

  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "plt-tile-small-btn";
  copyBtn.title = "Copy hex";
  copyBtn.innerHTML = `<svg viewBox="0 0 12 12"><use href="#i-copy"></use></svg>`;

  controls.appendChild(addBtn);
  controls.appendChild(copyBtn);
  swatch.appendChild(controls);

  const footer = document.createElement("div");
  footer.className = "plt-tile-small-footer";

  const hexLabel = document.createElement("span");
  hexLabel.className = "plt-tile-hex";
  hexLabel.textContent = hex;

  const nameLabel = document.createElement("span");
  nameLabel.className = "plt-tile-name";
  const smallName = App.names.isLoaded() ? (App.names.findNearest(hex) || "") : "";
  nameLabel.textContent = smallName;
  if (smallName) nameLabel.title = smallName;

  footer.appendChild(hexLabel);
  footer.appendChild(nameLabel);
  tile.appendChild(swatch);
  tile.appendChild(footer);

  tile.addEventListener("click", (e) => {
    if (e.target.closest(".plt-tile-small-btn")) return;
    const p = App.state.get().palette.slice();
    setPalette([...p, App.state.itemFromHex(hex)]);
    selectedTileIdx = p.length;
    renderAll();
    toast(`Added ${hex}`, "success");
  });

  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const p = App.state.get().palette.slice();
    setPalette([...p, App.state.itemFromHex(hex)]);
    selectedTileIdx = p.length;
    renderAll();
    toast(`Added ${hex}`, "success");
  });

  copyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const origHTML = copyBtn.innerHTML;
    navigator.clipboard.writeText(hex).then(() => {
      copyBtn.textContent = "✓";
      copyBtn.style.cssText = "background:rgba(74,222,128,0.85);color:#000;";
      setTimeout(() => { copyBtn.innerHTML = origHTML; copyBtn.style.cssText = ""; }, 1200);
    }).catch(() => toast("Copy failed.", "error"));
  });

  return tile;
}

// -------------------------
// Render: harmony preview
// -------------------------
function renderHarmonyPreview() {
  const { seedColor, harmonyType } = App.state.get();
  if (seedColorInput.value !== seedColor) seedColorInput.value = seedColor;
  const colors = App.harmony.generate(seedColor, harmonyType);
  harmonyPreviewTrack.innerHTML = "";
  colors.forEach(hex => harmonyPreviewTrack.appendChild(makeSmallTile(hex)));
}

// -------------------------
// Render: selected color panel (color info, WCAG mini, tints/shades)
// -------------------------
function renderTintShade() {
  const palette = App.state.get().palette;
  if (selectedTileIdx === null || selectedTileIdx >= palette.length) {
    tintShadeSection.hidden = true;
    return;
  }
  const item = palette[selectedTileIdx];
  const hex = item.hex;
  tintShadeSource.textContent = hex;
  selectedColorName.textContent = item.name || (App.names.isLoaded() ? (App.names.findNearest(hex) || "") : "");
  tintShadeSection.hidden = false;

  // -- Color values (HEX · RGB · HSL) --
  const rgb = App.palette.hexToRgb(hex);
  const hsl = App.palette.hexToHsl(hex);
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;
  const oklch = App.palette.hexToOklch(hex);
  const oklchStr = `oklch(${oklch.l.toFixed(4)} ${oklch.c.toFixed(4)} ${Math.round(oklch.h)})`;

  selectedColorInfo.innerHTML = "";
  [
    { label: "HEX",   value: hex,                                                                                        copy: hex      },
    { label: "RGB",   value: `${rgb.r} · ${rgb.g} · ${rgb.b}`,                                                          copy: rgbStr   },
    { label: "HSL",   value: `${Math.round(hsl.h)}° · ${Math.round(hsl.s * 100)}% · ${Math.round(hsl.l * 100)}%`,      copy: hslStr   },
    { label: "OKLCH", value: `${oklch.l.toFixed(3)} · ${oklch.c.toFixed(3)} · ${Math.round(oklch.h)}°`,                 copy: oklchStr },
  ].forEach(({ label, value, copy }) => {
    const cell = document.createElement("div");
    cell.className = "plt-selected-cell";

    const lbl = document.createElement("span");
    lbl.className = "plt-selected-cell-label";
    lbl.textContent = label;

    const valueRow = document.createElement("div");
    valueRow.className = "plt-selected-cell-value-row";

    const val = document.createElement("span");
    val.className = "plt-selected-cell-value";
    val.textContent = value;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "plt-tile-small-btn";
    btn.title = `Copy ${label}`;
    btn.innerHTML = `<svg viewBox="0 0 12 12"><use href="#i-copy"></use></svg>`;
    btn.addEventListener("click", () => {
      const origHTML = btn.innerHTML;
      navigator.clipboard.writeText(copy).then(() => {
        btn.textContent = "✓";
        btn.style.cssText = "background:rgba(74,222,128,0.85);color:#000;";
        setTimeout(() => { btn.innerHTML = origHTML; btn.style.cssText = ""; }, 1200);
      }).catch(() => toast("Copy failed.", "error"));
    });

    valueRow.appendChild(val);
    valueRow.appendChild(btn);
    cell.appendChild(lbl);
    cell.appendChild(valueRow);
    selectedColorInfo.appendChild(cell);
  });

  // -- WCAG quick check (vs black text / vs white text) --
  const badgeCls = { "AAA": "pass-aaa", "AA": "pass-aa", "AA large": "pass-lg", "fail": "fail" };
  selectedWcagRow.innerHTML = "";
  [
    { textColor: "#000000", label: "Black text" },
    { textColor: "#ffffff", label: "White text" },
  ].forEach(({ textColor, label }) => {
    const ratio = App.wcag.contrast(hex, textColor);
    const lv    = App.wcag.level(ratio);

    const chip = document.createElement("div");
    chip.className = "plt-wcag-chip";

    const chipSwatch = document.createElement("span");
    chipSwatch.className = "plt-wcag-chip-swatch";
    chipSwatch.style.background = hex;
    chipSwatch.style.color = textColor;
    chipSwatch.textContent = "Aa";

    const chipLbl = document.createElement("span");
    chipLbl.className = "plt-wcag-chip-label";
    chipLbl.textContent = label;

    const ratioEl = document.createElement("span");
    ratioEl.className = "plt-wcag-chip-ratio";
    ratioEl.textContent = ratio.toFixed(1) + ":1";

    const badge = document.createElement("span");
    badge.className = `plt-selected-wcag-badge ${badgeCls[lv] || "fail"}`;
    badge.textContent = lv;

    chip.appendChild(chipSwatch);
    chip.appendChild(chipLbl);
    chip.appendChild(ratioEl);
    chip.appendChild(badge);
    selectedWcagRow.appendChild(chip);
  });

  // -- Tints & Shades --
  const shades = App.palette.getTintShade(hex, 8).slice(0, 16);
  tintShadeTrack.innerHTML = "";
  shades.forEach(h => {
    const tile = makeTintShadeTile(h);
    if (h.toLowerCase() === hex.toLowerCase()) {
      tile.style.outline = "2px solid rgba(80,140,255,0.85)";
      tile.style.outlineOffset = "2px";
    }
    tintShadeTrack.appendChild(tile);
  });
}

// -------------------------
// Render: Nearby Named Colors (proximity list + plot)
// -------------------------
function renderProximity() {
  const palette = App.state.get().palette;
  if (selectedTileIdx === null || selectedTileIdx >= palette.length) {
    proximityTrack.innerHTML = "";
    return;
  }
  const hex = palette[selectedTileIdx].hex;

  if (!App.names.isLoaded()) {
    proximityTrack.innerHTML = "";
    const msg = document.createElement("p");
    msg.className = "plt-harmony-desc";
    msg.textContent = "Loading color names…";
    proximityTrack.appendChild(msg);
    App.names.load().then(() => renderProximity());
    return;
  }

  const metric = proximityMetricSelect.value;
  const neighbors = App.names.findNearestN(hex, { metric, n: 30 });

  proximityCurrentHex = hex;
  proximityCurrentNeighbors = neighbors;
  proximityHoverIdx = null;
  proximityPinnedIdx = null;

  proximityTrack.innerHTML = "";
  neighbors.forEach((nb, i) => {
    const tile = makeTintShadeTile(nb.hex, { name: nb.name, badge: `${Math.round(nb.percent)}%` });
    tile.addEventListener("mouseenter", () => { proximityHoverIdx = i; updateProximityDisplay(); });
    tile.addEventListener("mouseleave", () => { proximityHoverIdx = null; updateProximityDisplay(); });
    proximityTrack.appendChild(tile);
  });

  drawProximityPlot(hex, neighbors, null);
  updateProximityTooltip(null);
}

// Effective highlight = whichever dot is under the mouse, falling back to a
// pinned (clicked) one — keeps compass dots and list tiles identifiable
// even when they're too visually similar to tell apart on sight.
function updateProximityDisplay() {
  const idx = proximityHoverIdx !== null ? proximityHoverIdx : proximityPinnedIdx;
  Array.from(proximityTrack.children).forEach((tile, i) => {
    tile.classList.toggle("plt-tile--proximity-active", i === idx);
  });
  drawProximityPlot(proximityCurrentHex, proximityCurrentNeighbors, idx);
  updateProximityTooltip(idx);
}

function updateProximityTooltip(idx) {
  if (idx === null || !proximityCurrentNeighbors[idx]) {
    proximityTooltip.hidden = true;
    return;
  }
  const nb = proximityCurrentNeighbors[idx];
  const dot = proximityDots[idx];
  proximityTooltip.hidden = false;
  proximityTooltip.innerHTML = "";

  const swatch = document.createElement("span");
  swatch.className = "plt-proximity-tooltip-swatch";
  swatch.style.background = nb.hex;

  const text = document.createElement("span");
  text.className = "plt-proximity-tooltip-text";
  const strong = document.createElement("strong");
  strong.textContent = nb.name;
  const sub = document.createElement("span");
  sub.textContent = `${nb.hex} · ${Math.round(nb.percent)}%`;
  text.appendChild(strong);
  text.appendChild(sub);

  proximityTooltip.appendChild(swatch);
  proximityTooltip.appendChild(text);

  if (dot) {
    const size = proximityPlot.clientWidth || 320;
    let left = dot.x + 12;
    let top = dot.y - 12;
    if (left > size - 172) left = Math.max(0, dot.x - 172);
    if (top < 0) top = dot.y + 12;
    proximityTooltip.style.left = `${left}px`;
    proximityTooltip.style.top = `${top}px`;
  }
}

function hitTestProximity(e) {
  const rect = proximityPlot.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  let best = null, bestDist = Infinity;
  proximityDots.forEach((d, i) => {
    const dist = Math.hypot(d.x - x, d.y - y);
    const hitRadius = Math.max(d.r + 4, 8);
    if (dist <= hitRadius && dist < bestDist) { bestDist = dist; best = i; }
  });
  return best;
}

proximityPlot.addEventListener("mousemove", (e) => {
  const idx = hitTestProximity(e);
  proximityPlot.style.cursor = idx !== null ? "pointer" : "default";
  if (idx !== proximityHoverIdx) { proximityHoverIdx = idx; updateProximityDisplay(); }
});

proximityPlot.addEventListener("mouseleave", () => {
  if (proximityHoverIdx !== null) { proximityHoverIdx = null; updateProximityDisplay(); }
});

proximityPlot.addEventListener("click", (e) => {
  const idx = hitTestProximity(e);
  proximityPinnedIdx = (idx !== null && proximityPinnedIdx === idx) ? null : idx;
  updateProximityDisplay();
});

document.addEventListener("pointerdown", (e) => {
  if (proximityPinnedIdx !== null && !proximityPlot.contains(e.target)) {
    proximityPinnedIdx = null;
    updateProximityDisplay();
  }
});

// Relative "compass" plot: selected color pinned at center, neighbors placed
// by hue/lightness offset from it; dot size/opacity encodes overall
// closeness under the chosen metric (covers the dimension the axes can't).
function drawProximityPlot(hex, neighbors, highlightIdx = null) {
  const dpr = window.devicePixelRatio || 1;
  const size = proximityPlot.clientWidth || 420;
  proximityPlot.width = size * dpr;
  proximityPlot.height = size * dpr;
  const ctx = proximityPlot.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);
  proximityDots = [];
  if (!neighbors.length) return;

  const rootStyles = getComputedStyle(document.documentElement);
  // Structural lines stay subtle; labels need to actually be readable, so they
  // get the real (near-black/near-white) text color, not the divider tint.
  const gridColor  = rootStyles.getPropertyValue("--border").trim() || "rgba(127,127,127,0.35)";
  const labelColor = getComputedStyle(document.body).color || "currentColor";
  const accentColor = rootStyles.getPropertyValue("--accent").trim() || "rgba(80,140,255,0.95)";

  const cx = size / 2, cy = size / 2;
  // Margin sized to fit "hue +"/"hue -" outside the circle on the sides,
  // matching how "lighter"/"darker" sit outside it on the top/bottom.
  const margin = 46;
  const maxRadius = size / 2 - margin;

  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - maxRadius, cy); ctx.lineTo(cx + maxRadius, cy);
  ctx.moveTo(cx, cy - maxRadius); ctx.lineTo(cx, cy + maxRadius);
  ctx.stroke();
  [0.5, 1].forEach(f => {
    ctx.beginPath();
    ctx.arc(cx, cy, maxRadius * f, 0, Math.PI * 2);
    ctx.stroke();
  });

  ctx.fillStyle = labelColor;
  ctx.font = "700 11px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("lighter", cx, cy - maxRadius - 12);
  ctx.fillText("darker", cx, cy + maxRadius + 20);
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText("hue +", cx + maxRadius + 6, cy);
  ctx.textAlign = "right";
  ctx.fillText("hue −", cx - maxRadius - 6, cy);
  ctx.textBaseline = "alphabetic";

  const baseHsl = App.palette.hexToHsl(hex);
  const maxDist = Math.max(...neighbors.map(n => n.distance), 1e-6);

  // Per-axis offsets from the selected color, in hue-degrees and lightness-fraction
  const offsets = neighbors.map(nb => {
    const nbHsl = App.palette.hexToHsl(nb.hex);
    let dh = nbHsl.h - baseHsl.h;
    if (dh > 180) dh -= 360;
    if (dh < -180) dh += 360;
    return { nb, dh, dl: nbHsl.l - baseHsl.l };
  });

  // Zoom each axis to the actual spread of the shown neighbors (floored so a
  // tight cluster of near-duplicates doesn't get blown up into false spread)
  const maxDh = Math.max(...offsets.map(o => Math.abs(o.dh)), 8);
  const maxDl = Math.max(...offsets.map(o => Math.abs(o.dl)), 0.04);

  offsets.forEach(({ nb, dh, dl }, i) => {
    const x = cx + (dh / maxDh) * maxRadius * 0.9;
    const y = cy - (dl / maxDl) * maxRadius * 0.9;

    const closeness = 1 - (nb.distance / maxDist);
    const r = 3 + closeness * 6;
    proximityDots.push({ x, y, r });

    ctx.beginPath();
    ctx.fillStyle = nb.hex;
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.55 + closeness * 0.45;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (i === highlightIdx) {
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2.5;
      ctx.arc(x, y, r + 4, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
  ctx.globalAlpha = 1;

  ctx.beginPath();
  ctx.fillStyle = hex;
  ctx.strokeStyle = labelColor;
  ctx.lineWidth = 2;
  ctx.arc(cx, cy, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

// -------------------------
// Render: WCAG contrast table
// -------------------------
function renderWcag() {
  const palette = App.state.get().palette;
  const hexes = palette.map(item => item.hex);

  if (hexes.length < 2) {
    wcagHealthBadge.hidden = true;
    wcagBody.innerHTML = `<p class="plt-empty-hint">${hexes.length < 1 ? "Add colors" : "Add at least two colors"} to see contrast ratios.</p>`;
    return;
  }

  let passAA = 0, totalPairs = 0;
  for (let ri = 0; ri < hexes.length; ri++) {
    for (let ci = ri + 1; ci < hexes.length; ci++) {
      totalPairs++;
      if (App.wcag.level(App.wcag.contrast(hexes[ri], hexes[ci])) !== "fail") passAA++;
    }
  }
  wcagHealthBadge.textContent = `${passAA}/${totalPairs} AA`;
  wcagHealthBadge.hidden = false;
  wcagHealthBadge.className = "plt-badge " +
    (passAA === totalPairs ? "plt-badge--good" : passAA > 0 ? "plt-badge--warn" : "plt-badge--bad");

  const table = document.createElement("table");
  table.className = "plt-wcag-table";

  const thead = table.createTHead();
  const hr = thead.insertRow();
  const cornerTh = document.createElement("th");
  cornerTh.className = "plt-wcag-corner";
  hr.appendChild(cornerTh);
  hexes.forEach(hex => {
    const th = document.createElement("th");
    th.className = "plt-wcag-swatch-cell";
    th.style.background = hex;
    th.title = hex;
    hr.appendChild(th);
  });

  const tbody = table.createTBody();
  hexes.forEach((rowHex, ri) => {
    const tr = tbody.insertRow();
    const rowTh = document.createElement("th");
    rowTh.className = "plt-wcag-swatch-cell";
    rowTh.style.background = rowHex;
    rowTh.title = rowHex;
    tr.appendChild(rowTh);

    hexes.forEach((colHex, ci) => {
      const td = tr.insertCell();
      if (ri === ci) { td.className = "plt-wcag-self"; return; }
      const ratio = App.wcag.contrast(rowHex, colHex);
      const lv = App.wcag.level(ratio);
      td.className = "plt-wcag-cell plt-wcag-" + (lv === "fail" ? "fail" : "pass");
      td.innerHTML = `<span class="plt-wcag-ratio">${ratio.toFixed(1)}</span><span class="plt-wcag-level">${lv}</span>`;
    });
  });

  wcagBody.innerHTML = "";
  wcagBody.appendChild(table);
}

// -------------------------
// Render: export preview
// -------------------------
function renderExportPreview() {
  const { palette, exportFormat, exportPrefix } = App.state.get();
  const withText = exportTextColor.checked;
  const withName = exportColorNames.checked;
  const customTemplate = exportFormat === "custom" ? customTemplateInput.value : "";
  exportPreview.textContent = App.export.getPreview(palette, exportFormat, exportPrefix, withText, withName, customTemplate);
}

function updateExportFormatUi(format) {
  exportColorNameRow.hidden = !COLOR_NAMES_FORMATS.has(format);
  exportTextColorRow.hidden = !TEXT_PAIRING_FORMATS.has(format);
  customTemplateRow.hidden = format !== "custom";
}

// -------------------------
// Render: saved palettes
// -------------------------
function renderSaved() {
  const { savedPalettes } = App.state.get();

  if (savedPalettes.length) {
    savedCount.textContent = savedPalettes.length;
    savedCount.hidden = false;
  } else {
    savedCount.hidden = true;
  }

  const query = savedSearchInput.value.trim().toLowerCase();
  const filtered = query
    ? savedPalettes.filter(e => e.name.toLowerCase().includes(query))
    : savedPalettes;

  if (!filtered.length) {
    savedList.innerHTML = query
      ? '<p class="plt-empty-hint">No palettes match your search.</p>'
      : '<p class="plt-empty-hint">No saved palettes yet.</p>';
    return;
  }

  savedList.innerHTML = "";
  filtered.slice().reverse().forEach(entry => {
    const item = document.createElement("div");
    item.className = "plt-saved-item";

    const swatches = document.createElement("div");
    swatches.className = "plt-saved-swatches";
    entry.colors.forEach(hex => {
      const sw = document.createElement("div");
      sw.className = "plt-saved-swatch";
      sw.style.background = hex;
      sw.title = hex;
      swatches.appendChild(sw);
    });

    const meta = document.createElement("div");
    meta.className = "plt-saved-meta";
    meta.innerHTML = `<span class="plt-saved-name">${escHtml(entry.name)}</span>` +
      `<span class="plt-saved-date">${new Date(entry.savedAt).toLocaleDateString()}</span>`;

    const actions = document.createElement("div");
    actions.className = "plt-saved-actions";

    const loadBtn = document.createElement("button");
    loadBtn.type = "button";
    loadBtn.className = "btn secondary small";
    loadBtn.textContent = "Load";
    loadBtn.addEventListener("click", () => {
      setPalette(entry.colors.map(hex => App.state.itemFromHex(hex)));
      selectedTileIdx = null;
      renderAll();
      toast(`Loaded "${entry.name}"`, "success");
    });

    const exportBtn = document.createElement("button");
    exportBtn.type = "button";
    exportBtn.className = "btn secondary small";
    exportBtn.textContent = "Export";
    exportBtn.title = `Download "${entry.name}" in current format`;
    exportBtn.addEventListener("click", () => {
      const items = entry.colors.map(hex => ({ hex, name: "" }));
      const { exportFormat: fmt, exportPrefix: pfx } = App.state.get();
      const withText = exportTextColor.checked;
      const withName = exportColorNames.checked;
      const customTemplate = fmt === "custom" ? customTemplateInput.value : "";
      const text = App.export.getPreview(items, fmt, pfx, withText, withName, customTemplate);
      const extMap = { css: "css", scss: "scss", tailwind: "js", json: "json", hex: "txt", android: "xml", swift: "swift", tokens: "json", custom: "txt" };
      triggerDownload(new Blob([text], { type: "text/plain" }), (pfx || "palette") + "." + (extMap[fmt] || "txt"));
      toast(`Downloaded "${entry.name}"`, "success");
    });

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn secondary small danger";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      App.state.set({ savedPalettes: App.state.get().savedPalettes.filter(s => s.id !== entry.id) });
      renderSaved();
    });

    actions.appendChild(loadBtn);
    actions.appendChild(exportBtn);
    actions.appendChild(delBtn);
    item.appendChild(swatches);
    item.appendChild(meta);
    item.appendChild(actions);
    savedList.appendChild(item);
  });
}

// -------------------------
// Restore persisted form state
// -------------------------
function restoreFormState() {
  const { seedColor, harmonyType, extractCount, exportFormat, exportPrefix, exportCustomTemplate } = App.state.get();
  seedColorInput.value = seedColor;
  exportPrefixInput.value = exportPrefix || "color";
  extractCountInput.value = extractCount;

  const hRadio = document.querySelector(`input[name="harmonyType"][value="${harmonyType}"]`);
  if (hRadio) hRadio.checked = true;
  harmonyDesc.textContent = HARMONY_DESCS[harmonyType] || "";

  const eRadio = document.querySelector(`input[name="exportFormat"][value="${exportFormat}"]`);
  if (eRadio) eRadio.checked = true;

  customTemplateInput.value = exportCustomTemplate || "--{{name}}: {{hex}};";
  updateExportFormatUi(exportFormat);
}

// -------------------------
// Events: color input row
// -------------------------
addColorBtn.addEventListener("click", () => commitColorInput());

colorAddInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter")      { e.preventDefault(); commitColorInput(); }
  if (e.key === "Escape")     { colorAddInput.value = ""; hideSuggestions(); }
  if (e.key === "ArrowDown")  { e.preventDefault(); moveSuggestion(1); }
  if (e.key === "ArrowUp")    { e.preventDefault(); moveSuggestion(-1); }
});

colorAddInput.addEventListener("input", () => {
  updateSuggestions(colorAddInput.value);
  updateInputSwatch(colorAddInput.value);
});
colorAddInput.addEventListener("focus", () => { if (colorAddInput.value) updateSuggestions(colorAddInput.value); });
colorAddInput.addEventListener("blur", () => {
  setTimeout(hideSuggestions, 150);
  updateInputSwatch(colorAddInput.value);
});

eyedropperBtn.addEventListener("click", async () => {
  try {
    const dropper = new EyeDropper();
    const { sRGBHex } = await dropper.open();
    const hex = App.palette.parseColor(sRGBHex) || sRGBHex;
    addColorToPalette(hex);
  } catch { /* user cancelled */ }
});

function updateInputSwatch(query) {
  const q = query.trim();
  if (!q) { colorInputSwatch.hidden = true; colorAddInput.classList.remove("has-swatch"); return; }
  const hex = App.palette.parseColor(q);
  if (hex) {
    colorInputSwatch.style.background = hex;
    colorInputSwatch.hidden = false;
    colorAddInput.classList.add("has-swatch");
  } else {
    colorInputSwatch.hidden = true;
    colorAddInput.classList.remove("has-swatch");
  }
}

function commitColorInput() {
  const raw = colorAddInput.value.trim();
  hideSuggestions();
  if (!raw) return;

  const tryAdd = () => {
    const hex = App.palette.parseColor(raw);
    if (!hex) { toast(`Unknown color: "${raw}"`, "error"); return; }
    addColorToPalette(hex);
    colorAddInput.value = "";
  };

  const looksLikeName = !/^#?[0-9a-f]/i.test(raw) && !/^rgb/i.test(raw) && !/^hsl/i.test(raw);
  if (looksLikeName && !App.names.isLoaded()) {
    App.names.load().then(tryAdd);
  } else {
    tryAdd();
  }
}

// -------------------------
// Suggestion dropdown
// -------------------------
let activeSuggestionIdx = -1;

function updateSuggestions(query) {
  const q = query.trim();
  // Suppress suggestions for hex values and CSS functions — but NOT for color names
  // that happen to start with hex digits (a–f), e.g. "blue", "coral", "fern"
  const looksLikeHex = q.startsWith("#") || /^[0-9a-f]{3}$/i.test(q) || /^[0-9a-f]{6}$/i.test(q);
  if (!q || looksLikeHex || /^rgb/i.test(q) || /^hsl/i.test(q)) {
    hideSuggestions();
    return;
  }
  if (!App.names.isLoaded()) {
    App.names.load().then(() => { if (colorAddInput.value.trim() === q) updateSuggestions(q); });
    return;
  }
  const results = App.names.suggest(q, 50);
  if (!results.length) { hideSuggestions(); return; }

  colorSuggestions.innerHTML = "";
  activeSuggestionIdx = -1;

  results.forEach(entry => {
    const row = document.createElement("div");
    row.className = "plt-suggestion-item";
    row.dataset.hex = entry.hex;

    const sw = document.createElement("span");
    sw.className = "plt-suggestion-swatch";
    sw.style.background = entry.hex;

    const name = document.createElement("span");
    name.textContent = entry.name;

    const hexSpan = document.createElement("span");
    hexSpan.className = "plt-suggestion-hex";
    hexSpan.textContent = entry.hex;

    row.appendChild(sw);
    row.appendChild(name);
    row.appendChild(hexSpan);

    row.addEventListener("mousedown", (e) => {
      e.preventDefault();
      colorAddInput.value = entry.hex;
      hideSuggestions();
      commitColorInput();
    });

    colorSuggestions.appendChild(row);
  });

  colorSuggestions.hidden = false;
}

function hideSuggestions() {
  colorSuggestions.hidden = true;
  activeSuggestionIdx = -1;
}

function moveSuggestion(delta) {
  if (colorSuggestions.hidden) return;
  const items = colorSuggestions.querySelectorAll(".plt-suggestion-item");
  if (!items.length) return;
  items[activeSuggestionIdx]?.classList.remove("active");
  activeSuggestionIdx = Math.max(-1, Math.min(items.length - 1, activeSuggestionIdx + delta));
  items[activeSuggestionIdx]?.classList.add("active");
  if (activeSuggestionIdx >= 0) colorAddInput.value = items[activeSuggestionIdx].dataset.hex;
}

// -------------------------
// Events: palette controls
// -------------------------
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);

clearPaletteBtn.addEventListener("click", () => {
  if (!confirm("Clear the current palette?")) return;
  setPalette([]);
  selectedTileIdx = null;
  renderAll();
});

// -------------------------
// Events: harmony generator
// -------------------------
seedColorInput.addEventListener("input", () => {
  App.state.set({ seedColor: seedColorInput.value });
  renderHarmonyPreview();
});

document.querySelectorAll("input[name='harmonyType']").forEach(radio => {
  radio.addEventListener("change", () => {
    App.state.set({ harmonyType: radio.value });
    harmonyDesc.textContent = HARMONY_DESCS[radio.value] || "";
    renderHarmonyPreview();
  });
});

harmonyApplyBtn.addEventListener("click", () => {
  const { seedColor, harmonyType } = App.state.get();
  const colors = App.harmony.generate(seedColor, harmonyType);
  setPalette(applyColorsPreservingLocks(colors));
  selectedTileIdx = null;
  renderAll();
});

harmonyAddBtn.addEventListener("click", () => {
  const { seedColor, harmonyType, palette } = App.state.get();
  const newItems = App.harmony.generate(seedColor, harmonyType).map(hex => App.state.itemFromHex(hex));
  setPalette([...palette, ...newItems]);
  renderAll();
});

// -------------------------
// Events: image extraction
// -------------------------
imageChooseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  imageFileInput.click();
});

imageDropZone.addEventListener("click", () => imageFileInput.click());

imageDropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  imageDropZone.classList.add("dragover");
});
imageDropZone.addEventListener("dragleave", () => imageDropZone.classList.remove("dragover"));
imageDropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  imageDropZone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) loadImageFile(file);
});

imageFileInput.addEventListener("change", () => {
  if (imageFileInput.files[0]) loadImageFile(imageFileInput.files[0]);
  imageFileInput.value = "";
});

extractCountInput.addEventListener("change", () => {
  const v = Math.max(2, Math.min(16, parseInt(extractCountInput.value) || 6));
  extractCountInput.value = v;
  App.state.set({ extractCount: v });
  if (currentImageFile) runExtraction();
});

imageRemoveBtn.addEventListener("click", () => {
  currentImageFile = null;
  extractedColors = [];
  imagePreviewEl.src = "";
  imageWorkArea.hidden = true;
  imageDropZone.hidden = false;
  extractPreviewTrack.innerHTML = "";
});

function loadImageFile(file) {
  currentImageFile = file;
  const url = URL.createObjectURL(file);
  imagePreviewEl.onload = () => { URL.revokeObjectURL(url); runExtraction(); };
  imagePreviewEl.onerror = () => { URL.revokeObjectURL(url); toast("Could not load image.", "error"); };
  imagePreviewEl.src = url;
  imageDropZone.hidden = true;
  imageWorkArea.hidden = false;
  extractPreviewTrack.innerHTML = '<span class="plt-empty-hint">Loading…</span>';
}

function runExtraction() {
  if (!currentImageFile) return;
  const count = Math.max(2, Math.min(16, parseInt(extractCountInput.value) || 6));
  extractPreviewTrack.innerHTML = '<span class="plt-empty-hint">Extracting colors…</span>';
  App.image.extract(currentImageFile, count)
    .then(colors => {
      extractedColors = colors;
      extractPreviewTrack.innerHTML = "";
      colors.forEach(hex => extractPreviewTrack.appendChild(makeSmallTile(hex)));
    })
    .catch(() => {
      extractPreviewTrack.innerHTML = '<span class="plt-empty-hint">Could not extract colors.</span>';
    });
}

extractApplyBtn.addEventListener("click", () => {
  if (!extractedColors.length) return;
  setPalette(applyColorsPreservingLocks(extractedColors));
  selectedTileIdx = null;
  renderAll();
});

extractAddBtn.addEventListener("click", () => {
  if (!extractedColors.length) return;
  const newItems = extractedColors.map(hex => App.state.itemFromHex(hex));
  setPalette([...App.state.get().palette, ...newItems]);
  renderAll();
});

// -------------------------
// Events: export
// -------------------------
document.querySelectorAll("input[name='exportFormat']").forEach(radio => {
  radio.addEventListener("change", () => {
    App.state.set({ exportFormat: radio.value });
    updateExportFormatUi(radio.value);
    renderExportPreview();
  });
});

exportColorNames.addEventListener("change", () => renderExportPreview());
exportTextColor.addEventListener("change", () => renderExportPreview());

customTemplateInput.addEventListener("input", () => {
  App.state.set({ exportCustomTemplate: customTemplateInput.value });
  renderExportPreview();
});

exportPrefixInput.addEventListener("input", () => {
  App.state.set({ exportPrefix: exportPrefixInput.value });
  renderExportPreview();
});

exportCopyBtn.addEventListener("click", () => {
  const text = exportPreview.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text)
    .then(() => toast("Copied!", "success"))
    .catch(() => toast("Copy failed.", "error"));
});

exportDownloadBtn.addEventListener("click", () => {
  const { exportFormat, exportPrefix } = App.state.get();
  const text = exportPreview.textContent;
  if (!text) return;
  const extMap = { css: "css", scss: "scss", tailwind: "js", json: "json", hex: "txt", android: "xml", swift: "swift", tokens: "json", custom: "txt" };
  const ext = extMap[exportFormat] || "txt";
  triggerDownload(new Blob([text], { type: "text/plain" }), (exportPrefix || "palette") + "." + ext);
});

exportPngBtn.addEventListener("click", () => {
  const { palette, exportPrefix } = App.state.get();
  if (!palette.length) return;
  const dataUrl = App.export.toPngDataUrl(palette);
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = (exportPrefix || "palette") + "-swatch.png";
  a.click();
});

// -------------------------
// Events: saved palettes
// -------------------------
savePaletteBtn.addEventListener("click", () => {
  const name = paletteNameInput.value.trim();
  const { palette } = App.state.get();
  if (!name) { toast("Enter a name first.", "error"); return; }
  if (!palette.length) { toast("Palette is empty.", "error"); return; }
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name,
    colors: palette.map(item => item.hex),
    savedAt: Date.now(),
  };
  App.state.set({ savedPalettes: [...App.state.get().savedPalettes, entry] });
  paletteNameInput.value = "";
  renderSaved();
  toast(`Saved "${name}"`, "success");
});

// -------------------------
// Settings popover
// -------------------------
(function wireSettingsPopover() {
  settingsMenu.classList.remove("is-open");
  settingsMenu.hidden = true;
  settingsBtn.setAttribute("aria-expanded", "false");

  const isOpen = () => settingsMenu.classList.contains("is-open");

  function closeMenu() {
    settingsMenu.classList.remove("is-open");
    settingsMenu.hidden = true;
    settingsBtn.setAttribute("aria-expanded", "false");
  }
  function openMenu() {
    settingsMenu.hidden = false;
    settingsMenu.classList.add("is-open");
    settingsBtn.setAttribute("aria-expanded", "true");
  }

  settingsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOpen()) closeMenu(); else openMenu();
  });

  document.addEventListener("pointerdown", (e) => {
    if (!isOpen()) return;
    if (settingsMenu.contains(e.target) || settingsBtn.contains(e.target)) return;
    closeMenu();
  }, true);

  document.addEventListener("keydown", (e) => {
    const isMod = e.ctrlKey || e.metaKey;
    if (e.key === "Escape") {
      if (selectedTileIdx !== null) {
        selectedTileIdx = null;
        updateTileSelection();
        tintShadeSection.hidden = true;
      }
      closeMenu();
    }
    if (isMod && e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
    if (isMod && (e.key === "y" || (e.key === "z" && e.shiftKey))) { e.preventDefault(); redo(); }

    const inInput = e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable;
    if (inInput || e.ctrlKey || e.metaKey || e.altKey) return;
    const pal = App.state.get().palette;
    if (e.key === "ArrowLeft" && selectedTileIdx !== null) {
      e.preventDefault();
      selectTile(Math.max(0, selectedTileIdx - 1));
    } else if (e.key === "ArrowRight" && selectedTileIdx !== null) {
      e.preventDefault();
      selectTile(Math.min(pal.length - 1, selectedTileIdx + 1));
    } else if ((e.key === "Delete" || e.key === "Backspace") && selectedTileIdx !== null) {
      e.preventDefault();
      const p = pal.slice();
      p.splice(selectedTileIdx, 1);
      setPalette(p);
      selectedTileIdx = p.length ? Math.min(selectedTileIdx, p.length - 1) : null;
      renderAll();
    } else if (e.key === "l" && selectedTileIdx !== null) {
      const p = App.state.get().palette.slice();
      setPalette(p.map((it, i) => i === selectedTileIdx ? { ...it, locked: !it.locked } : it));
      renderPalette();
      renderTintShade();
    }
  });

  settingsMenu.addEventListener("click", (e) => {
    const id = e.target.closest("button")?.id;
    if (id === "factoryResetBtn" || id === "batchImportBtn") closeMenu();
  });

  new MutationObserver(() => {
    if (settingsMenu.hidden) settingsMenu.classList.remove("is-open");
  }).observe(settingsMenu, { attributes: true, attributeFilter: ["hidden"] });
})();

// -------------------------
// Factory reset
// -------------------------
factoryResetBtn.addEventListener("click", () => {
  if (!confirm("Factory reset will clear the current palette, all saved palettes, and restore every setting to its default. Continue?")) return;

  // Clear all persisted state
  App.state.reset();

  // Clear runtime state
  undoStack.length = 0;
  redoStack.length = 0;
  scaleColors = [];
  randomColors = [];
  mixedColor = "#888888";
  selectedTileIdx = null;
  currentImageFile = null;
  extractedColors = [];

  // Reset sliders
  adjHueShift.value = 0; adjSat.value = 0; adjLum.value = 0;
  adjHueVal.textContent = "0°"; adjSatVal.textContent = "0%"; adjLumVal.textContent = "0%";

  // Close all sections
  generateDetails.open = false;
  adjDetails.open = false;
  accessibilityDetails.open = false;
  outputDetails.open = false;

  // Reset active tabs back to defaults
  activateTab(generateDetails, "harmony");
  activateTab(accessibilityDetails, "wcag");

  // Reset new UI elements
  savedSearchInput.value = "";

  updateUndoRedoBtns();
  restoreFormState();
  renderAll();
  toast("App reset to defaults", "success");
});

// -------------------------
// Utilities
// -------------------------
function toast(msg, type = "info") {
  const el = document.createElement("div");
  el.className = `toast toast--${type}`;
  el.textContent = msg;
  toastContainer.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    el.addEventListener("transitionend", () => el.remove(), { once: true });
    setTimeout(() => el.remove(), 500); // fallback if transitionend never fires
  }, 4500);
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function escHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function commitDrop() {
  if (dragSrcIdx === null || lastInsertPos === -1) return;
  dropCommitted = true; // tell dragend not to cancel FLIP animations
  const p = App.state.get().palette.slice();
  const [moved] = p.splice(dragSrcIdx, 1);
  const target = lastInsertPos > dragSrcIdx ? lastInsertPos - 1 : lastInsertPos;
  p.splice(target, 0, moved);
  setPalette(p);
  selectedTileIdx = target;
  renderAll();
}

function newIndexForTile(i, from, insertPos) {
  if (insertPos <= from) {
    if (i >= insertPos && i < from) return i + 1;
  } else {
    if (i > from && i < insertPos) return i - 1;
  }
  return i;
}

function applyDragTransforms(insertPos) {
  if (insertPos === lastInsertPos) return;
  lastInsertPos = insertPos;
  paletteTrack.querySelectorAll(".plt-tile[data-item-id]").forEach((tileEl, i) => {
    if (i === dragSrcIdx) return;
    const newI = newIndexForTile(i, dragSrcIdx, insertPos);
    if (newI === i) {
      tileEl.style.transform = "";
    } else {
      const dx = tileRects[newI].left - tileRects[i].left;
      const dy = tileRects[newI].top - tileRects[i].top;
      tileEl.style.transform = `translate(${dx}px,${dy}px)`;
    }
  });
}

function clearDragTransforms() {
  lastInsertPos = -1;
  paletteTrack.querySelectorAll(".plt-tile[data-item-id]").forEach(tileEl => {
    tileEl.style.transform = "";
  });
}

// Clear transforms when cursor leaves the palette track entirely
paletteTrack.addEventListener("dragleave", (e) => {
  if (dragSrcIdx !== null && !paletteTrack.contains(e.relatedTarget)) {
    clearDragTransforms();
  }
});
// Allow drops anywhere on the track (including visual gaps between shifted tiles)
paletteTrack.addEventListener("dragover", (e) => {
  if (dragSrcIdx !== null) e.preventDefault();
});
paletteTrack.addEventListener("drop", (e) => {
  e.preventDefault();
  commitDrop();
});

// -------------------------
// URL sharing
// -------------------------
function parseHashPalette() {
  const hash = location.hash.slice(1);
  if (!hash) return;
  const hexes = hash.split(",")
    .map(h => App.palette.parseColor(h.trim()))
    .filter(Boolean);
  if (hexes.length) {
    App.state.set({ palette: hexes.map(hex => App.state.itemFromHex(hex)) });
  }
}

exportShareBtn.addEventListener("click", () => {
  const hexes = App.state.get().palette.map(item => item.hex.replace("#", ""));
  if (!hexes.length) { toast("Palette is empty.", "error"); return; }
  const url = location.origin + location.pathname + "#" + hexes.join(",");
  navigator.clipboard.writeText(url)
    .then(() => toast("Link copied!", "success"))
    .catch(() => toast("Could not copy link.", "error"));
});

// -------------------------
// Sort palette
// -------------------------
function sortPalette(by) {
  const palette = App.state.get().palette.slice();
  if (by === "reverse") {
    palette.reverse();
  } else {
    palette.sort((a, b) => {
      const ha = App.palette.hexToHsl(a.hex);
      const hb = App.palette.hexToHsl(b.hex);
      if (by === "hue")        return ha.h - hb.h;
      if (by === "lightness")  return ha.l - hb.l;
      if (by === "saturation") return hb.s - ha.s;
      return 0;
    });
  }
  setPalette(palette);
  selectedTileIdx = null;
  renderAll();
}

sortSelect.addEventListener("change", () => {
  if (sortSelect.value) {
    sortPalette(sortSelect.value);
    sortSelect.value = "";
  }
});

// -------------------------
// Randomize unlocked colors
// -------------------------
function randomizeUnlocked() {
  const p = App.state.get().palette;
  if (!p.some(item => !item.locked)) {
    toast("All colors are locked.", "info");
    return;
  }
  setPalette(p.map(item => {
    if (item.locked) return item;
    const h = Math.random() * 360;
    const s = 0.45 + Math.random() * 0.45;
    const l = 0.30 + Math.random() * 0.35;
    return { ...item, hex: App.palette.hslToHex({ h, s, l }) };
  }));
  selectedTileIdx = null;
  renderAll();
  toast("Randomized unlocked colors", "success");
}

// -------------------------
// Palette Adjustments
// -------------------------
function getAdjustedPalette() {
  const hShift = parseInt(adjHueShift.value);
  const sDelta = parseInt(adjSat.value) / 100;
  const lDelta = parseInt(adjLum.value) / 100;
  return App.state.get().palette.map(item => {
    const { h, s, l } = App.palette.hexToHsl(item.hex);
    const newH = ((h + hShift) % 360 + 360) % 360;
    const newS = Math.max(0, Math.min(1, s + sDelta));
    const newL = Math.max(0, Math.min(1, l + lDelta));
    return App.palette.hslToHex({ h: newH, s: newS, l: newL });
  });
}

function renderAdjPreview() {
  const palette = App.state.get().palette;
  adjPreviewTrack.innerHTML = "";
  if (!palette.length) {
    adjPreviewTrack.innerHTML = '<span class="plt-empty-hint">Add colors to the palette first.</span>';
    return;
  }
  getAdjustedPalette().forEach(hex => adjPreviewTrack.appendChild(makeSmallTile(hex)));
}

function resetAdj() {
  adjHueShift.value = 0;
  adjSat.value = 0;
  adjLum.value = 0;
  adjHueVal.textContent = "0°";
  adjSatVal.textContent = "0%";
  adjLumVal.textContent = "0%";
  renderAdjPreview();
}

[adjHueShift, adjSat, adjLum].forEach(slider => {
  slider.addEventListener("input", () => {
    const snapZone = slider === adjHueShift ? 6 : 4;
    if (Math.abs(parseInt(slider.value)) <= snapZone) slider.value = 0;
    adjHueVal.textContent = adjHueShift.value + "°";
    adjSatVal.textContent = adjSat.value + "%";
    adjLumVal.textContent = adjLum.value + "%";
    renderAdjPreview();
  });
});

adjApplyBtn.addEventListener("click", () => {
  const hexes = getAdjustedPalette();
  if (!hexes.length) return;
  const palette = App.state.get().palette;
  setPalette(palette.map((item, i) => ({ ...item, hex: hexes[i] })));
  resetAdj();
  selectedTileIdx = null;
  renderAll();
  toast("Adjustments applied", "success");
});

adjResetBtn.addEventListener("click", resetAdj);
adjRandomizeBtn.addEventListener("click", () => { randomizeUnlocked(); resetAdj(); });

adjDetails.addEventListener("toggle", () => {
  if (adjDetails.open) renderAdjPreview();
});

// -------------------------
// Batch Import
// -------------------------
batchImportBtn.addEventListener("click", () => {
  batchInput.value = "";
  batchDialog.showModal();
});

batchCancelBtn.addEventListener("click", () => batchDialog.close());

batchDialog.addEventListener("click", (e) => {
  if (e.target === batchDialog) batchDialog.close();
});

function parseBatchInput() {
  return batchInput.value
    .split(/[\s,\n]+/)
    .map(t => App.palette.parseColor(t.trim()))
    .filter(Boolean);
}

batchAddBtn.addEventListener("click", () => {
  const hexes = parseBatchInput();
  if (!hexes.length) { toast("No valid colors found.", "error"); return; }
  const newItems = hexes.map(hex => App.state.itemFromHex(hex));
  setPalette([...App.state.get().palette, ...newItems]);
  batchDialog.close();
  selectedTileIdx = null;
  renderAll();
  toast(`Added ${hexes.length} color${hexes.length !== 1 ? "s" : ""}`, "success");
});

batchReplaceBtn.addEventListener("click", () => {
  const hexes = parseBatchInput();
  if (!hexes.length) { toast("No valid colors found.", "error"); return; }
  setPalette(hexes.map(hex => App.state.itemFromHex(hex)));
  batchDialog.close();
  selectedTileIdx = null;
  renderAll();
  toast(`Imported ${hexes.length} color${hexes.length !== 1 ? "s" : ""}`, "success");
});

// -------------------------
// Color Scale Generator
// -------------------------
function interpolateOklch(hex1, hex2, t) {
  const c1 = App.palette.hexToOklch(hex1);
  const c2 = App.palette.hexToOklch(hex2);
  let dh = c2.h - c1.h;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  return App.palette.oklchToHex({
    l: c1.l + (c2.l - c1.l) * t,
    c: c1.c + (c2.c - c1.c) * t,
    h: ((c1.h + dh * t) % 360 + 360) % 360,
  });
}

function renderScale() {
  const hex1 = scaleStartInput.value;
  const hex2 = scaleEndInput.value;
  const steps = Math.max(2, Math.min(16, parseInt(scaleStepsInput.value) || 7));
  scaleColors = [];
  for (let i = 0; i < steps; i++) {
    scaleColors.push(interpolateOklch(hex1, hex2, steps === 1 ? 0.5 : i / (steps - 1)));
  }
  scalePreviewTrack.innerHTML = "";
  scaleColors.forEach(hex => scalePreviewTrack.appendChild(makeSmallTile(hex)));
}

scaleStartInput.addEventListener("input", () => { if (generateDetails.open && !tabScale.hidden) renderScale(); });
scaleEndInput.addEventListener("input",   () => { if (generateDetails.open && !tabScale.hidden) renderScale(); });
scaleStepsInput.addEventListener("change", () => { if (generateDetails.open && !tabScale.hidden) renderScale(); });

scaleSwapBtn.addEventListener("click", () => {
  const tmp = scaleStartInput.value;
  scaleStartInput.value = scaleEndInput.value;
  scaleEndInput.value = tmp;
  if (generateDetails.open && !tabScale.hidden) renderScale();
});

generateDetails.addEventListener("toggle", () => {
  if (!generateDetails.open) return;
  if (!tabScale.hidden)  renderScale();
  if (!tabRandom.hidden) renderRandom();
  if (!tabMix.hidden)    renderMix();
});

scaleAddBtn.addEventListener("click", () => {
  if (!scaleColors.length) return;
  const newItems = scaleColors.map(hex => App.state.itemFromHex(hex));
  setPalette([...App.state.get().palette, ...newItems]);
  renderAll();
  toast(`Added ${scaleColors.length} scale colors`, "success");
});

scaleReplaceBtn.addEventListener("click", () => {
  if (!scaleColors.length) return;
  setPalette(scaleColors.map(hex => App.state.itemFromHex(hex)));
  selectedTileIdx = null;
  renderAll();
  toast(`Replaced palette with ${scaleColors.length} scale colors`, "success");
});

// -------------------------
// Events: random palette
// -------------------------
randomGenerateBtn.addEventListener("click", () => renderRandom());

document.querySelectorAll("input[name='randomMood']").forEach(radio => {
  radio.addEventListener("change", () => renderRandom());
});

randomCountInput.addEventListener("change", () => {
  const v = Math.max(2, Math.min(16, parseInt(randomCountInput.value) || 5));
  randomCountInput.value = v;
  renderRandom();
});

randomApplyBtn.addEventListener("click", () => {
  if (!randomColors.length) return;
  setPalette(applyColorsPreservingLocks(randomColors));
  selectedTileIdx = null;
  renderAll();
});

randomAddBtn.addEventListener("click", () => {
  if (!randomColors.length) return;
  const newItems = randomColors.map(hex => App.state.itemFromHex(hex));
  setPalette([...App.state.get().palette, ...newItems]);
  renderAll();
  toast(`Added ${randomColors.length} colors`, "success");
});

// -------------------------
// Events: mix
// -------------------------
mixColorA.addEventListener("input", () => { if (generateDetails.open && !tabMix.hidden) renderMix(); });
mixColorB.addEventListener("input", () => { if (generateDetails.open && !tabMix.hidden) renderMix(); });

mixRatioInput.addEventListener("input", () => {
  if (Math.abs(parseInt(mixRatioInput.value) - 50) <= 4) mixRatioInput.value = 50;
  mixRatioVal.textContent = mixRatioInput.value + "%";
  if (generateDetails.open && !tabMix.hidden) renderMix();
});

mixAddBtn.addEventListener("click", () => {
  addColorToPalette(mixedColor);
  toast(`Added ${mixedColor}`, "success");
});

// -------------------------
// Events: saved search
// -------------------------
savedSearchInput.addEventListener("input", () => renderSaved());

// -------------------------
// Color Blindness Simulation
// -------------------------
function renderColorblind() {
  const palette = App.state.get().palette;
  colorblindBody.innerHTML = "";

  if (!palette.length) {
    colorblindBody.innerHTML = '<p class="plt-empty-hint">Add colors to the palette to see simulations.</p>';
    return;
  }

  Object.entries(App.colorblind.TYPES).forEach(([typeKey, typeDef]) => {
    const row = document.createElement("div");
    row.className = "plt-cb-row";

    const label = document.createElement("div");
    label.className = "plt-cb-label";
    const typeSpan = document.createElement("span");
    typeSpan.className = "plt-cb-type";
    typeSpan.textContent = typeDef.label;
    const descSpan = document.createElement("span");
    descSpan.className = "plt-cb-desc";
    descSpan.textContent = typeDef.desc;
    label.appendChild(typeSpan);
    label.appendChild(descSpan);

    const track = document.createElement("div");
    track.className = "plt-cb-track";
    palette.forEach(item => {
      const simHex = App.colorblind.simulateHex(item.hex, typeKey);
      const swatch = document.createElement("div");
      swatch.className = "plt-cb-swatch";
      swatch.style.background = simHex;
      swatch.title = simHex;
      track.appendChild(swatch);
    });

    row.appendChild(label);
    row.appendChild(track);
    colorblindBody.appendChild(row);
  });
}

accessibilityDetails.addEventListener("toggle", () => {
  if (accessibilityDetails.open && !tabColorblind.hidden) renderColorblind();
});

proximityMetricSelect.addEventListener("change", () => {
  renderProximity();
});

// Redraw the proximity plot on theme change (manual toggle or system pref) —
// it draws directly from CSS variables so a stale canvas would keep the old palette.
new MutationObserver(() => {
  renderProximity();
}).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

// -------------------------
// Render: random palette
// -------------------------
function renderRandom() {
  const count = Math.max(2, Math.min(16, parseInt(randomCountInput.value) || 5));
  const mood = document.querySelector("input[name='randomMood']:checked")?.value || "any";
  const { sMin, sMax, lMin, lMax } = RANDOM_MOODS[mood] || RANDOM_MOODS.any;
  const baseStep = 360 / count;
  const startHue = Math.random() * 360;
  randomColors = Array.from({ length: count }, (_, i) => {
    const hue = (startHue + i * baseStep + (Math.random() - 0.5) * baseStep * 0.5 + 360) % 360;
    const s = sMin + Math.random() * (sMax - sMin);
    const l = lMin + Math.random() * (lMax - lMin);
    return App.palette.hslToHex({ h: hue, s, l });
  });
  randomPreviewTrack.innerHTML = "";
  randomColors.forEach(hex => randomPreviewTrack.appendChild(makeSmallTile(hex)));
}

// -------------------------
// Render: mix preview
// -------------------------
function renderMix() {
  const hexA = mixColorA.value;
  const hexB = mixColorB.value;
  const t = parseInt(mixRatioInput.value) / 100;
  mixedColor = interpolateOklch(hexA, hexB, t);
  mixPreviewTrack.innerHTML = "";
  [hexA, mixedColor, hexB].forEach(hex => mixPreviewTrack.appendChild(makeSmallTile(hex)));
}

// -------------------------
// Selected color panel actions
// -------------------------
selectedUseAsSeedBtn.addEventListener("click", () => {
  if (selectedTileIdx === null) return;
  const hex = App.state.get().palette[selectedTileIdx]?.hex;
  if (!hex) return;
  App.state.set({ seedColor: hex });
  seedColorInput.value = hex;
  renderHarmonyPreview();
  if (!generateDetails.open) generateDetails.open = true;
  activateTab(generateDetails, "harmony");
  generateDetails.scrollIntoView({ behavior: "smooth", block: "start" });
  toast(`Generating harmony from ${hex}`, "success");
});
