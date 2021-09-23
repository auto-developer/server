import {Client, Falsey} from "oauth2-server";
import {ClientModel} from "./ClientSchema";
import {ClientType} from "./Client";
import {PaginationQuery} from "../../type";

export const saveClient = async (client: Omit<Client, 'id'>): Promise<Client> => {
    const clientInstance = new ClientModel(client);
    const result = await clientInstance.save();
    return result;
}

export const findClientById = async (clientId: string): Promise<Client | Falsey> => {
    const client = await ClientModel.findById(clientId)
    return client?.toObject<ClientType>()
}
export const findClientByClientIdClientSecret = async (clientId: string, clientSecret: string): Promise<Client | Falsey> => {
    const client = await ClientModel.findById(clientId)
    return client
}

export const findClients = async (clientFilter: Partial<ClientType>, pagination: PaginationQuery): Promise<ClientType[]> => {
    const clients = await ClientModel.find()
        .skip(pagination.page * pagination.size)
        .limit(pagination.size)
        .where(clientFilter)
        .lean()
    return clients
}
