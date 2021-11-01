import {Context, Next} from "koa";
import {findClientById} from "../../service/Client";
import dayjs from "dayjs";
import RelativeTimeThreshold from 'dayjs/plugin/relativeTime'
import {renderToStaticMarkup} from "react-dom/server";
import Authorize from "../../component/Authorize";

dayjs.extend(RelativeTimeThreshold)

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
            created_to_now: dayjs().diff(client.createdAt, 'year'),
            return_to: ctx.request.url,
            client,
            user
        }
        ctx.body = renderToStaticMarkup(Authorize(ctx.state))
        return
    }
    await next()
}
