import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {__MODEL__} from "../entity/__MODEL__";

export class __MODEL__Controller {

    private __MODEL__Repository = getRepository(__MODEL__);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.__MODEL__Repository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.__MODEL__Repository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.__MODEL__Repository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let toRemove = await this.__MODEL__Repository.findOne(request.params.id);
        await this.__MODEL__Repository.remove(toRemove);
    }

}