import { db } from "../config/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function postaOpcao(req, res) {
    let body = req.body;
    const novaOpcao = {
        title: body.title,
        poll: body.pollId,
    }
    try {
        const enqueteExistente = await db.collection('poll').findOne({ _id: new ObjectId(choice.pollId) })
        //confere se existe a enquete
        if (!enqueteExistente) {
            res.sendStatus(404);
            return
        }

        //confere se a enquete esta vencida
        let dataValidade = enqueteExistente.expireAt;
        let enqueteVencida = dayjs().isAfter(dataValidade, 'days');
        if (enqueteVencida) {
            res.sendStatus(403);
            return
        }

        await db.collection('choice').insertOne(novaOpcao);


    } catch (error) {
        res.status(500)
    }

}

export async function postaVoto(req, res) {
    const id = req.params.id;
    const novoVoto = {
        createAt: dayjs().format('YYYY-MM-DD HH:mm'),
        choiceId: id
    }

    try {
        const enqueteExistente = await db.collection('choice').findOne({ _id: new ObjectId(id) })
        //confere se existe a enquete
        if (!enqueteExistente) {
            res.sendStatus(404);
            return
        }

        //confere se ainda esta ativa
        let dataValidade = enqueteExistente.expireAt;
        let enqueteVencida = dayjs().isAfter(dataValidade, 'days');
        if (enqueteVencida) {
            res.sendStatus(403);
            return
        }

        await db.collection('vote').insertOne(novoVoto);
        res.sendStatus(201);

    } catch (error) {
        res.status(500);
    }
}

export async function listaOpcoes(req, res) {
    const id = req.params.id;

    try {
        const listaAlternativas = await db.collection('choice').find({ pollId: id }).toArray;
        if (listaAlternativas.length === 0) {
            res.sendStatus(404);
        } else {
            res.send(listaAlternativas).status(200);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}