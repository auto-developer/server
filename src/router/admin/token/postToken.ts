import {Context, Next} from "koa";
import {ADMIN_CLIENT_SECRET} from "../../../common/config";

export const postToken = async (ctx: Context, next: Next) => {
    ctx.request.body.client_secret = ADMIN_CLIENT_SECRET
    await next()
}
