// Server statis tanpa dependensi untuk Hostinger Node.js Web App.
// Melayani folder dist/ hasil `npm run build`, dengan kompresi, cache, dan header keamanan.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, gzipSync, constants } from 'node:zlib';

const DIST = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');
const PORT = process.env.PORT || 3000;
const CANONICAL_HOST = process.env.CANONICAL_HOST || 'pti-co.tech';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
};
const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.json', '.svg', '.webmanifest', '.txt', '.xml']);
const SECURITY = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};
const cache = new Map();

async function load(file) {
  const hit = cache.get(file);
  const s = await stat(file);
  if (hit && hit.mtime === s.mtimeMs) return hit;
  const raw = await readFile(file);
  const ext = extname(file);
  const entry = { mtime: s.mtimeMs, raw, ext };
  if (COMPRESSIBLE.has(ext) && raw.length > 1024) {
    entry.br = brotliCompressSync(raw, { params: { [constants.BROTLI_PARAM_QUALITY]: 10 } });
    entry.gz = gzipSync(raw, { level: 9 });
  }
  cache.set(file, entry);
  return entry;
}

async function resolve(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, '');
  if (clean.includes('..')) return null;
  const candidates = [join(DIST, clean), join(DIST, clean, 'index.html'), join(DIST, `${clean}.html`)];
  for (const c of candidates) {
    try { if ((await stat(c)).isFile()) return c; } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  try {
    const host = (req.headers.host || '').split(':')[0];
    const proto = req.headers['x-forwarded-proto'];
    if (host === `www.${CANONICAL_HOST}` || proto === 'http') {
      res.writeHead(301, { Location: `https://${CANONICAL_HOST}${req.url}` });
      return res.end();
    }
    const url = new URL(req.url, 'http://x');
    let file = await resolve(url.pathname);
    let status = 200;
    if (!file) { file = join(DIST, '404.html'); status = 404; try { await stat(file); } catch { file = join(DIST, 'index.html'); } }
    const f = await load(file);
    const headers = { ...SECURITY, 'Content-Type': TYPES[f.ext] || 'application/octet-stream', Vary: 'Accept-Encoding' };
    headers['Cache-Control'] = url.pathname.startsWith('/_astro/') ? 'public, max-age=31536000, immutable'
      : f.ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=604800';
    const ae = req.headers['accept-encoding'] || '';
    let body = f.raw;
    if (f.br && ae.includes('br')) { body = f.br; headers['Content-Encoding'] = 'br'; }
    else if (f.gz && ae.includes('gzip')) { body = f.gz; headers['Content-Encoding'] = 'gzip'; }
    headers['Content-Length'] = body.length;
    res.writeHead(status, headers);
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error');
  }
}).listen(PORT, () => console.log(`PTI website berjalan di port ${PORT}`));
