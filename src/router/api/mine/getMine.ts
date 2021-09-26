import {Context, Next} from "koa";

export const getMine = async (ctx: Context, next: Next) => {
    ctx.body = ctx.state.user
    await next()
}
