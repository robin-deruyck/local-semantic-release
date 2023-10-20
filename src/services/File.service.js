import { Glob, glob } from 'glob'

export const resolveConfigFile = (args) => {
  const flagIndex = args?.indexOf('-p')
  return flagIndex >= 0 ? args[flagIndex + 1] : undefined
}

export const getShortestPath = (paths) => {
  if (!paths.length) return null
  return paths.reduce((a, b) => {
    const sizeA = a.split('/').length
    const sizeB = b.split('/').length
    const min = Math.min(sizeA, sizeB)
    return min === sizeA ? a : b
  })
}

export const searchFile = async (pattern, ignore) => {
  const g = new Glob(pattern, ignore)
  return getShortestPath(Array.from(g))
}
