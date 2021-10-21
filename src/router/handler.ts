import {Context, Next} from "koa";
import {getSession} from "../service/Session";
import {findUserById} from "../service/User";
import {Request, Response} from "oauth2-server";
import {server} from "../common/oauth";
import {findClientById} from "../service/Client";


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
                console.log('==========')
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
                ctx.state.client_id = Array.isArray(ctx.query.client_id) ? ctx.query.client_id[0] : ctx.query.client_id || ''
                ctx.state.return_to = ctx.request.url
                if (ctx.state.client_id) ctx.state.client = await findClientById(ctx.state.client_id)
                ctx.cookies.set(`/user_session`, undefined)
                await ctx.render('session')
                break
            default:
                throw e
        }
    }
}

/**
 * resolve session -> userId -> user
 * @param ctx
 * @param next
 */
export const userHandler = async (ctx: Context, next: Next) => {
    const sessionId = ctx.cookies.get('user_session')
    ctx.assert(sessionId, 401)
    const userId = await getSession(sessionId)
    ctx.assert(userId, 401)
    const user = await findUserById(userId)
    ctx.assert(user, 401)

    ctx.state.userId = userId
    ctx.state.user = user
    await next()
}

/**
 * resolve scope
 * @param ctx
 * @param next
 */
export const scopeHandler = async (ctx: Context, next: Next) => {
    const path = ctx.path.slice(1).split('/')[0]
    ctx.state.scope = [`${path.toUpperCase()}`]
    await next()
}

/**
 * check token is valid or not
 * @param ctx
 * @param next
 */
export const authenticate = async (ctx: Context, next: Next) => {
    const oauthRequest = new Request(ctx.request);
    const oauthResponse = new Response(ctx.response);
    const token = await server.authenticate(oauthRequest, oauthResponse, {
        scope: ctx.state.scope
    })
    ctx.state.token = token;
    ctx.state.user = token.user;
    ctx.body = oauthResponse.body;
    ctx.status = oauthResponse.status || 500;
    ctx.set(oauthResponse.headers || {});
    await next();
}
