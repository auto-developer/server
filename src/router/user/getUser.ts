import {Context, Next} from "koa";

export const getUser = async (ctx: Context, next: Next) => {
    await ctx.render('user')
    await next()
}
