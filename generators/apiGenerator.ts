#!/usr/bin/env node
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
let TypeOrmConfig = require('../ormconfig.json');
let modelsDir = TypeOrmConfig.cli.entitiesDir ? TypeOrmConfig.cli.entitiesDir : 'entity';
let controllersDir = 'src/controllers';

let Api: any = {
	name: '',
	filds: []
};
let field: any = {
	name: '',
	type: ''
};

let askForField = () => {
	inquirer
		.prompt({
			name: 'field',
			type: 'input',
			message: 'Add field to your model (ex : name):'
		})
		.then((answers: any) => {
			if (answers.field) {
				field.name = answers.field;
				askForType();
			} else {
				generateApi();
			}
		});
};
let askForType = () => {};
let generateApi = () => {
	let modelString = fs.readFileSync(path.join(__dirname, 'templates', 'model.tpl')).toString('utf-8');
	modelString = modelString.replace(/__MODEL__/g, Api.name);
	fs.writeFileSync(path.resolve(__dirname, '..', modelsDir, Api.name + '.ts'), modelString);
	let controllerString = fs.readFileSync(path.join(__dirname, 'templates', 'controller.tpl')).toString('utf-8');
	controllerString = controllerString.replace(/__MODEL__/g, Api.name);
	fs.writeFileSync(path.resolve(__dirname, '..', controllersDir, Api.name + 'Controller.ts'), controllerString);
	console.log(chalk.green(`Api ${Api.name} generated successfully :{} !`));
};
let validateNameApi = (input) => {
	if (
		fs.existsSync(path.resolve(__dirname, '..', modelsDir, input.charAt(0).toUpperCase() + input.substr(1) + '.ts'))
	)
		return 'Model name already exist !!';

	if (
		fs.existsSync(
			path.resolve(
				__dirname,
				'..',
				controllersDir,
				input.charAt(0).toUpperCase() + input.substr(1) + 'Controller.ts'
			)
		)
	)
		console.log(chalk.yellow('\nController exist and it will be overwriten !'));
	return true;
};
inquirer
	.prompt({
		name: 'name',
		type: 'input',
		message: 'Api name (ex : User):',
		validate: (input: string, answers?: {}) => {
			if (input) {
				return validateNameApi(input);
			}
			return 'You should provide a name !!';
		}
	})
	.then((answers: any) => {
		Api.name = answers.name;
		askForField();
	});
