import choiceSchema from '../schemas/choice.schema.js';

export function validaOpcao(req, res, next){

    const body = req.body;
    const validation = choiceSchema.validate(body);

    if(validation.error){
        res.sendStatus(422);
        return console.log('certifique-se que as alternativas seguem o padrão estabelecido')
    }else next();
}

