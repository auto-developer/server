import {Context, Next} from "koa";

export const pageErrorHandler = async (ctx: Context, next: Next) => {
    try {
        await next()
    } catch (e) {
        switch (e.status) {
            case 401:
                ctx.status = e.status
                await ctx.render('session')
                break
            case 404:
                ctx.status = e.status
                await ctx.render('404')
                break
            case 500:
                ctx.status = e.status
                await ctx.render('500')
                break
            default:
                throw e
        }
    }
}
