import Router from "koa-router";
import {Context, DefaultState} from "koa";
import {getClients} from "./getClients";
import {getClient} from "./getClient";
import {postClient} from "./postClient";

export const clients = new Router<DefaultState, Context>({prefix: '/clients'})
    .get('/', getClients)
    .get('/:clientId', getClient)
    .post('/', postClient)
