import {Context, Next} from "koa";
import {findClientById} from "../../service/Client";

export const getApplication = async (ctx: Context, next: Next) => {
    const {client_id, return_to} = ctx.request.query
    let client
    if (client_id && !Array.isArray(client_id)) {
        client = await findClientById(client_id)
    }
    ctx.state = {client_id, client_secret: client && client?.key, client, return_to}
    await ctx.render('application')
    await next()
}
