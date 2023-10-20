const { Logger } = require('./src/utils/logger.util.js')
const {
  readJSObjectFromFile,
  resolveConfigFile,
  searchFile
} = require('./src/services/File.service.js')
const translations = require('./src/i18n/en-GB.json')
const { isLibInstalled } = require('./src/services/Environment.service')
const { spawn } = require('child_process')
const {
  getCurrentBranch,
  getLocalRepoUrl
} = require('./src/services/Git.service')

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

;(async () => {
  try {
    await checkGitInstalled()
    runSemanticRelease()
  } catch (e) {
    Logger.fail(e)
    console.log(e)
  }
})()
