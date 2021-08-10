import {Authentication} from "../../type/Authentication";
import {AuthenticationModel} from "./AuthenticationSchema";

export const saveAuthentication = async (authentication: Authentication): Promise<Authentication> => {
    const instance = new AuthenticationModel(authentication);
    const result = await instance.save();
    return result.toObject()
}

export const getAuthenticationByUsername = async (username: string, password: string): Promise<Authentication> => {
    const instance = await AuthenticationModel.findOne({
        identityType: 'username',
        identifier: username,
        certificate: password,
    });
    return instance.toObject();
}
