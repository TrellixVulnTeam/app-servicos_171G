import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Information } from "../entity/Information";

export async function save (request: Request, response: Response) {

    const informationRepository = getRepository(Information);

    const savedInformation = await informationRepository.save(request.body);

    return response.status(200).json(savedInformation);
}

export async function getAll (request: Request, response: Response) {

    const informationRepository = getRepository(Information);

    const allInformations = await informationRepository.find();

    return response.json(allInformations);
}