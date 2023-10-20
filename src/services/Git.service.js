import { execSync } from 'node:child_process'

export const getLocalRepoUrl = () => {
  const topLevelDir = execSync('git rev-parse --show-toplevel')
    .toString()
    .trim()

  return `file://${topLevelDir}/.git`
}

export const getCurrentBranch = () =>
  execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
