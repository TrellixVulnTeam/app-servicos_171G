import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export async function save (request: Request, response: Response) {

    const userRepository = getRepository(User);

    const savedUser = await userRepository.save(request.body);

    return response.status(200).json(savedUser);
}

export async function getAll (request: Request, response: Response) {

    const userRepository = getRepository(User);

    const allUsers = await userRepository.find();

    return response.json(allUsers);
}