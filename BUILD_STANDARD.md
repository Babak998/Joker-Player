# Joker Player Build Standard

## Baseline
- Android target SDK 36
- Minimum SDK 24
- cordova-android 15.x
- Node.js 20+

## Required checks
- `npm test`
- `npm run qa:performance`
- reproducible dependency installation with `npm ci` after a genuine lockfile is generated

## Release discipline
Generated `platforms/`, `plugins/`, `node_modules/`, and build outputs are not source-of-truth artifacts. They are recreated by the build pipeline.
