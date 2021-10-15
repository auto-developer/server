import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {findClientById} from "../service/Client";
import {findAuthenticationByIdentifier} from "../service/Authentication";
import {setSession} from "../service/Session";
import {sessionErrorHandler} from "./middleware/error";

const getSession = async (ctx: Context, next: Next) => {
    const {client_id, return_to} = ctx.request.query
    let client
    if (client_id && !Array.isArray(client_id)) client = await findClientById(client_id)
    ctx.state = {client_id, client_secret: client && client?.key, client, return_to}
    await ctx.render('session')
    await next()
}

const postSession = async (ctx: Context, next: Next) => {
    const {identifier, certificate, return_to, client_id} = ctx.request.body
    const query = new URLSearchParams({client_id, return_to})
    const auth = await findAuthenticationByIdentifier(identifier, certificate)
    if (!auth) return ctx.redirect(`/session?${query}`)
    const session = await setSession(auth.user.id)
    ctx.cookies.set('user_session', session)
    await ctx.redirect(return_to)
    await next()
}

const session = new Router<DefaultState, Context>()
session
    .get('/session', getSession)
    .post('/session', postSession, sessionErrorHandler)

export default session
