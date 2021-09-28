import {Context, Next} from "koa";
import {insertClient} from "../../../service/Client";
import {Client} from "../../../type";

export const postClient = async (ctx: Context, next: Next): Promise<void> => {
    const clientParam: Client = ctx.request.body
    ctx.body = await insertClient(clientParam)
    await next()
}
