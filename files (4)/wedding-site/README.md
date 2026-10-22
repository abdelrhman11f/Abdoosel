# Wedding Invitation – AbdElRahman & Selwan

Static site (no build step). Publish the **root of this folder**.

```
index.html
css/style.css
js/main.js
assets/img/…      photos
assets/icons/…    favicon + apple-touch-icon
assets/audio/song.mp3
netlify.toml · vercel.json · robots.txt
```

## Deploy
- **Netlify / Cloudflare Pages / Vercel**: drag-and-drop the folder (or the zip), or connect a repo. Build command: none. Publish directory: `.`
- **GitHub Pages**: push the contents to a repo, enable Pages on the main branch (root).
- **Any hosting (cPanel, etc.)**: upload everything into `public_html`.

Must be served over http(s) – the music does not work from a double-clicked local file.

`robots.txt` blocks search engines (private invitation). Delete it if you want the page indexed.
