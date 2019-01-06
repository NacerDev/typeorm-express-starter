require('dotenv').config();
const chalk = require('chalk');
const fs = require('fs')
const proc = require('child_process');
const paths = require('../config/paths');
const ormconfig = require(paths.ormconfig)

let setupDevOrmConfig = () => {
    ormconfig.synchronize = true
    ormconfig.logging = true
    fs.writeFileSync(paths.ormconfig, JSON.stringify(ormconfig))
}

let setupProdOrmConfig = () => {
    ormconfig.synchronize = false
    ormconfig.logging = false
    fs.writeFileSync(paths.ormconfig, JSON.stringify(ormconfig))
}



console.log(chalk.blue('Running app on mode ' + process.env.NODE_ENV))
if (process.env.NODE_ENV === "development") {
    setupDevOrmConfig();
    let buildCmd = proc.exec('tsc -p . -w')
    buildCmd.stdout.on('data', (chunk) => {
        console.log(chalk.green('[build] : '), chunk)
    })
    let runCmd = proc.exec('pm2-dev start devserver.json')
    runCmd.stdout.on('data', (chunk) => {
        console.log(chalk.yellow('[run] : '), chunk)
    })
} else if (process.env.NODE_ENV === "production") {
    setupProdOrmConfig();
    let serveCmd = proc.exec('tsc -p . && node build/index')
    serveCmd.stdout.on('data', (chunk) => {
        console.log(chalk.magenta('[serve] : '), chunk)
    })
} else {
    console.log(chalk.red('Unknown env !!!'))
}