import { expect, test } from 'vitest'
import { getLocalRepoUrl, getCurrentBranch } from './Git.service'

test('getLocalRepoUrl', () => {
  test('Should return a valid URL for the local Git repository', () => {
    const url = getLocalRepoUrl()
    expect(url).toSatisfy((url) => url.startsWith('file://'))
    expect(url).toSatisfy((url) => url.endsWith('.git'))
  })
})

test('getCurrentBranch', () => {
  test('Should return the current Git branch name', () => {
    const branch = getCurrentBranch()
    assert.ok(branch.length > 0)
  })
})
