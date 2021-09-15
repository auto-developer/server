import Router from 'koa-router';
import {Context, DefaultState} from "koa";
import api from './api'
import oauth from "./oauth";

const router = new Router<DefaultState, Context>();
router.use(async (ctx, next) => {
    console.log('before')
    try {
        await next()
    } catch (e) {
        console.log(e)
        console.log(JSON.stringify(e))
        ctx.status = 404
        await ctx.render('404')
    }
    console.log('after')
})
router.use(api.routes())
router.use(oauth.routes())

export default router;
