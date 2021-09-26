import {AuthorizationCodeModel} from "./AuthorizationCodeSchema";
import {AuthorizationCode, Falsey} from "../../type";

export const getCodeByAuthorizationCode = async (authorizationCode: string): Promise<AuthorizationCode | Falsey> => {
    const codeInstance = await AuthorizationCodeModel.findOne({authorizationCode}).populate('client')
    return codeInstance;
}
