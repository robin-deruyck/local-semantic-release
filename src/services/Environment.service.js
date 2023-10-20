const { exec } = require('child_process')

const isLibInstalled = (checkCmd) =>
  new Promise((resolve) => exec(checkCmd, (error) => resolve(!error)))

module.exports = {
  isLibInstalled
}
