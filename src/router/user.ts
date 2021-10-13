import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {insertUser} from "../service/User";

const user = new Router<DefaultState, Context>()
user
    .get('/user', async (ctx: Context, next: Next) => {
        await ctx.render('user')
        await next()
    })
    .post('/user', async (ctx: Context, next: Next) => {
        const userParam = ctx.request.body
        ctx.assert(userParam.username, 400, 'username is required')
        ctx.assert(userParam.registerSource, 400, 'register source is required')
        const userInstance = await insertUser(userParam)
        ctx.status = 201
        ctx.body = userInstance
        await next()
    })

export default user
