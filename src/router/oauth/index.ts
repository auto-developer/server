import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {authenticate, userHandler} from "../middleware/handler";
import {sessionErrorHandler} from "../middleware/error";
import {applicationHandler} from "./handler";
import {getAuthorize} from "./getAuthorize";
import {postToken} from "./postToken";

const router = new Router<DefaultState, Context>({prefix: '/oauth'})
    .get('/authorize', sessionErrorHandler, userHandler, applicationHandler, getAuthorize)
    .post('/token', postToken)
    .all('/authenticate', authenticate)

export default router
