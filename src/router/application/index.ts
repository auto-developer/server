import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {userHandler} from "../handler";
import {postApplication} from "./postApplication";


const router = new Router<DefaultState, Context>({prefix: '/application'})

router
    .use(userHandler)
    .post('/', postApplication)

export default router
