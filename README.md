# Paletteer

A browser-based color palette builder. Generate, adjust, inspect, and export color palettes — no account, no server, no install.

**[Try it live →](https://masieono.github.io/paletteer/)**

---

## Features

### Palette
- Add colors by hex, `rgb()`, `hsl()`, or color name with autocomplete
- Eyedropper support (Chrome/Edge)
- Drag to reorder, lock individual colors, duplicate, batch import
- Undo / redo with full history

### Generate
- **Harmony** — complementary, analogous, triadic, tetradic, split-complementary, monochromatic
- **Scale** — perceptually uniform gradient between two colors (OKLCH interpolation)
- **Random** — mood presets: Any, Pastel, Vibrant, Earth, Muted, Neon
- **Mix** — blend two colors at any ratio using OKLCH
- **Extract from image** — k-means color extraction from a dropped or uploaded image

### Inspect
- Tints & shades panel for selected color (swap, add, copy)
- Color values: HEX, RGB, HSL, OKLCH
- Per-color WCAG contrast quick check (vs black and white text)

### Accessibility
- WCAG contrast table across all palette pairs (AA / AAA rating)
- Color blindness simulation (Deuteranopia, Protanopia, Tritanopia, Achromatopsia, and more)

### Adjustments
- Global hue shift, saturation, and lightness sliders with snap-to-zero
- Apply to palette or randomize unlocked colors

### Export
- **CSS Variables**, **SCSS**, **Tailwind config**, **JSON**, **Hex list**, **CSS Gradient**
- **Android XML**, **Swift UIColor**, **W3C Design Tokens**, **Custom template**
- Optional: include nearest color name, include text color pairing
- Download as file or copy to clipboard
- PNG swatch image export
- Shareable URL (palette encoded in hash)

### Save
- Name and save palettes to local storage
- Search saved palettes
- Export any saved palette in the current format without loading it

## Privacy

Everything runs in your browser. No data is sent anywhere. Color names are loaded from a bundled local JSON file.

## Running Locally

```bash
git clone https://github.com/masieono/paletteer.git
cd paletteer
python3 -m http.server 8080
# open http://localhost:8080
```

A local server is required because the color names database loads via `fetch()`, which doesn't work over `file://` URLs in most browsers.

## Browser Support

Any modern browser (Chrome, Edge, Firefox, Safari — 2020+). Eyedropper requires Chrome or Edge.
