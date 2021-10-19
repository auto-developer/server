import {Context, Next} from "koa";
import {Request, Response} from "oauth2-server";
import {server} from "../../common/oauth";

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
