import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {getAuthorize, postToken} from "../service/Oauth";
import {userSessionHandler} from "./userSession";
import {pageErrorHandler} from "./error";
import {findUserApplicationsById} from "../service/User";

export const beforeGetAuthorize = async (ctx: Context, next: Next): Promise<void> => {
    const {client_id} = ctx.request.query
    if (!client_id || Array.isArray(client_id)) {
        throw Error();
    }
    const {userId} = ctx.state
    const userWithApplications = await findUserApplicationsById(userId)
    ctx.assert(userWithApplications, 401)
    console.log('-----', client_id, ctx.request.url);
    console.log(Array.isArray(userWithApplications.applications));
    if (!userWithApplications.applications.includes(client_id)) return ctx.redirect(`/application?client_id=${client_id}&return_to=${ctx.request.url}`)
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
