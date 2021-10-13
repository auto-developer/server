import {Context, Next} from "koa";
import {getSession} from "../../service/Session";
import {findUserById} from "../../service/User";
import {Request, Response} from "oauth2-server";
import {server} from "../../common/oauth";

export const userSessionHandler = async (ctx: Context, next: Next) => {
    const redirectWithQuery = (page: string) => {
        const clientId = typeof ctx.query.client_id === 'string' ? ctx.query.client_id : ''
        const query = new URLSearchParams({
            client_id: clientId,
            return_to: ctx.request.url,
        })
        ctx.cookies.set(`/user_session`, undefined)
        return ctx.redirect(`/${page}?${query.toString()}`)
    }
    const sessionId = ctx.cookies.get('user_session')
    if (!sessionId) return redirectWithQuery('session')
    const userId = await getSession(sessionId)
    if (!userId) return redirectWithQuery('session')
    const user = await findUserById(userId)
    if (!user) return redirectWithQuery('session')

    ctx.state.userId = userId
    await next()
}

export const authenticate = async (ctx: Context, next: Next) => {
    const oauthRequest = new Request(ctx.request);
    const oauthResponse = new Response(ctx.response);
    const {scope} = ctx.request.body;

    const token = await server.authenticate(oauthRequest, oauthResponse, {
        scope: scope
    })
    ctx.state.token = token;
    ctx.state.user = token.user;
    ctx.body = oauthResponse.body;
    ctx.status = oauthResponse.status || 500;
    ctx.set(oauthResponse.headers || {});
    await next();
}
