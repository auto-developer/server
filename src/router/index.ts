import Router from 'koa-router';
import {Context, DefaultState, Next} from "koa";
import api from './api'
import oauth from "./oauth";
import user from "./user";
import session from "./session";
import application from "./application";

const router = new Router<DefaultState, Context>();

router.use(api.routes())
router.use(oauth.routes())
router.use(session.routes())
router.use(user.routes())
router.use(application.routes())
router.get('/', async (ctx: Context, next: Next) => {
    await ctx.render('index')
    await next()
})

export default router;
