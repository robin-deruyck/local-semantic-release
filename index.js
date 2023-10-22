import { Logger } from './src/utils/logger.util.js'

import { spawn } from 'node:child_process'
import {
  getCurrentBranch,
  getLocalRepoUrl
} from './src/services/Git.service.js'

const runSemanticRelease = () => {
  spawn(
    `CI=true GITHUB_TOKEN=x NPM_TOKEN=x npx semantic-release --branches ${getCurrentBranch()} -r ${getLocalRepoUrl()}`,
    {
      shell: true,
      stdio: 'inherit'
    }
  )
}

export const start = async () => {
  try {
    // TODO : this check must be made in the bin script
    // await checkGitInstalled()
    runSemanticRelease()
  } catch (e) {
    Logger.fail(e)
    console.log(e)
  }
}

await start()
