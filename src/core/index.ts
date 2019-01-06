import controllers from './controllers';
// create express app

// register express routes from defined application routes
//Routes.forEach((route) => {
//route.then((r) => console.log(r));
//console.log(route);
/*	(app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
		const result = new (route.controller as any)()[route.action](req, res, next);
		if (result instanceof Promise) {
			result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
		} else if (result !== null && result !== undefined) {
			res.json(result);
		}
	});*/
//});

export const constrollers = controllers;
