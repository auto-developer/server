import {Client, Falsey} from "oauth2-server";
import {ClientModel} from "./ClientSchema";
import {Context, Next} from "koa";

export const saveClient = async (client: Omit<Client, 'id'>): Promise<Client> => {
    const clientInstance = new ClientModel(client);
    const result = await clientInstance.save();
    return result;
}

export const getClient = async (clientId: string, clientSecret: string): Promise<Client | Falsey> => {
    const client = await ClientModel.findById(clientId)
    console.log(client, clientSecret)
    return client
}

export const postClient = async (ctx: Context, next: Next): Promise<void> => {
    const clientParam: Omit<Client, 'id'> = ctx.request.body
    console.log(ctx.request.body)
    ctx.body = await saveClient(clientParam)
    await next()
}
