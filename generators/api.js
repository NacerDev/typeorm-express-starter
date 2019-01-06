#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const paths = require('../config/paths')

let updateCore = () => {
	let names = fs.readdirSync(paths.appControllers)
		.map(x => path.basename(x, '.ts'))
	let imports = names
		.map(name => `import { ${name} } from '../${path.basename(paths.appControllers)}/${name}';`)
	let coreControllerFileContent = `${imports.join('\n')}\nexport default [${names.join(',')}]`;
	fs.writeFileSync(path.join(paths.appSrc, 'core', 'controllers.ts'), coreControllerFileContent);
}

let generateModel = (name) => {
	let modelString = fs.readFileSync(path.join(paths.appTemplates, 'model.tpl')).toString('utf-8');
	modelString = modelString.replace(/__MODEL__/g, name);
	fs.writeFileSync(path.join(paths.appEntities, name + '.ts'), modelString);
};

let generateController = (name, pathname) => {
	let controllerString = fs.readFileSync(path.join(paths.appTemplates, 'controller.tpl')).toString('utf-8');
	controllerString = controllerString.replace(/__MODEL__/g, name);
	controllerString = controllerString.replace(/__PATH__/g, pathname);
	fs.writeFileSync(path.join(paths.appControllers, name + 'Controller.ts'), controllerString);
};

let generateApi = ({
	name,
	path
}) => {
	generateModel(name);
	generateController(name, path);
	updateCore();
	console.log(chalk.green(`Api ${name} generated successfully :{} !`));
};
let validateNameApi = (input) => {
	let modelFileName = input.charAt(0).toUpperCase() + input.substr(1) + '.ts';
	let modelFilePath = path.join(paths.appEntities, modelFileName);
	if (fs.existsSync(modelFilePath)) return 'Model name already exist !!';
	let controllerFileName = input.charAt(0).toUpperCase() + input.substr(1) + 'Controller.ts';
	let controllerFilePath = path.join(paths.appControllers, controllerFileName);
	if (fs.existsSync(controllerFilePath)) console.log(chalk.yellow('\nController exist and it will be overwriten !'));
	return true;
};
inquirer
	.prompt([{
		name: 'name',
		type: 'input',
		message: 'Api name (ex : User):',
		validate: (input) => {
			if (input) return validateNameApi(input);
			return 'You should provide a name !!';
		}
	}, {
		name: 'path',
		type: 'input',
		message: 'Api url path (ex: users for /users )',
		validate: (input) => {
			if (input) return true;
			return 'You should provide a path !!';
		}
	}])
	.then((answers) => {
		generateApi(answers);
	});