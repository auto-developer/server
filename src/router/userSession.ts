import {Context, Next} from "koa";
import {getSession} from "../service/Session";
import {findUserById} from "../service/User";

export const userSessionHandler = async (ctx: Context, next: Next) => {
    const redirectWithQuery = (page: string) => {
        const query = new URLSearchParams({
            return_to: ctx.request.url
        })
        ctx.cookies.set(`/user_session`, undefined)
        return ctx.redirect(`/${page}?${query.toString()}`)
    }
    const sessionId = ctx.cookies.get('user_session')
    if (!sessionId) return redirectWithQuery('sign-in')
    const userId = await getSession(sessionId)
    if (!userId) return redirectWithQuery('sign-in')
    const user = await findUserById(userId)
    if (!user) return redirectWithQuery('sign-in')

    ctx.state.userId = userId
    await next()
}
