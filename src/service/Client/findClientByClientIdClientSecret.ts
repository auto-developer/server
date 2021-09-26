import {Client, Falsey} from "oauth2-server";
import {ClientModel} from "./ClientSchema";

export const findClientByClientIdClientSecret = async (clientId: string, clientSecret: string): Promise<Client | Falsey> => {
    const client = await ClientModel.findById(clientId)
    return client
}
