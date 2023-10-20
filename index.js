import { Logger } from './src/utils/logger.util.js'
import {
  readJSObjectFromFile,
  resolveConfigFile,
  searchFile
} from './src/services/File.service.js'
import translations from './src/i18n/en-GB.json' assert { type: 'json' }

import { spawn } from 'node:child_process'
import {
  getCurrentBranch,
  getLocalRepoUrl
} from './src/services/Git.service.js'
import { isLibInstalled } from './src/services/Environment.service.js'

const runSemanticRelease = () => {
  spawn(
    `CI=true npx semantic-release --branches ${getCurrentBranch()} -r ${getLocalRepoUrl()}`,
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
