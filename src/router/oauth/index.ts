import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {authenticate, scopeHandler, sessionErrorHandler, userHandler} from "../handler";
import {applicationHandler} from "./handler";
import {getAuthorize} from "./getAuthorize";
import {postToken} from "./postToken";

const router = new Router<DefaultState, Context>({prefix: '/oauth'})
    .get('/authorize', sessionErrorHandler, userHandler, applicationHandler, getAuthorize)
    .post('/token', postToken)
    .all('/authenticate', scopeHandler, authenticate)

export default router
