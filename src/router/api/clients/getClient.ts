import {Context, Next} from "koa";
import {findClientById} from "../../../service/Client";

export const getClient = async (ctx:Context, next:Next): Promise<void> => {
    const {clientId} = ctx.params
    const client = await findClientById(clientId)
    ctx.body = client
    await next()
}
