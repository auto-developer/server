import {AuthorizationCode} from "oauth2-server";
import {AuthorizationCodeModel} from "./AuthorizationCodeSchema";

export const saveCode = async (code: AuthorizationCode): Promise<AuthorizationCode> => {
    const codeInstance = new AuthorizationCodeModel(code)
    const result = await codeInstance.save();
    return result
}
