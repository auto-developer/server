import Router from 'koa-router';
import {Context, DefaultState} from "koa";
import {getUsers} from "../service/User";
import {getAuthorize, postToken} from "../service/Oauth";
import {postClient} from "../service/Client";

const router = new Router<DefaultState, Context>();


const user = new Router<DefaultState, Context>();
user
    .get('/', getUsers)
router.use('/users', user.routes());

const client = new Router<DefaultState, Context>();
client
    .post('/', postClient)
router.use('/clients', client.routes())

const oauth = new Router<DefaultState, Context>();
oauth
    .get('/authorize', getAuthorize)
    .post('/token', postToken)
router.use('/oauth', oauth.routes());


export default router;
