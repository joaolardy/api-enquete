import { Router } from 'express';
import { listaEnquetes, criaEnquete, listaOpcoes } from '../controllers/poll.controller.js';
import { postaOpcao, postaVoto} from '../controllers/choice.controller.js';
import { validaOpcao } from '../middlewares/middleware.js';


const router = Router();
router.post("/poll", criaEnquete);
router.get("/poll", listaEnquetes);
router.post("/choice", validaOpcao, postaOpcao);
router.get("/poll/:id/choice", listaOpcoes);
router.post("/choice/:id/vote", postaVoto);



export default router;