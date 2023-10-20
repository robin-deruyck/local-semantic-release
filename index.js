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

const loadReleaseConfig = async () => {
  const configPath = resolveConfigFile(process.argv)
  if (!configPath) throw new Error(translations.config.fail.invalid_path)

  const jsConfig = await searchFile('**/release.config.{js,cjs}', {
    ignore: 'node_modules/**'
  })

  if (!jsConfig) throw new Error(translations.config.fail.file_not_found)
  return await readJSObjectFromFile(jsConfig)
}

const checkGitInstalled = async () => {
  const isGitInstalled = await isLibInstalled('git -v')
  if (!isGitInstalled) throw new Error(translations.config.fail.git_not_found)
}

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
    await checkGitInstalled()
    runSemanticRelease()
  } catch (e) {
    Logger.fail(e)
    console.log(e)
  }
}

await start()
