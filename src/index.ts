import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { attachControllers as attachRoutesControllers } from '@decorators/express';
import controllers from './core/controllers';

createConnection()
	.then(async (connection) => {
		const app = express();
		app.use(bodyParser.json());
		attachRoutesControllers(app, controllers);
		app.listen(3000);
	})
	.catch((error) => console.log(error));
