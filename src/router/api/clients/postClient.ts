import {Context, Next} from "koa";
import {Client} from "oauth2-server";
import {saveClient} from "../../../service/Client";

export const postClient = async (ctx: Context, next: Next): Promise<void> => {
    const clientParam: Omit<Client, 'id'> = ctx.request.body
    ctx.body = await saveClient(clientParam)
    await next()
}
