import Router from 'koa-router';
import {Context, DefaultState} from "koa";
import {authenticate, scopeHandler} from "../middleware/handler";
import {users} from "./users";
import {clients} from "./clients";
import {mine} from "./mine";

const router = new Router<DefaultState, Context>({prefix: '/api'});
router.use(scopeHandler)
router.use(authenticate)
router.use(users.routes());
router.use(mine.routes());
router.use(clients.routes())

export default router;
