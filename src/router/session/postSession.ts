import {Context, Next} from "koa";
import {findAuthenticationByIdentifier} from "../../service/Authentication";
import {findClientById} from "../../service/Client";
import {setSession} from "../../service/Session";

export const postSession = async (ctx: Context, next: Next) => {
    const {identifier, certificate, return_to} = ctx.request.body
    ctx.state = ctx.request.body
    const auth = await findAuthenticationByIdentifier(identifier, certificate)
    if (!auth) {
        if (ctx.state.client_id) ctx.state.client = await findClientById(ctx.state.client_id)
        ctx.state.error = {message: 'Incorrect username or password.'}
        return ctx.render(`session`)
    }
    const session = await setSession(auth.user.id)
    ctx.cookies.set('user_session', session)
    await ctx.redirect(return_to || '/')
    await next()
}
