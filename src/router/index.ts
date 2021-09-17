import Router from 'koa-router';
import {Context, DefaultState} from "koa";
import api from './api'
import oauth from "./oauth";
import session from "./session";
import authorizeClient from "./authorizeClient";

const router = new Router<DefaultState, Context>();

router.use(api.routes())
router.use(oauth.routes())
router.use(session.routes())
router.use(authorizeClient.routes())

export default router;
