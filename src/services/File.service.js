const { Glob } = require('glob')
const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')

const resolveConfigFile = (args) => {
  const flagIndex = args?.indexOf('-p')
  return flagIndex >= 0 ? args[flagIndex + 1] : undefined
}

const getShortestPath = (paths) => {
  if (!paths.length) return null
  return paths.reduce((a, b) => {
    const sizeA = a.split('/').length
    const sizeB = b.split('/').length
    const min = Math.min(sizeA, sizeB)
    return min === sizeA ? a : b
  })
}

const searchFile = async (pattern, ignore) => {
  const g = new Glob(pattern, ignore)
  return getShortestPath(Array.from(g))
}

const readJSObjectFromFile = async (filePath) => {
  const absolutePath = path.resolve(filePath)

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`)
  }

  const fileContents = require(absolutePath)

  if (typeof fileContents !== 'object') {
    throw new Error(`File does not export an object: ${absolutePath}`)
  }

  return fileContents
}

module.exports = {
  resolveConfigFile,
  readJSObjectFromFile,
  searchFile,
  getShortestPath
}
