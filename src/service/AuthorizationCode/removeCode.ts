import {AuthorizationCode} from "oauth2-server";
import {AuthorizationCodeModel} from "./AuthorizationCodeSchema";

export const removeCode = async (code: AuthorizationCode): Promise<void> => {
    await AuthorizationCodeModel.findOneAndDelete(code)
}
