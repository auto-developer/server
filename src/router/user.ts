import Router from "koa-router";
import {Context, DefaultState, Next} from "koa";
import {userSessionHandler} from "./middleware/handler";
import {findUserById} from "../service/User";

const user = new Router<DefaultState, Context>()

user
    .get('/user', userSessionHandler, async (ctx: Context, next: Next) => {
        const {userId} = ctx.state
        const user = await findUserById(userId)
        ctx.body = user
        await next()
    })

export default user
