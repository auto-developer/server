import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {getUsers} from "./getUsers";
import {getUser} from "./getUser";
import {postUsers} from "./postUsers";
import {authenticate, scopeHandler} from "../../handler";

export const users = new Router<DefaultState, Context>({prefix: '/users'})
    .use(scopeHandler)
    .use(authenticate)
    .get('/', getUsers)
    .get('/:username', getUser)
    .post('/', postUsers)
