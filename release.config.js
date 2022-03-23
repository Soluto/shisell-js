module.exports = {
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/exec', {prepareCmd: './build.sh'}],
    ['@semantic-release/npm', {pkgRoot: 'dist'}],
    ['@semantic-release/git', {assets: ['package.json']}],
  ],
};
