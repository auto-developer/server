import {AuthenticationModel} from "./AuthenticationSchema";
import {Authentication} from "./Authentication";
import {Falsey} from "oauth2-server";

export const saveAuthentication = async (authentication: Authentication): Promise<Authentication> => {
    const instance = new AuthenticationModel(authentication);
    const result = await instance.save();
    return result.toObject()
}

export const findAuthenticationByIdentifier = async (username: string, password: string): Promise<Authentication | Falsey> => {
    const instance = await AuthenticationModel.findOne({
        identityType: 'username',
        identifier: username,
        certificate: password,
    });
    return instance;
}
