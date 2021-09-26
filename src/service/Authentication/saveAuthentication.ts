import {Authentication} from "../../type";
import {AuthenticationModel} from "./AuthenticationSchema";

export const saveAuthentication = async (authentication: Authentication): Promise<Authentication> => {
    const instance = new AuthenticationModel(authentication);
    const result = await instance.save();
    return result.toObject()
}
