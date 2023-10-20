const { exec } = require('child_process')

export const isLibInstalled = (checkCmd) =>
  new Promise((resolve) => exec(checkCmd, (error) => resolve(!error)))
