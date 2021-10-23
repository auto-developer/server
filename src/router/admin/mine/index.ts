import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {getMine} from "./getMine";
import {authenticate, scopeHandler} from "../../handler";

export const mine = new Router<DefaultState, Context>({prefix: '/mine'})
    .use(scopeHandler)
    .use(authenticate)
    .get('/', getMine)
