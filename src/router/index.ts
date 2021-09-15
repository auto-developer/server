import Router from 'koa-router';
import {Context, DefaultState} from "koa";
import api from './api'
import oauth from "./oauth";

const router = new Router<DefaultState, Context>();

router.use(api.routes())
router.use(oauth.routes())

export default router;
