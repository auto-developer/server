import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {getMine} from "./getMine";

export const mine = new Router<DefaultState, Context>({prefix: '/mine'})
    .get('/', getMine)
