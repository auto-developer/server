import {Context, Next} from "koa";
import {renderToStaticMarkup} from "react-dom/server";
import SignUp from "../../component/SignUp";

export const getUser = async (ctx: Context, next: Next) => {
    ctx.body = renderToStaticMarkup(SignUp({}))
    await next()
}
