const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skip = new Set(['node_modules', 'platforms', '.git']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return skip.has(entry.name) ? [] : walk(file);
    return [file];
  });
}

const files = walk(root).filter((file) => /\.(js|java)$/.test(file));
if (!files.length) {
  throw new Error('Performance gate aborted: no JS/Java source files discovered.');
}

const forbidden = [
  /document\.write\s*\(/,
  /while\s*\([^)]*\)\s*\{[^}]{0,200}fetch\s*\(/s,
];

const violations = [];
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  for (const pattern of forbidden) {
    if (pattern.test(source)) {
      violations.push(`${path.relative(root, file)}: ${pattern}`);
    }
  }
}

if (violations.length) {
  throw new Error(`Performance regressions found:\n${violations.join('\n')}`);
}

console.log(`Performance gates: PASS (${files.length} JS/Java files scanned)`);
