module.exports = {
  '*.{css,md,json,js,ts}': () => 'yarn format --uncommitted',
  '*': () => 'yarn lint',
  '*.spec.{ts,tsx}': () => 'yarn test',
}
