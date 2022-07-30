import { Router } from 'express';
import { getHomeNodes, createOrUpdateHomeNodes } from '../controllers/nodeController';
import { tokenExists } from '../middlewares/user';

const nodeRouter = Router();

nodeRouter.use(tokenExists);

nodeRouter.get('/:id?', getHomeNodes);

nodeRouter.post('/:id?', createOrUpdateHomeNodes);

// nodeRouter.post('/', createHomeNodes);













export default nodeRouter;