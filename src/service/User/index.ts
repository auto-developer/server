import {Context, Next} from "koa";

export const getUsers = async (ctx: Context, next: Next) => {
    ctx.body = []
    await next()
}
