// lib/export.js — palette export formats
// All functions accept items: [{hex, name}] — name may be empty string
(function () {
  window.App = window.App || {};

  function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function keyFor(item, i, prefix) {
    const slug = item.name ? slugify(item.name) : null;
    return slug ? `${prefix}-${slug}` : `${prefix}-${i + 1}`;
  }

  function textFor(hex) {
    return App.palette.needsWhiteText(hex) ? "#ffffff" : "#000000";
  }

  function nameFor(hex) {
    if (App.names && App.names.isLoaded()) return App.names.findNearest(hex) || "";
    return "";
  }

  function toCssVars(items, prefix = "color", withText = false, withName = false) {
    const lines = [];
    items.forEach((item, i) => {
      const key = keyFor(item, i, prefix);
      const cn = withName ? nameFor(item.hex) : "";
      const comment = cn ? ` /* ${cn} */` : "";
      lines.push(`  --${key}: ${item.hex};${comment}`);
      if (withText) lines.push(`  --${key}-text: ${textFor(item.hex)};`);
    });
    return `:root {\n${lines.join("\n")}\n}`;
  }

  function toScss(items, prefix = "color", withText = false, withName = false) {
    const lines = [];
    items.forEach((item, i) => {
      const key = keyFor(item, i, prefix);
      const cn = withName ? nameFor(item.hex) : "";
      const comment = cn ? ` // ${cn}` : "";
      lines.push(`$${key}: ${item.hex};${comment}`);
      if (withText) lines.push(`$${key}-text: ${textFor(item.hex)};`);
    });
    return lines.join("\n");
  }

  function toTailwind(items, prefix = "brand", withText = false, withName = false) {
    const entries = [];
    items.forEach((item, i) => {
      const key = item.name ? slugify(item.name) : String((i + 1) * 100);
      if (withName) {
        const cn = nameFor(item.hex);
        if (cn) entries.push(`      // ${cn}`);
      }
      entries.push(`      '${key}': '${item.hex}',`);
      if (withText) entries.push(`      '${key}-text': '${textFor(item.hex)}',`);
    });
    return (
      `// tailwind.config.js\n` +
      `module.exports = {\n` +
      `  theme: { extend: { colors: {\n` +
      `    ${prefix}: {\n${entries.join("\n")}\n    },\n` +
      `  } } },\n};\n`
    );
  }

  function toJson(items, withText = false, withName = false) {
    const hasNames = items.some(item => item.name);
    if (withText || withName || hasNames) {
      return JSON.stringify(items.map(item => {
        const obj = {};
        if (hasNames) obj.name = item.name || null;
        obj.hex = item.hex;
        if (withName) {
          const cn = nameFor(item.hex);
          if (cn) obj.colorName = cn;
        }
        if (withText) obj.text = textFor(item.hex);
        return obj;
      }), null, 2);
    }
    return JSON.stringify(items.map(item => item.hex), null, 2);
  }

  function toHexList(items, withName = false) {
    return items.map(item => {
      if (withName) {
        const cn = nameFor(item.hex);
        return cn ? `${item.hex}  ${cn}` : item.hex;
      }
      return item.hex;
    }).join("\n");
  }

  function toCssGradient(items, direction = "to right") {
    const stops = items.map(item => item.hex).join(", ");
    return `background: linear-gradient(${direction}, ${stops});`;
  }

  function toAndroidXml(items, prefix = "color", withName = false) {
    const lines = items.map((item, i) => {
      const name = item.name ? slugify(item.name).replace(/-/g, "_") : `${prefix}_${i + 1}`;
      if (withName) {
        const cn = nameFor(item.hex);
        const comment = cn ? `    <!-- ${cn} -->\n` : "";
        return `${comment}    <color name="${name}">${item.hex}</color>`;
      }
      return `    <color name="${name}">${item.hex}</color>`;
    });
    return `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n${lines.join("\n")}\n</resources>`;
  }

  function toSwift(items, prefix = "color", withName = false) {
    const lines = items.map((item, i) => {
      const slug = item.name ? slugify(item.name) : `${prefix}-${i + 1}`;
      const camel = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
      const { r, g, b } = App.palette.hexToRgb(item.hex);
      const rf = (r / 255).toFixed(4), gf = (g / 255).toFixed(4), bf = (b / 255).toFixed(4);
      const cn = withName ? nameFor(item.hex) : "";
      const comment = cn ? ` // ${cn}` : "";
      return `let ${camel} = UIColor(red: ${rf}, green: ${gf}, blue: ${bf}, alpha: 1.0)${comment}`;
    });
    return lines.join("\n");
  }

  function toDesignTokens(items, prefix = "color", withName = false) {
    const tokens = {};
    items.forEach((item, i) => {
      const key = item.name ? slugify(item.name) : `${prefix}-${i + 1}`;
      const token = { "$value": item.hex, "$type": "color" };
      if (withName) {
        const cn = nameFor(item.hex);
        if (cn) token.colorName = cn;
      }
      tokens[key] = token;
    });
    return JSON.stringify({ [prefix]: tokens }, null, 2);
  }

  function toCustom(items, template = "--{{name}}: {{hex}};", prefix = "color") {
    if (!template.trim()) return "";
    return items.map((item, i) => {
      const { r, g, b } = App.palette.hexToRgb(item.hex);
      const { h, s, l } = App.palette.hexToHsl(item.hex);
      const name = item.name ? slugify(item.name) : `${prefix}-${i + 1}`;
      return template
        .replace(/\{\{hex\}\}/g, item.hex)
        .replace(/\{\{HEX\}\}/g, item.hex.toUpperCase())
        .replace(/\{\{name\}\}/g, name)
        .replace(/\{\{r\}\}/g, r)
        .replace(/\{\{g\}\}/g, g)
        .replace(/\{\{b\}\}/g, b)
        .replace(/\{\{h\}\}/g, Math.round(h))
        .replace(/\{\{s\}\}/g, Math.round(s * 100))
        .replace(/\{\{l\}\}/g, Math.round(l * 100))
        .replace(/\{\{index\}\}/g, i + 1)
        .replace(/\{\{text\}\}/g, textFor(item.hex))
        .replace(/\{\{colorName\}\}/g, nameFor(item.hex));
    }).join("\n");
  }

  function toPngDataUrl(items, swatchSize = 80) {
    const canvas = document.createElement("canvas");
    canvas.width = swatchSize * items.length;
    canvas.height = swatchSize;
    const ctx = canvas.getContext("2d");
    items.forEach((item, i) => {
      ctx.fillStyle = item.hex;
      ctx.fillRect(i * swatchSize, 0, swatchSize, swatchSize);
    });
    return canvas.toDataURL("image/png");
  }

  function getPreview(items, format, prefix, withText = false, withName = false, customTemplate = "") {
    if (format === "css")      return toCssVars(items, prefix || "color", withText, withName);
    if (format === "scss")     return toScss(items, prefix || "color", withText, withName);
    if (format === "tailwind") return toTailwind(items, prefix || "brand", withText, withName);
    if (format === "hex")      return toHexList(items, withName);
    if (format === "gradient") return toCssGradient(items);
    if (format === "android")  return toAndroidXml(items, prefix || "color", withName);
    if (format === "swift")    return toSwift(items, prefix || "color", withName);
    if (format === "tokens")   return toDesignTokens(items, prefix || "color", withName);
    if (format === "custom")   return toCustom(items, customTemplate, prefix || "color");
    return toJson(items, withText, withName);
  }

  window.App.export = {
    toCssVars, toScss, toTailwind, toJson, toHexList, toPngDataUrl, toCssGradient,
    toAndroidXml, toSwift, toDesignTokens, toCustom, getPreview,
  };
})();
