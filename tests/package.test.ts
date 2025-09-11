import pkg from '../package.json';

test('includes platform-specific swc dependency to avoid 404 builds', () => {
  expect(
    pkg.devDependencies && pkg.devDependencies['@next/swc-linux-x64-gnu']
  ).toBeTruthy();
});
