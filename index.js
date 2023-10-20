import { Logger } from './src/utils/logger.util.js'
import { resolveConfigFile, searchFile } from './src/services/File.service.js'
import translations from './src/i18n/en-GB.json' assert { type: 'json' }

const loadReleaseConfig = async () => {
  const configPath = resolveConfigFile(process.argv)
  if (!configPath) throw new Error(translations.config.fail.invalid_path)

  const jsConfig = await searchFile('**/release-config.{js,cjs}', {
    ignore: 'node_modules/**'
  })

  if (!jsConfig) throw new Error(translations.config.fail.file_not_found)
}

;(async () => {
  try {
    await loadReleaseConfig()
  } catch (e) {
    Logger.fail(e)
    console.log(e)
  }
})()
