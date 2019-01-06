import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Controller, Get, Post, Delete, Patch } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { validate } from 'class-validator';
import {__MODEL__} from "../entities/__MODEL__";
	
@Controller('/__PATH__')
@Injectable()
export class __MODEL__Controller {
    private __MODEL__Repository = getRepository(__MODEL__);

    @Get('/')
    async all(request: Request, response: Response, next: NextFunction) {
        return response.send(await this.__MODEL__Repository.find());
    }

    @Get('/:id')
    async one(request: Request, response: Response, next: NextFunction) {
        let toFind = await this.__MODEL__Repository.findOne(request.params.id);
		if (!toFind) return response.sendStatus(404);
		return response.send(toFind);   
    }

    @Post('/')
    async save(request: Request, response: Response, next: NextFunction) {
        let toAdd = request.body;
		delete toAdd.id;
		let errors = await validate(toAdd);
		if (errors.length > 0) return response.status(400).send(errors);
        return response.status(201).send(await this.__MODEL__Repository.save(request.body));
    }

    @Delete('/:id')
    async remove(request: Request, response: Response, next: NextFunction) {
        let toRemove = await this.__MODEL__Repository.findOne(request.params.id);
		if (!toRemove) return response.sendStatus(404);
        try {
			await this.__MODEL__Repository.remove(toRemove);
			return response.sendStatus(200);
		} catch (error) {
			return response.sendStatus(500);
		}
    }
}