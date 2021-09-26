import {Client} from "oauth2-server";
import {ClientModel} from "./ClientSchema";

export const saveClient = async (client: Omit<Client, 'id'>): Promise<Client> => {
    const clientInstance = new ClientModel(client);
    const result = await clientInstance.save();
    return result;
}
