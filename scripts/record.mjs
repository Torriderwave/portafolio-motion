// Graba cada demo (public/demos/<slug>/index.html) con Playwright + ffmpeg → public/media/<slug>.mp4 y .jpg
// Uso: node scripts/record.mjs [slug ...]   (sin args: todas). Playwright vive fuera del proyecto (no está en package.json).
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, statSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire('/workspace/portafolio-motion-catalog/tools/package.json');
const { chromium } = require('playwright-core');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || `${process.env.HOME}/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome`;
// THUMBS_ONLY=1 reutiliza los fotogramas ya capturados en /tmp/rec y solo regenera el jpg
// cropX: recorte 4:3 del póster 16:9 desplazado (en px del fotograma grabado) en vez de centrado
// w,h: tamaño de grabación · thumbAt: segundo del fotograma representativo · bg: color de relleno del jpg (si no cubre 4:3) · crf
export const pieces = {
  'alyron-reveal':     { w: 1280, h: 720,  thumbAt: 5.2, crf: 24 },
  'mconnect-circulo':  { w: 1280, h: 720,  thumbAt: 7.4, crf: 28, posterQ: 'nocap' },
  'scroll-apertura':   { w: 1280, h: 720,  thumbAt: 5.2, crf: 24 },
  'cuerda-resorte':    { w: 1280, h: 720,  thumbAt: 3.9, crf: 24, cropX: 40 },
  'loader-morph':      { w: 1280, h: 720,  thumbAt: 3.45, crf: 24 },
  'spot-gustello-169': { w: 1280, h: 720,  thumbAt: 10.4, crf: 25 },
  'spot-mconnect-916': { w: 720,  h: 1280, thumbAt: 8.6, crf: 25, bg: '#19152f' },
  'spot-alyron-11':    { w: 720,  h: 720,  thumbAt: 7.4, crf: 25, bg: '#0a1424' },
  'logo-orbe-tinta':   { w: 1280, h: 720,  thumbAt: 5.6, crf: 30 },
  'gustello-pos-lanzamiento': { w: 1280, h: 720, thumbAt: 4.9, crf: 30, posterQ: 'nocap' },
  'havren-horario': { w: 1280, h: 720, thumbAt: 25.0, crf: 28 },
  'gustello-identidad': { w: 1280, h: 720, thumbAt: 10.9, crf: 26, poster43: true, bg: '#120d0a' },
  'marea-titulos': { w: 720, h: 1280, thumbAt: 3.6, crf: 26, bg: '#07203a' },
  'social-rumbo':      { w: 720,  h: 720,  thumbAt: 1.04, crf: 24, bg: '#0b0d0c' },
  'gustello-plato':    { w: 720,  h: 720,  thumbAt: 6.6, crf: 24, bg: '#0c0705' },
};
const FPS = 30;
const want = process.argv.slice(2);
const list = want.length ? want : Object.keys(pieces);
const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars', '--allow-file-access-from-files'] });
for (const slug of list) {
  const p = pieces[slug]; if (!p) throw new Error('slug desconocido ' + slug);
  const dir = `/tmp/rec/${slug}`; const only = !!process.env.THUMBS_ONLY; if (!only) { rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true }); }
  let D = 0, n = 0, errs = [];
  if (!only) {
  const ctx = await browser.newContext({ viewport: { width: p.w, height: p.h }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text())); page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(`file://${root}/public/demos/${slug}/index.html?cap`); await page.waitForFunction(() => window.__seek && window.__D);
  await page.evaluate(() => document.fonts && document.fonts.ready); await page.waitForTimeout(800); // imágenes de marca (webp) y fuentes
  D = await page.evaluate(() => window.__D); n = Math.round((D / 1000) * FPS);
  for (let i = 0; i <= n; i++) {
    await page.evaluate((t) => window.__seek(t), (i / FPS) * 1000);
    await page.screenshot({ path: `${dir}/f${String(i).padStart(4, '0')}.png`, type: 'png' });
  }
  await ctx.close();
  } else { n = readdirSync(dir).filter((x) => x.endsWith('.png')).length - 1; D = (n / FPS) * 1000; }
  const thumbF = Math.round(p.thumbAt * FPS);
  mkdirSync(`${root}/public/media`, { recursive: true });
  const mp4 = `${root}/public/media/${slug}.mp4`, jpg = `${root}/public/media/${slug}.jpg`;
  if (!only) execFileSync('ffmpeg', ['-y', '-v', 'error', '-framerate', String(FPS), '-i', `${dir}/f%04d.png`, '-c:v', 'libx264', '-preset', 'slower', '-crf', String(p.crf), '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', mp4]);
  // miniatura 800×600: 16:9 recorta al centro; 1:1 y 9:16 se componen como póster 4:3 (la pieza se vuelve a renderizar en un viewport 4:3, así el fondo/viñeta/grano se extienden de verdad, sin bandas)
  let q = 3;
  if (p.w <= p.h || p.poster43) {
    const c2 = await browser.newContext({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
    const pg = await c2.newPage(); await pg.goto(`file://${root}/public/demos/${slug}/index.html?cap`); await pg.waitForFunction(() => window.__seek && window.__D); await pg.waitForTimeout(800);
    await pg.evaluate((t) => window.__seek(t), p.thumbAt * 1000);
    await pg.screenshot({ path: `${dir}/poster.png`, type: 'png' }); await c2.close();
    for (;;) { execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', `${dir}/poster.png`, '-vf', 'scale=800:600', '-q:v', String(q), '-frames:v', '1', jpg]); if (statSync(jpg).size < 85000 || q >= 12) break; q += 2; }
  } else if (p.posterQ) {
    // póster 16:9 → 4:3 sin pies de foto: se re-renderiza con ?nocap y se recorta al centro (el dispositivo entra completo)
    const c2 = await browser.newContext({ viewport: { width: p.w, height: p.h }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
    const pg = await c2.newPage(); await pg.goto(`file://${root}/public/demos/${slug}/index.html?cap&${p.posterQ}`); await pg.waitForFunction(() => window.__seek && window.__D); await pg.waitForTimeout(1500);
    const stepsT = []; for (let tt = 0; tt < p.thumbAt; tt += 0.5) stepsT.push(tt); stepsT.push(p.thumbAt);
    for (const tt of stepsT) await pg.evaluate((t) => window.__seek(t), tt * 1000);
    await pg.waitForTimeout(300);
    await pg.screenshot({ path: `${dir}/poster.png`, type: 'png' }); await c2.close();
    for (;;) { execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', `${dir}/poster.png`, '-vf', 'crop=960:720:160:0,scale=800:600', '-q:v', String(q), '-frames:v', '1', jpg]); if (statSync(jpg).size < 85000 || q >= 12) break; q += 2; }
  } else {
    const src = `${dir}/f${String(Math.min(thumbF, n)).padStart(4, '0')}.png`;
    for (;;) { execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', src, '-vf', p.cropX != null ? `crop=960:720:${p.cropX}:0,scale=800:600` : 'scale=800:600:force_original_aspect_ratio=increase,crop=800:600', '-q:v', String(q), '-frames:v', '1', jpg]); if (statSync(jpg).size < 85000 || q >= 12) break; q += 2; }
  }
  console.log(slug, `${D}ms`, 'mp4', (statSync(mp4).size / 1024).toFixed(0) + 'KB', 'jpg', (statSync(jpg).size / 1024).toFixed(0) + 'KB', errs.length ? 'ERRORES: ' + errs.join(' | ') : 'sin errores');
}
await browser.close();
