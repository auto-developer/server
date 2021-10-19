import {Context, Next} from "koa";

export const applicationHandler = async (ctx: Context, next: Next): Promise<void> => {
    const {client_id} = ctx.request.query
    ctx.assert(client_id, 400, 'client_id is required')
    const {user} = ctx.state
    ctx.assert(user, 401)
    if (!user.applications.includes(client_id)) {
        ctx.state = {client_id, return_to: ctx.request.url}
        return ctx.render(`application`)
    }
    await next()
}
