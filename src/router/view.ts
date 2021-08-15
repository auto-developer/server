import Router from 'koa-router';
import {Context, DefaultState} from "koa";
import {findClientById} from "../service/Client";

const router = new Router<DefaultState, Context>()
    .get('/', async (ctx: Context) => {
        await ctx.render('index', {test: 123})
    })
    .get('/sign-in', async (ctx: Context) => {
        const {client_id, return_to} = ctx.request.query
        let client
        console.log(client_id && !Array.isArray(client_id))
        if (client_id && !Array.isArray(client_id)) {
            client = await findClientById(client_id)
            console.log('client:', client)
            console.log('client logo:', client && client.logo)
        }
        const timestamp = new Date();
        ctx.state = {timestamp, client, return_to}
        console.log(ctx.state);
        await ctx.render('sign-in')
    })

export default router;
