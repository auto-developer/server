import {Context, Next} from "koa";

export const pageErrorHandler = async (ctx: Context, next: Next) => {
    try {
        await next()
        if (ctx.status === 404) {
            await ctx.render('404')
        }
    } catch (e) {
        switch (e.status) {
            case 500:
                ctx.status = e.status
                await ctx.render('500')
                break
            case 503:
                ctx.status = e.status
                await ctx.render('503')
                break
            default:
                throw e
        }
    }
}

export const sessionErrorHandler = async (ctx: Context, next: Next) => {
    try {
        await next()
    } catch (e) {
        switch (e.status) {
            case 401:
                ctx.cookies.set(`/user_session`, undefined)
                await ctx.render('session')
                break
            default:
                throw e
        }
    }
}
