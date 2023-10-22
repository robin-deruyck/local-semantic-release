import { COLORS } from './Colors.util.js'

export const Logger = {
  info: (msg) => log(msg, '📢', 'INFO', ''),
  warn: (msg) => log(msg, '🤨', 'WARNING', COLORS.YELLOW),
  success: (msg) => log(msg, '💚', 'SUCCESS', COLORS.GREEN),
  fail: (msg) => log(msg, '💩', 'FAIL', COLORS.RED)
}

const log = (msg, icon, severityText, color) => {
  const now = new Date()
  const logMessage = ` [${now.toLocaleTimeString()}] [local-semantic-release] ${icon} ${color}[${severityText}]${
    COLORS.ENDCOLOR
  }: ${msg} `
  process.stdout.write(logMessage)
}
