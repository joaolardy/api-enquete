import joi from 'joi';

const choiceSchema = joi.object({
    title: joi.string().min(1).required(),
    pollId: joi.required() 
});

export default choiceSchema;