import Router from 'koa-router';
import {Context, DefaultState, Next} from "koa";
import admin from './admin'
import oauth from "./oauth";
import user from "./user";
import session from "./session";
import application from "./application";
import Home from "../component/Home";
import {renderToStaticMarkup} from "react-dom/server";

const router = new Router<DefaultState, Context>();

router.use(admin.routes())
router.use(oauth.routes())
router.use(session.routes())
router.use(user.routes())
router.use(application.routes())
router.get('/', async (ctx: Context, next: Next) => {
    ctx.body = renderToStaticMarkup(Home(ctx.state))

    await next()
})

export default router;
