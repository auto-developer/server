import Router from 'koa-router';
import {Context, DefaultState, Next} from "koa";
import {addUser, findUsers} from "../service/User";
import {postClient} from "../service/Client";
import {authenticate} from "./oauth";



export const getUsers = async (ctx: Context, next: Next) => {
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

export const postUser = async (ctx: Context, next: Next) => {
    const userParam = ctx.request.body
    const userInstance = await addUser(userParam)
    ctx.status = 201
    ctx.body = userInstance
}

const user = new Router<DefaultState, Context>({prefix: '/users'})
    .get('/', getUsers)
    .post('/', postUser)

const client = new Router<DefaultState, Context>({prefix: '/clients'})
    .post('/', postClient)


const router = new Router<DefaultState, Context>({prefix: '/api'});
router.use(authenticate)
router.use(user.routes());
router.use(user.routes());
router.use(client.routes())

export default router;
