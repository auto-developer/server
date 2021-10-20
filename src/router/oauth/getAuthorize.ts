import {Context, Next} from "koa";
import {Request, Response} from "oauth2-server";
import {server} from "../../common/oauth";
import {logger} from "../../common/logger";

export const getAuthorize = async (ctx: Context, next: Next) => {
    const oauthRequest = new Request(ctx.request);
    const oauthResponse = new Response(ctx.response);
    const authenticateHandler = {
        handle: async (request: Request, response: Response) => ctx.state.userId
    }
    const options = {authenticateHandler: authenticateHandler}
    try {
        const code = await server.authorize(oauthRequest, oauthResponse, options)
        ctx.body = oauthResponse.body
        ctx.status = oauthResponse.status || 500
        ctx.set(oauthResponse.headers || {})
    } catch (e) {
        logger.error(e)
        const {redirect_uri} = ctx.request.query
        ctx.assert(!Array.isArray(redirect_uri), 404)
        ctx.status = e.code;
        await ctx.render('404')
    }
    await next();
}
