// lib/image.js — dominant color extraction via k-means clustering
(function () {
  window.App = window.App || {};

  function rgbToHex([r, g, b]) {
    return "#" + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
  }

  function kmeans(pixels, k, maxIter = 20) {
    if (!pixels.length) return [];
    k = Math.min(k, pixels.length);

    // Seed centroids from evenly-spaced pixels
    const step = Math.floor(pixels.length / k);
    let centroids = Array.from({ length: k }, (_, i) => [...pixels[i * step]]);
    let assignments = new Array(pixels.length).fill(0);

    for (let iter = 0; iter < maxIter; iter++) {
      let moved = false;

      for (let i = 0; i < pixels.length; i++) {
        let best = 0, bestDist = Infinity;
        for (let j = 0; j < k; j++) {
          const dr = pixels[i][0] - centroids[j][0];
          const dg = pixels[i][1] - centroids[j][1];
          const db = pixels[i][2] - centroids[j][2];
          const d = dr * dr + dg * dg + db * db;
          if (d < bestDist) { bestDist = d; best = j; }
        }
        if (assignments[i] !== best) { assignments[i] = best; moved = true; }
      }

      if (!moved) break;

      const sums = Array.from({ length: k }, () => [0, 0, 0, 0]);
      for (let i = 0; i < pixels.length; i++) {
        const c = assignments[i];
        sums[c][0] += pixels[i][0];
        sums[c][1] += pixels[i][1];
        sums[c][2] += pixels[i][2];
        sums[c][3]++;
      }
      for (let j = 0; j < k; j++) {
        if (sums[j][3] === 0) continue;
        centroids[j] = [sums[j][0] / sums[j][3], sums[j][1] / sums[j][3], sums[j][2] / sums[j][3]];
      }
    }

    // Sort by cluster size (most dominant first)
    const counts = new Array(k).fill(0);
    assignments.forEach(c => counts[c]++);
    return centroids
      .map((c, i) => ({ c, n: counts[i] }))
      .sort((a, b) => b.n - a.n)
      .map(x => x.c);
  }

  function extract(file, count) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        try {
          const MAX = 200;
          const scale = Math.min(1, MAX / Math.max(img.width, img.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          const pixels = [];
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] < 128) continue;
            pixels.push([data[i], data[i + 1], data[i + 2]]);
          }

          resolve(kmeans(pixels, count).map(rgbToHex));
        } catch (e) {
          reject(e);
        }
      };

      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
      img.src = url;
    });
  }

  window.App.image = { extract };
})();
