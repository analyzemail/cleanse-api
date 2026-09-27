// Bundles the split OpenAPI spec and assembles the static docs site in dist/.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const DIST = 'dist';

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

for (const ext of ['yaml', 'json']) {
  execFileSync('npx', ['redocly', 'bundle', 'main', '-o', `${DIST}/openapi.${ext}`], { stdio: 'inherit' });
}

cpSync('site', DIST, { recursive: true });
cpSync('assets', `${DIST}/assets`, { recursive: true });

console.log(`Built docs site in ${DIST}/`);
