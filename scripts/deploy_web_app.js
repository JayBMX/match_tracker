'use strict'
const spawn = require('child_process').spawn
const path = require('path')

const DeployCommand = (dir, command) => {
  return new Promise((resolve, reject) => {
    const cf = spawn('cf', [command], {
      cwd: dir
    })
    let error = false

    cf.stderr.on('data', (data) => {
      error = true
      console.log(`stderr for web app ${dir.split('/').pop()}: ${data}`)
    })

    cf.on('exit', () => {
      error ? reject() : resolve()
    })
  })
}

const DeployWebApp = () => {
  return DeployCommand(path.join(process.cwd(), 'web'), 'push')
}

module.exports = DeployWebApp
