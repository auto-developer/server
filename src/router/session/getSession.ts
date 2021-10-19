import {Context, Next} from "koa";
import {findClientById} from "../../service/Client";

export const getSession = async (ctx: Context, next: Next) => {
    const {client_id, return_to} = ctx.request.query
    let client
    if (ctx.state.client_id) ctx.state.client = await findClientById(ctx.state.client_id)
    ctx.state = {client_id, client, return_to}
    await ctx.render('session')
    await next()
}
