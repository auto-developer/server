import {Context, Next} from "koa";

export const allAuthorize = async (ctx: Context, next: Next) => {
    const {user} = ctx.state
    ctx.body = user
}
