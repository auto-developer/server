import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {userSessionHandler} from "./middleware/handler";
import {pageErrorHandler} from "./middleware/error";
import {findUserApplicationsById} from "../service/User";
import {Request, Response} from "oauth2-server";
import {server} from "../common/oauth"
import {logger} from "../common/logger";

export const beforeGetAuthorize = async (ctx: Context, next: Next): Promise<void> => {
    const {client_id} = ctx.request.query
    if (!client_id || Array.isArray(client_id)) {
        throw Error();
    }
    const {userId} = ctx.state
    const userWithApplications = await findUserApplicationsById(userId)
    ctx.assert(userWithApplications, 401)
    console.log(Array.isArray(userWithApplications.applications));
    if (!userWithApplications.applications.includes(client_id)) return ctx.redirect(`/application?client_id=${client_id}&return_to=${ctx.request.url}`)
    await next()
}


export const getAuthorize = async (ctx: Context, next: Next) => {
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

export const postToken = async (ctx: Context, next: Next) => {
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
        ctx.body = oauthResponse.body;
        ctx.status = oauthResponse.status || 500;
        ctx.set(oauthResponse.headers || {});
        await next();
    } catch (e) {
        ctx.status = e.code;
        ctx.body = {error: e.name, error_description: e.message}
    }
}


const oauth = new Router<DefaultState, Context>()
    .use(pageErrorHandler)
    .get('/authorize', userSessionHandler, beforeGetAuthorize, getAuthorize)
    .post('/token', postToken)

    .get('/', async (ctx: Context, next: Next) => {
        await ctx.render('index')
        await next()
    })


export default oauth
