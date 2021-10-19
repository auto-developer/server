import {Context, Next} from "koa";
import {updateUserById} from "../../service/User";

export const postApplication = async (ctx: Context, next: Next) => {
    const {client_id, return_to} = ctx.request.body
    const {userId, user} = ctx.state
    ctx.assert(user, 401)
    const applicationSet = new Set(user.applications)
    applicationSet.add(client_id)
    user.applications = Array.from(applicationSet)
    await updateUserById(userId, user)
    await ctx.redirect(return_to)
    await next()
}
