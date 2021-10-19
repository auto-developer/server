import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {authenticate, userHandler} from "../middleware/handler";
import {sessionErrorHandler} from "../middleware/error";
import {Request, Response} from "oauth2-server";
import {server} from "../../common/oauth"
import {logger} from "../../common/logger";

const applicationHandler = async (ctx: Context, next: Next): Promise<void> => {
    const {client_id} = ctx.request.query
    ctx.assert(client_id, 400, 'client_id is required')
    const {user} = ctx.state
    ctx.assert(user, 401)
    if (!user.applications.includes(client_id)) {
        ctx.state = {client_id, return_to: ctx.request.url}
        return ctx.render(`application`)
    }
    await next()
}

const getAuthorize = async (ctx: Context, next: Next) => {
    const oauthRequest = new Request(ctx.request);
    const oauthResponse = new Response(ctx.response);
    const authenticateHandler = {
        handle: async (request: Request, response: Response) => {
            return ctx.state.userId
        }
    }
    const options = {
        authenticateHandler: authenticateHandler,
    }
    const code = await server.authorize(oauthRequest, oauthResponse, options)
    ctx.body = oauthResponse.body
    ctx.status = oauthResponse.status || 500
    ctx.set(oauthResponse.headers || {})
    await next();
}

const postToken = async (ctx: Context, next: Next) => {
    const oauthRequest = new Request(ctx.request);
    const oauthResponse = new Response(ctx.response);

    try {
        await server.token(oauthRequest, oauthResponse)
        ctx.body = oauthResponse.body;
        ctx.status = oauthResponse.status || 500
        ctx.set(oauthResponse.headers || {});
    } catch (e) {
        logger.error(e)
        ctx.body = {error: e.name, error_description: e.message};
        ctx.status = e.code;
    }
    await next();
}

const oauth = new Router<DefaultState, Context>({prefix: '/oauth'})
    .get('/authorize', sessionErrorHandler, userHandler, applicationHandler, getAuthorize)
    .post('/token', postToken)
    .all('/authenticate', authenticate)

export default oauth
