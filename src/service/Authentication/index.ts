import {AuthenticationModel} from "./AuthenticationSchema";
import {AuthenticationType} from "./Authentication";
import {Falsey} from "oauth2-server";

export const saveAuthentication = async (authentication: AuthenticationType): Promise<AuthenticationType> => {
    const instance = new AuthenticationModel(authentication);
    const result = await instance.save();
    return result.toObject()
}

export const findAuthenticationByIdentifier = async (username: string, password: string): Promise<AuthenticationType | Falsey> => {
    const instance = await AuthenticationModel.findOne({
        identityType: 'username',
        identifier: username,
        certificate: password
    }).populate('user');
    return instance?.toObject();
}
