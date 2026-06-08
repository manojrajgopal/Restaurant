// Warmup script: pre-compiles all routes sequentially in dev mode
const routes = ['/', '/about', '/menu', '/gallery', '/contact', '/reserve'];
const BASE = 'http://localhost:3000';

async function warmup() {
  // Wait for the dev server to be ready
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE);
      if (res.ok) {
        ready = true;
        break;
      }
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  if (!ready) {
    console.log('[warmup] Server not ready after 60s, skipping.');
    process.exit(0);
    return;
  }

  console.log('[warmup] Pre-compiling all routes sequentially...');
  for (const route of routes) {
    try {
      await fetch(`${BASE}${route}`);
      console.log(`  ✓ ${route}`);
    } catch {
      console.log(`  ✗ ${route}`);
    }
  }
  console.log('[warmup] All routes compiled.');
  process.exit(0);
}

warmup();
