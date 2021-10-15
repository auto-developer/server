import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {insertUser} from "../service/User";

const getUser = async (ctx: Context, next: Next) => {
    await ctx.render('user')
    await next()
}

const postUser = async (ctx: Context, next: Next) => {
    const userParam = ctx.request.body
    ctx.assert(userParam.username, 400, 'username is required')
    ctx.assert(userParam.registerSource, 400, 'register source is required')
    const userInstance = await insertUser(userParam)
    ctx.status = 201
    ctx.body = userInstance
    await next()
}

const user = new Router<DefaultState, Context>({prefix: 'user'})
user
    .get('/', getUser)
    .post('/', postUser)

export default user
