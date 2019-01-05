import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    private UserRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.UserRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.UserRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.UserRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let toRemove = await this.UserRepository.findOne(request.params.id);
        await this.UserRepository.remove(toRemove);
    }

}