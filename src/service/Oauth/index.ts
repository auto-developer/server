import OAuth2Server, {Request, Response} from 'oauth2-server'
import {Context, Next} from "koa";
import {model} from './Oauth2Model'
import {v4} from 'uuid'
import {redis} from "../../db";
import {findAuthenticationByIdentifier} from "../Authentication";
import {findAuthorizeClientByUserAndClient} from "../AuthorizeClient";
import {findUserById} from "../User";

const oauth = new OAuth2Server({model})

export const beforeGetAuthorize = async (ctx: Context, next: Next) => {
    const {client_id, redirect_uri, state, scope} = ctx.request.query
    if (!client_id || Array.isArray(client_id)) {
        throw Error();
    }
    const redirectWithQuery = (page: string) => {
        const query = new URLSearchParams({
            client_id: client_id,
            return_to: ctx.request.url
        })
        ctx.cookies.set(`/user_session`, undefined)
        return ctx.redirect(`/${page}?${query.toString()}`)
    }
    const session = ctx.cookies.get('user_session')
    if (!session) return redirectWithQuery('sign-in')
    const userId = await redis.get(session)
    if (!userId) return redirectWithQuery('sign-in')
    const user = await findUserById(userId)
    if (!user) return redirectWithQuery('sign-in')

    ctx.state.userId = userId
    const authorizeClient = await findAuthorizeClientByUserAndClient(userId, client_id)
    if (!authorizeClient) {
        console.log(userId, user)
        return ctx.render('authorize', {
            client: {},
            user,
            client_id,
            redirect_uri,
            scope,
            state
        })
    }
    return await next()
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
    console.log('-----', auth);
    if (!auth) {
        return ctx.redirect('/sign-in')
    }
    const session = v4()
    await redis.set(session, auth.user.id)
    console.log(session)
    ctx.cookies.set('user_session', session)
    return ctx.redirect(return_to)
}

export const postAuthorize = async (ctx: Context, next: Next) => {
    const {redirect_uri, client_id, state, authorize} = ctx.request.body
    const query = new URLSearchParams({
        client_id: client_id,
        state: state
    })
    console.log('authorize', authorize)
    return ctx.render('authorize-redirect', {redirect_uri})
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
