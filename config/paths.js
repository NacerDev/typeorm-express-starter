const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
let resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

let getAppSrcPath = (tsconfig) => {
	let baseUrl = require(tsconfig).compilerOptions.rootDir || 'src';
	return resolvePath(baseUrl);
};
let getAppBuildPath = (tsconfig) => {
	let baseUrl = require(tsconfig).compilerOptions.outDir || 'build';
	return resolvePath(baseUrl);
};

let getAppEtitiesPath = (ormconfig) => {

	let baseUrl = require(ormconfig).cli.entitiesDir || 'src/entities';
	return resolvePath(baseUrl);
}

module.exports = {
	dotenv: resolvePath('.env'),
	tsconfig: resolvePath('tsconfig.json'),
	ormconfig: resolvePath('ormconfig.json'),
	appPackageJson: resolvePath('package.json'),
	appNodeModules: resolvePath('node_modules'),
	appTemplates: resolvePath('templates'),
	appGenerators: resolvePath('generators'),
	appSrc: getAppSrcPath(resolvePath('tsconfig.json')),
	appBuild: getAppBuildPath(resolvePath('tsconfig.json')),
	appControllers: path.join(getAppSrcPath(resolvePath('tsconfig.json')), 'controllers'),
	appEntities: getAppEtitiesPath(resolvePath('ormconfig.json'))

};