import choiceSchema from '../schemas/choice.schema.js';
import pollSchema from '../schemas/poll.schema.js';

export function validaOpcao(req, res, next){

    const body = req.body;
    const opcaoValida = choiceSchema.validate(body);

    if(opcaoValida.error){
        res.sendStatus(422);
        return
    }else next();
    next();
}

export function validaEnquete(req, res, next){
    const enqueteValida = pollSchema.validate(req.body);

    if(enqueteValida.error){
        res.status(422)
        return
    }
    next();
}

