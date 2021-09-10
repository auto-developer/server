import Router from 'koa-router';
import {Context, DefaultState} from "koa";
import {getUsers, postUser} from "../service/User";
import {postClient} from "../service/Client";

const user = new Router<DefaultState, Context>({prefix: '/users'})
    .get('/', getUsers)
    .post('/', postUser)

const client = new Router<DefaultState, Context>({prefix: '/clients'})
    .post('/', postClient)


const router = new Router<DefaultState, Context>({prefix: '/api'});
router.use(user.routes());
router.use(client.routes())

export default router;
