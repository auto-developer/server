import {Context, DefaultState, Next} from "koa";
import {User} from "../../type/User";
import Router from "koa-router";

const getUsers = async (ctx: Context, next: Next): Promise<void> => {
    const users: User[] = [];
    ctx.body = users;
    await next();
};

const router = new Router<DefaultState, Context>()
router.get('/', getUsers)

export default router.routes()
