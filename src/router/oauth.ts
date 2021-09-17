import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {getAuthorize, postToken} from "../service/Oauth";
import {findApplicationByUserAndClient} from "../service/Application";
import {userSessionHandler} from "./userSession";
import {pageErrorHandler} from "./error";

export const beforeGetAuthorize = async (ctx: Context, next: Next): Promise<void> => {
    const {client_id} = ctx.request.query
    if (!client_id || Array.isArray(client_id)) {
        throw Error();
    }
    const {userId} = ctx.state
    const authorizeClient = await findApplicationByUserAndClient(userId, client_id)
    if (!authorizeClient) return ctx.redirect(`/application?client_id=${client_id}&return_to=${ctx.request.url}`)
    await next()
}

const oauth = new Router<DefaultState, Context>()
    .use(pageErrorHandler)
    .get('/authorize', userSessionHandler, beforeGetAuthorize, getAuthorize)
    .post('/token', postToken)

    .get('/', async (ctx: Context, next: Next) => {
        await ctx.render('index')
        await next()
    })


export default oauth
