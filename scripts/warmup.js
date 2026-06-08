// Warmup script: pre-compiles all routes sequentially in dev mode
const http = require('http');

const routes = ['/', '/about', '/menu', '/gallery', '/contact', '/reserve'];
const PORT = 3000;

function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.get({ hostname: 'localhost', port: PORT, path }, (res) => {
      res.resume(); // drain response
      res.on('end', () => resolve(res.statusCode));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function warmup() {
  // Wait for the dev server to be ready
  let ready = false;
  for (let i = 0; i < 90; i++) {
    try {
      await get('/');
      ready = true;
      break;
    } catch {
      await sleep(1000);
    }
  }

  if (!ready) {
    console.log('[warmup] Server not ready after 90s, skipping.');
    process.exit(0);
    return;
  }

  console.log('[warmup] Pre-compiling all routes...');
  for (const route of routes) {
    try {
      const status = await get(route);
      console.log(`  ✓ ${route} (${status})`);
    } catch (e) {
      console.log(`  ✗ ${route} (${e.message})`);
    }
    // Small delay between requests to let compiler finish
    await sleep(500);
  }
  console.log('[warmup] All routes compiled.');
  process.exit(0);
}

warmup();
