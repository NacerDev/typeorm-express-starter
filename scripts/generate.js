#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const paths = require('../config/paths');
const GENERATORS = fs.readdirSync(paths.appGenerators).map(x => path.basename(x, '.js')).map(x => x.charAt(0).toUpperCase() + x.substr(1))

inquirer
    .prompt({
        type: 'list',
        name: 'generator',
        message: 'What do you want to generate ?',
        choices: GENERATORS,
        filter: function (val) {
            return val.toLowerCase();
        }
    })
    .then((answers) => {
        require(path.join(paths.appGenerators, answers.generator))
    });