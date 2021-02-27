import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';

export class SendMailController{
    async execute(request: Request, response: Response){
        const { email, survey_id } = request.body;
        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExists = await usersRepository.findOne({email});
        const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id});

        if(!userAlreadyExists) return response.status(400).json({ error: "User does not exists" });
        else if(!surveyAlreadyExists) return response.status(400).json({ error: "Survey does not exists" });

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        });

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}