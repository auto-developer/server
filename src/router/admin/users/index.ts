import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {getUsers} from "./getUsers";
import {getUser} from "./getUser";
import {postUsers} from "./postUsers";

export const users = new Router<DefaultState, Context>({prefix: '/users'})
    .get('/', getUsers)
    .get('/:username', getUser)
    .post('/', postUsers)
