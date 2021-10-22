import {Context, Next} from "koa";
import {findClientById} from "../../service/Client";

export const getApplication = async (ctx: Context, next: Next) => {
    const {client_id, return_to} = ctx.request.query
    ctx.assert(client_id, 404)
    ctx.assert(!Array.isArray(client_id), 404)
    const client = await findClientById(client_id)
    ctx.assert(client, 404)
    ctx.state = {client_id, client_secret: client.key, client, return_to}
    await ctx.render('application')
    await next()
}
