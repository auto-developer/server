import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {postToken} from "./postToken";
import {postToken as oauthToken} from "../../oauth/postToken";

export const token = new Router<DefaultState, Context>({prefix: '/token'})
    .post('/', postToken, oauthToken)
