import { db } from '../config/db.js';

export async function listaEnquetes(req, res){
    try {
        const enquetes = await db.collection('poll').find().toArray();
        res.send(enquetes).status(200)
    } catch (error) {
        // console.log(error);
        res.sendStatus(500);
    }

}

export async function criaEnquete(req, res){
    const novaEnquete = {
        title: req.body.title,
        expireAt: req.body.expireAt
    }
    
    if(!req.body.expireAt){
        novaEnquete.expireAt = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm');
    }

    if(!req.body.title){
        res.status(422);
    }

    try {
        await db.collection('poll').insertOne(novaEnquete);
        res.status(201).send(novaEnquete);
    } catch (error) {
        // console.log(error);
        res.status(500);
    }
}