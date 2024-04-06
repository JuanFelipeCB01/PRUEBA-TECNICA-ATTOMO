import { Router } from "express";
import { authReq } from '../../middlewares/validateToken.js'

const  router = Router();

router.get('/tasks', authReq, (req, res) => res.send('Tasks'))

export default router;