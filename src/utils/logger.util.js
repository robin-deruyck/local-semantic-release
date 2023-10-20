import bashColorsUtil from './bash-colors.util.js'

const { RED, GREEN, YELLOW, ENDCOLOR } = bashColorsUtil

export const Logger = {
  info: (msg) => log(msg, '📢', 'INFO', ''),
  warn: (msg) => log(msg, '🤨', 'WARNING', YELLOW),
  success: (msg) => log(msg, '💚', 'SUCCESS', GREEN),
  fail: (msg) => log(msg, '💩', 'FAIL', RED)
}

const log = (msg, icon, severityText, color) => {
  const now = new Date()
  const logMessage = ` [${now.toLocaleTimeString()}] [local-semantic-release] ${icon} ${color}[${severityText}]${ENDCOLOR}: ${msg} `
  console.log(logMessage)
}
