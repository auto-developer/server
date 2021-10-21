import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {userHandler} from "../handler";
import {postApplication} from "./postApplication";
import {getApplication} from "./getApplication";


const router = new Router<DefaultState, Context>({prefix: '/application'})

router
    .use(userHandler)
    .get('/', getApplication)
    .post('/', postApplication)

export default router
