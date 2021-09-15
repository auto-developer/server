import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {beforeGetAuthorize, getAuthorize, postAuthorize, postSession, postToken} from "../service/Oauth";
import {getSession} from "../service/Session";
import {findUserById} from "../service/User";
import {findClientById} from "../service/Client";

const oauth = new Router<DefaultState, Context>()
    .post('/session', postSession)
    .get('/authorize', beforeGetAuthorize, getAuthorize)
    .post('/authorize', postAuthorize)
    .post('/token', postToken)

    .get('/', async (ctx: Context, next: Next) => {
        ctx.assert('', 401, 'assert error')
        const sessionId = ctx.cookies.get('user_session')
        if (sessionId) {
            const userId = await getSession(sessionId)
            if (userId) {
                const user = await findUserById(userId)
                if (user) {
                    ctx.state = {
                        session: sessionId,
                        username: user.nickname
                    }
                }
            }
        }
        await ctx.render('index')
        await next()
    })
    .get('/sign-in', async (ctx: Context) => {
        const {client_id, return_to} = ctx.request.query
        let client
        if (client_id && !Array.isArray(client_id)) {
            client = await findClientById(client_id)
        }
        ctx.state = {client_id, client_secret: client && client?.key, client, return_to}
        console.log(ctx.state);
        await ctx.render('sign-in')
    })

export default oauth
