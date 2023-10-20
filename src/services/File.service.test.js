import { expect, test } from 'vitest'
import { resolveConfigFile } from './File.service'

test('resolveConfigFile', () => {
  test('Should return undefined with empty array or nullable value', () => {
    expect(resolveConfigFile([])).toBe(undefined)
    expect(resolveConfigFile(null)).toBe(undefined)
    expect(resolveConfigFile(undefined)).toBe(undefined)
    expect(resolveConfigFile('')).toBe(undefined)
  })

  test('Should return undefined without -p flag', () => {
    expect(
      resolveConfigFile(['/opt/homebrew/Cellar/node/20.6.1/bin/node'])
    ).toBe(undefined)
  })

  test('Should return undefined with only -p flag provided', () => {
    expect(
      resolveConfigFile(['/opt/homebrew/Cellar/node/20.6.1/bin/node'])
    ).toBe(undefined)
  })

  test('Should return undefined with -p flag and path provided in the wrong order', () => {
    expect(
      resolveConfigFile([
        '/opt/homebrew/Cellar/node/20.6.1/bin/node',
        '/release.config.js',
        '-p'
      ])
    ).toBe(undefined)
  })

  test('Should return the path with -p flag and path provided in the right order', () => {
    expect(
      resolveConfigFile([
        '/opt/homebrew/Cellar/node/20.6.1/bin/node',
        '-p',
        '/release.config.js'
      ])
    ).toBe('/release.config.js')
  })
})
