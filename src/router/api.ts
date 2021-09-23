import Router from 'koa-router';
import {Context, DefaultState, Next} from "koa";
import {addUser, findUserById, findUsers} from "../service/User";
import {postClient} from "../service/Client";
import {authenticate} from "./oauth";

const getUsers = async (ctx: Context, next: Next) => {
    const {page, size} = ctx.request.query
    const userFilter = ctx.request.query
    const pagination = {page: Number(page), size: Number(size)}
    const users = await findUsers(userFilter, pagination)
    ctx.body = {
        data: users,
        pagination: {
            page: page,
            size: size,
            total: 0
        }
    }
    await next()
}

const postUsers = async (ctx: Context, next: Next) => {
    const userParam = ctx.request.body
    const userInstance = await addUser(userParam)
    ctx.status = 201
    ctx.body = userInstance
}

const getUser = async (ctx: Context, next: Next) => {
    ctx.body = ctx.state.user
    await next()
}

const users = new Router<DefaultState, Context>({prefix: '/users'})
    .get('/', getUsers)
    .post('/', postUsers)

const user = new Router<DefaultState, Context>()
    .get('/user', getUser)

const client = new Router<DefaultState, Context>({prefix: '/clients'})
    .post('/', postClient)

const router = new Router<DefaultState, Context>({prefix: '/api'});
router.use(authenticate)
router.use(users.routes());
router.use(user.routes());
router.use(client.routes())

export default router;
