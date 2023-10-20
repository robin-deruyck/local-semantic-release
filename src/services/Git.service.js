const { execSync } = require('child_process')

const getLocalRepoUrl = () => {
  const topLevelDir = execSync('git rev-parse --show-toplevel')
    .toString()
    .trim()

  return `file://${topLevelDir}/.git`
}

const getCurrentBranch = () =>
  execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

module.exports = {
  getLocalRepoUrl,
  getCurrentBranch
}
