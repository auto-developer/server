import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {beforeGetAuthorize, getAuthorize, postSession, postToken} from "../service/Oauth";

const oauth = new Router<DefaultState, Context>({prefix: '/oauth'})
    .post('/session', postSession)
    .get('/authorize', beforeGetAuthorize, getAuthorize)
    .post('/token', postToken)

export default oauth
