import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {findClientById} from "../service/Client";
import {userSessionHandler} from "./middleware/handler";
import {findUserById} from "../service/User";

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
        const {client_id, return_to} = ctx.request.body
        const {userId} = ctx.state
        const userWithApplications = await findUserById(userId)
        ctx.assert(userWithApplications, 401)
        userWithApplications.applications.push(client_id)
        await userWithApplications.save()
        await ctx.redirect(return_to)
        await next()
    })

export default application
