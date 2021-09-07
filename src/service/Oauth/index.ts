import OAuth2Server, {Request, Response} from 'oauth2-server'
import {Context, Next} from "koa";
import {model} from './Oauth2Model'
import {v4} from 'uuid'
import {redis} from "../../common/db";
import {findAuthenticationByIdentifier} from "../Authentication";

const oauth = new OAuth2Server({model})

export const beforeGetAuthorize = async (ctx: Context, next: Next) => {
    const {client_id} = ctx.request.query
    if (!client_id || Array.isArray(client_id)) {
        throw Error();
    }
    const query = new URLSearchParams({
        client_id,
        return_to: ctx.request.url
    })
    const session = ctx.cookies.get('user_session')
    if (session) {
        const user = await redis.get(session)
        if (user) {
            ctx.state.user = user
            return await next()
        }
    }
    ctx.redirect(`/sign-in?${query.toString()}`)
}

export const getAuthorize = async (ctx: Context, next: Next) => {
    const oauthRequest = new Request(ctx.request);
    const oauthResponse = new Response(ctx.response);
    const authenticateHandler = {
        handle: async (request: Request, response: Response) => {
            console.log('authenticateHandler', request)
            const session = ctx.cookies.get('user_session')
            if (!session) {
                return null
            }
            const userId = await redis.get(session)
            return userId
        }
    }
    const options = {
        authenticateHandler: authenticateHandler,
    }
    const code = await oauth.authorize(oauthRequest, oauthResponse, options)
    console.log('code:', code)
    ctx.body = oauthResponse.body
    ctx.status = oauthResponse.status || 500
    ctx.set(oauthResponse.headers || {})
    await next();

}

export const postSession = async (ctx: Context, next: Next) => {
    const {identifier, certificate, return_to, timestamp, timestamp_secret} = ctx.request.body
    const auth = await findAuthenticationByIdentifier(identifier, certificate)
    if (!auth) {
        return
    }
    const session = v4()
    await redis.set(session, auth.user.id)
    console.log(session)
    ctx.cookies.set('user_session', session)
    ctx.redirect(return_to)
    await next()
}

export const postToken = async (ctx: Context, next: Next) => {
    const oauthRequest = new Request(ctx.request);
    const oauthResponse = new Response(ctx.response);

    try {
        await oauth.token(oauthRequest, oauthResponse)
        ctx.body = oauthResponse.body;
        ctx.status = oauthResponse.status || 500
        ctx.set(oauthResponse.headers || {});
    } catch (e) {
        console.log(e)
        ctx.body = {error: e.name, error_description: e.message};
        ctx.status = e.code;
    }
    await next();
}

export const getAuthenticate = async (ctx: Context, next: Next) => {
    const oauthRequest = new Request(ctx.request);
    const oauthResponse = new Response(ctx.response);
    const {scope} = ctx.request.body;
    try {
        const token = await oauth.authenticate(oauthRequest, oauthResponse, {
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
