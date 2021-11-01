import {Context, Next} from "koa";
import {findClientById} from "../../service/Client";
import {renderToStaticMarkup} from "react-dom/server";
import SignIn from "../../component/SignIn";

export const getSession = async (ctx: Context, next: Next) => {
    const {client_id, return_to} = ctx.request.query
    let client
    if (ctx.state.client_id) ctx.state.client = await findClientById(ctx.state.client_id)
    ctx.state = {client_id, client, return_to}
    ctx.body = renderToStaticMarkup(SignIn(ctx.state))
    await next()
}
