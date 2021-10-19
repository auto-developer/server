import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {postSession} from "./postSession";
import {getSession} from "./getSession";


const router = new Router<DefaultState, Context>({prefix: '/session'})
router
    .get('/', getSession)
    .post('/', postSession)

export default router
