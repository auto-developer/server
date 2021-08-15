import Router from 'koa-router';
import {Context, DefaultState} from "koa";

const router = new Router<DefaultState, Context>()
    .get('/', async (ctx: Context) => {
        await ctx.render('index')
    })
    .get('/sign-in', async (ctx: Context) => {
        await ctx.render('sign-in')
    })

export default router;
