import {AuthorizationCodeModel} from './AuthorizationCodeSchema'
import {AuthorizationCode, Falsey} from "oauth2-server";


export const saveCode = async (code: AuthorizationCode): Promise<AuthorizationCode> => {
    const codeInstance = new AuthorizationCodeModel(code)
    const result = await codeInstance.save();
    return result
}

export const getCodeByAuthorizationCode = async (authorizationCode: string): Promise<AuthorizationCode | Falsey> => {
    const codeInstance = await AuthorizationCodeModel.findOne({authorizationCode}).populate('client')
    return codeInstance;
}

export const removeCode = async (code: AuthorizationCode): Promise<void> => {
    await AuthorizationCodeModel.findOneAndDelete(code)
}
