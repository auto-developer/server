import Router from 'koa-router';
import {Context, DefaultState} from "koa";
import user from './User'

const router = new Router<DefaultState, Context>();

router.use('/users', user)

export default router;
