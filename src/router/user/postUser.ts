import {Context, Next} from "koa";
import {insertUser} from "../../service/User";

export const postUser = async (ctx: Context, next: Next) => {
    const userParam = ctx.request.body
    ctx.assert(userParam.username, 400, 'username is required')
    ctx.assert(userParam.registerSource, 400, 'register source is required')
    const userInstance = await insertUser(userParam)
    ctx.status = 201
    ctx.body = userInstance
    await next()
}
