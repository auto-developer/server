import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {userSessionHandler} from "./middleware/handler";
import {pageErrorHandler} from "./middleware/error";
import {Request, Response} from "oauth2-server";
import {server} from "../common/oauth"
import {logger} from "../common/logger";
import {findUserById} from "../service/User";

export const beforeGetAuthorize = async (ctx: Context, next: Next): Promise<void> => {
    const {client_id} = ctx.request.query
    ctx.assert(client_id, 400, 'client_id is required')
    const {userId} = ctx.state
    const userWithApplications = await findUserById(userId)
    ctx.assert(userWithApplications, 401)
    console.log(userWithApplications.applications, client_id, userWithApplications.applications.includes(client_id))
    if (!userWithApplications.applications.map((applicationId:string) => applicationId.toString()).includes(client_id))
        return ctx.redirect(`/application?client_id=${client_id}&return_to=${ctx.request.url}`)
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


const oauth = new Router<DefaultState, Context>()
    .use(pageErrorHandler)
    .get('/authorize', userSessionHandler, beforeGetAuthorize, getAuthorize)
    .post('/token', postToken)

export default oauth
