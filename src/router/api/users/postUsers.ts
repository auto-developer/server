import {Context, Next} from "koa";
import {addUser} from "../../../service/User";

export const postUsers = async (ctx: Context, next: Next) => {
    const userParam = ctx.request.body
    ctx.assert(userParam.username, 400, 'username is required')
    ctx.assert(userParam.registerSource, 400, 'register source is required')
    const userInstance = await addUser(userParam)
    ctx.status = 201
    ctx.body = userInstance
    await next()
}

