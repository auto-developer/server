import {Context, Next} from "koa";
import {getSession} from "../../service/Session";
import {findUserById} from "../../service/User";
import {Request, Response} from "oauth2-server";
import {server} from "../../common/oauth";
import {findClientById} from "../../service/Client";

export const userHandler = async (ctx: Context, next: Next) => {
    ctx.state.client_id = Array.isArray(ctx.query.client_id) ? ctx.query.client_id[0] : ctx.query.client_id || ''
    ctx.state.return_to = ctx.request.url
    if (ctx.state.client_id) ctx.state.client = await findClientById(ctx.state.client_id)
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

export const scopeHandler = async (ctx: Context, next:Next) => {
    console.log(ctx.request.method, ctx.ip, ctx.ips)
    const scope = ['username']
    ctx.state.scope = scope
    await next()
}

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
