import {Context, Next} from "koa";
import {findClients} from "../../../service/Client";


export const getClients = async (ctx: Context, next: Next): Promise<void> => {
    const {page, size} = ctx.request.query
    const userFilter = ctx.request.query
    const pagination = {page: Number(page), size: Number(size)}
    const clients = await findClients(userFilter, pagination)
    ctx.body = {
        data: clients,
        pagination: {
            page: page,
            size: size,
            total: 0
        }
    }
    await next()
}
