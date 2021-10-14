import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {findClientById} from "../service/Client";
import {userHandler} from "./middleware/handler";
import {updateUserById} from "../service/User";

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
    .post('/application', userHandler, async (ctx: Context, next: Next) => {
        const {client_id, return_to} = ctx.request.body
        const {userId, user} = ctx.state
        ctx.assert(user, 401)
        const applicationSet = new Set(user.applications)
        applicationSet.add(client_id)
        user.applications = Array.from(applicationSet)
        await updateUserById(userId, user)
        await ctx.redirect(return_to)
        await next()
    })

export default application
