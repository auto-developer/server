import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {findClientById} from "../service/Client";
import {userSessionHandler} from "./userSession";
import {saveApplication} from "../service/Application";

const application = new Router<DefaultState, Context>()

application
    .get('/application', async (ctx: Context, next: Next) => {
        const {client_id, return_to} = ctx.request.query
        let client
        if (client_id && !Array.isArray(client_id)) {
            client = await findClientById(client_id)
        }
        ctx.state = {client_id, client_secret: client && client?.key, client, return_to}
        await ctx.render('application')
        await next()
    })
    .post('/application', userSessionHandler, async (ctx: Context, next: Next) => {
        const {return_to} = ctx.request.query
        ctx.assert(typeof return_to === 'string', 401)
        const {client_id} = ctx.request.body
        const {userId} = ctx.state
        console.log(ctx.state);
        const authorizeClient = await saveApplication({
            client: client_id,
            user: userId
        })
        console.log('save client', return_to, client_id)
        await ctx.redirect(return_to)
        await next()
    })

export default application
