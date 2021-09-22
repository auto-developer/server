import Router from 'koa-router';
import {Context, DefaultState} from "koa";
import api from './api'
import user from "./user";
import oauth from "./oauth";
import session from "./session";
import application from "./application";

const router = new Router<DefaultState, Context>();

router.use(api.routes())
router.use(user.routes())
router.use(oauth.routes())
router.use(session.routes())
router.use(application.routes())

export default router;
