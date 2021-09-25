import Router from 'koa-router';
import {Context, DefaultState, Next} from "koa";
import {addUser, findUserByUsername, findUsers} from "../service/User";
import {findClientById, findClients, saveClient} from "../service/Client";
import {Client} from "oauth2-server";
import {authenticate} from "./middleware/handler";

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
    ctx.assert(userParam.username, 400, 'username is required')
    ctx.assert(userParam.registerSource, 400, 'register source is required')
    const userInstance = await addUser(userParam)
    ctx.status = 201
    ctx.body = userInstance
    await next()
}

const getUser = async (ctx: Context, next: Next) => {
    const {username} = ctx.params
    ctx.assert(username, 400, 'username is required')
    const user = await findUserByUsername(username)
    ctx.body = user
    await next()
}

const getMine = async (ctx: Context, next: Next) => {
    ctx.body = ctx.state.user
    await next()
}

export const getClients = async (ctx: Context, next: Next): Promise<void> => {
    const {page, size} = ctx.request.query
    const userFilter = ctx.request.query
    const pagination = {page: Number(page), size: Number(size)}
    const clients = await findClients(userFilter, pagination)
    ctx.body = {
        data: clients,
        pagination: {
            page: page,
            size: size,
            total: 0
        }
    }
    await next()
}

export const getClient = async (ctx:Context, next:Next): Promise<void> => {
    const {clientId} = ctx.params
    const client = await findClientById(clientId)
    ctx.body = client
    await next()
}

export const postClient = async (ctx: Context, next: Next): Promise<void> => {
    const clientParam: Omit<Client, 'id'> = ctx.request.body
    ctx.body = await saveClient(clientParam)
    await next()
}

const users = new Router<DefaultState, Context>({prefix: '/users'})
    .get('/', getUsers)
    .get('/:username', getUser)
    .post('/', postUsers)

const user = new Router<DefaultState, Context>({prefix: '/mine'})
    .get('/', getMine)

const clients = new Router<DefaultState, Context>({prefix: '/clients'})
    .get('/', getClients)
    .get('/:clientId', getClient)
    .post('/', postClient)

const router = new Router<DefaultState, Context>({prefix: '/api'});
router.use(authenticate)
router.use(users.routes());
router.use(user.routes());
router.use(clients.routes())

export default router;
