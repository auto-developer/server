import {Context, Next} from "koa";
import {findClientById} from "../../service/Client";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const applicationHandler = async (ctx: Context, next: Next): Promise<void> => {
    const {client_id, redirect_uri} = ctx.request.query
    ctx.assert(client_id, 400, 'client_id is required')
    ctx.assert(!Array.isArray(client_id), 400, 'client_id should be a string')
    const client = await findClientById(client_id)
    ctx.assert(client, 400, 'client does not exist')
    const {user} = ctx.state
    ctx.assert(user, 401)
    if (!user.applications.includes(client_id)) {
        ctx.state = {
            client_id,
            redirect_uri,
            createdAt: dayjs(client.createdAt).toNow(),
            return_to: ctx.request.url,
            client,
            user
        }
        return ctx.render(`application`)
    }
    await next()
}
