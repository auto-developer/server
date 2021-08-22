import {AuthorizeClientModel} from "./AuthorizeClientSchema";
import {AuthorizeClient} from "./AuthorizeClient";
import {Falsey} from "oauth2-server";

export const findAuthorizeClientByUserAndClient = async (userId: string, clientId: string): Promise<AuthorizeClient | Falsey> => {
    return null
}

export const saveAuthorizeClient = async (authorizeClient: AuthorizeClient) => {
    const instance = new AuthorizeClientModel(authorizeClient)
    const result = await instance.save();
    return result.toObject();
}
