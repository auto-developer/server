import Router from 'koa-router';
import {Context, DefaultState} from "koa";
import {authenticate, scopeHandler} from "../handler";
import {users} from "./users";
import {clients} from "./clients";
import {mine} from "./mine";

const router = new Router<DefaultState, Context>({prefix: '/admin'});
router.use(scopeHandler)
router.use(authenticate)
router.use(users.routes());
router.use(mine.routes());
router.use(clients.routes())

export default router;
