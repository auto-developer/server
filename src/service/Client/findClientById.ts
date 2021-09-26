import {Falsey} from "oauth2-server";
import {ClientModel} from "./ClientSchema";
import {Client} from "../../type";

export const findClientById = async (clientId: string): Promise<Client | Falsey> => {
    const client = await ClientModel.findById(clientId)
    return client?.toObject<Client>()
}
