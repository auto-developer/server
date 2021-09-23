import {Context, Next} from "koa";
import {getSession} from "../../service/Session";
import {findUserById} from "../../service/User";
import {Request, Response} from "oauth2-server";
import {server} from "../../common/oauth";
import {logger} from "../../common/logger";

export const userSessionHandler = async (ctx: Context, next: Next) => {
    const redirectWithQuery = (page: string) => {
        const query = new URLSearchParams({
            return_to: ctx.request.url
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
    try {
        const token = await server.authenticate(oauthRequest, oauthResponse, {
            scope: scope
        })
        ctx.state.token = token;
        ctx.state.user = token.user;
        logger.info(token)
        ctx.body = oauthResponse.body;
        ctx.status = oauthResponse.status || 500;
        ctx.set(oauthResponse.headers || {});
        await next();
    } catch (e) {
        ctx.status = e.code;
        ctx.body = {error: e.name, error_description: e.message}
    }
}
