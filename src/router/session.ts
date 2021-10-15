import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {findClientById} from "../service/Client";
import {findAuthenticationByIdentifier} from "../service/Authentication";
import {setSession} from "../service/Session";

const getSession = async (ctx: Context, next: Next) => {
    const {client_id, return_to} = ctx.request.query
    let client
    if (ctx.state.client_id) ctx.state.client = await findClientById(ctx.state.client_id)
    ctx.state = {client_id, client, return_to}
    await ctx.render('session')
    console.log("====");
    await next()
    console.log("----");
}

const postSession = async (ctx: Context, next: Next) => {
    const {identifier, certificate, return_to} = ctx.request.body
    ctx.state = ctx.request.body
    const auth = await findAuthenticationByIdentifier(identifier, certificate)
    if (!auth) {
        if (ctx.state.client_id) ctx.state.client = await findClientById(ctx.state.client_id)
        return ctx.render(`session`)
    }
    const session = await setSession(auth.user.id)
    ctx.cookies.set('user_session', session)
    await ctx.redirect(return_to)
    await next()
}

const session = new Router<DefaultState, Context>({prefix: '/session'})
session
    .get('/', getSession)
    .post('/', postSession)

export default session
