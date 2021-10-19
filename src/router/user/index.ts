import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {getUser} from "./getUser";
import {postUser} from "./postUser";

const user = new Router<DefaultState, Context>({prefix: '/user'})
user
    .get('/', getUser)
    .post('/', postUser)

export default user
