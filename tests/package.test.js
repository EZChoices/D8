import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

test('includes platform-specific swc dependency to avoid 404 builds', () => {
  assert.ok(
    pkg.devDependencies && pkg.devDependencies['@next/swc-linux-x64-gnu'],
    'expected @next/swc-linux-x64-gnu in devDependencies'
  );
});
