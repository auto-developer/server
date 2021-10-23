import {
    Client,
    Falsey,
    FindClientByClientIdClientSecret,
    FindClientById,
    FindClients,
    InsertClient,
    PaginationQuery,
} from '../../type';
import {ClientModel} from './ClientSchema';

export const findClientByClientIdClientSecret: FindClientByClientIdClientSecret = async (clientId: string, clientSecret: string): Promise<Client | Falsey> => {
    const client = await ClientModel.findById(clientId).populate('owner')
    return clientSecret ? clientSecret === client?.clientSecret && client : client
}

export const findClientById: FindClientById = async (clientId: string): Promise<Client | Falsey> => {
    const client = await ClientModel.findById(clientId).populate('owner')
    return client?.toObject<Client>()
}

export const findClients: FindClients = async (clientFilter: Partial<Client>, pagination: PaginationQuery): Promise<Client[]> => {
    const clients = await ClientModel.find()
        .skip(pagination.page * pagination.size)
        .limit(pagination.size)
        .where(clientFilter)
        .lean()
    return clients
}

export const insertClient: InsertClient = async (client: Omit<Client, 'id'>): Promise<Client> => {
    const clientInstance = new ClientModel(client);
    const result = await clientInstance.save();
    return result;
}
