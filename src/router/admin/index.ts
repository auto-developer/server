import Router from 'koa-router';
import {Context, DefaultState} from "koa";
import {users} from "./users";
import {clients} from "./clients";
import {mine} from "./mine";
import {token} from "./token";

const router = new Router<DefaultState, Context>({prefix: '/admin'});

router.use(users.routes());
router.use(mine.routes());
router.use(clients.routes())
router.use(token.routes())

export default router;
