import {Client, PaginationQuery} from "../../type";
import {ClientModel} from "./ClientSchema";

export const findClients = async (clientFilter: Partial<Client>, pagination: PaginationQuery): Promise<Client[]> => {
    const clients = await ClientModel.find()
        .skip(pagination.page * pagination.size)
        .limit(pagination.size)
        .where(clientFilter)
        .lean()
    return clients
}
