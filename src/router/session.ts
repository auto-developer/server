import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {findClientById} from "../service/Client";
import {findAuthenticationByIdentifier} from "../service/Authentication";
import {setSession} from "../service/Session";

const session = new Router<DefaultState, Context>()
session.get('/session', async (ctx: Context, next: Next) => {
    const {client_id, return_to} = ctx.request.query
    let client
    if (client_id && !Array.isArray(client_id)) {
        client = await findClientById(client_id)
    }
    ctx.state = {client_id, client_secret: client && client?.key, client, return_to}
    await ctx.render('session')
    await next()
})
    .post('/session', async (ctx: Context, next: Next) => {
        const {identifier, certificate, return_to, timestamp, timestamp_secret} = ctx.request.body
        const auth = await findAuthenticationByIdentifier(identifier, certificate)
        if (!auth) return ctx.redirect('/session')
        const session = await setSession(auth.user.id)
        ctx.cookies.set('user_session', session)
        await ctx.redirect(return_to)
        await next()
    })

export default session
