import {Context, Next} from "koa";
import {findUserByUsername} from "../../../service/User";

export const getUser = async (ctx: Context, next: Next) => {
    const {username} = ctx.params
    ctx.assert(username, 400, 'username is required')
    const user = await findUserByUsername(username)
    ctx.body = user
    await next()
}
