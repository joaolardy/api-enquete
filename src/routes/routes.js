import { Router } from 'express';
import { listaEnquetes, criaEnquete } from '../controllers/poll.controller.js';
import { validaOpcao } from '../middlewares/middleware.js';


const router = Router();
router.get("/poll", listaEnquetes);
router.post("/poll", criaEnquete);

// router.post("/choice", validaOpcao, postaOpcao);
// router.post("/choice/:id/vote", postaVoto);



export default router;