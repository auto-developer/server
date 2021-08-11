import {Falsey, RefreshToken, Token} from "oauth2-server";
import {TokenModel} from "./TokenSchema";


export const saveToken = async (token: Token): Promise<Token> => {
    const tokenInstance = new TokenModel(token);
    const result = await tokenInstance.save();
    return result;
}

export const getTokenByAccessToken = async (accessToken: string): Promise<Token | Falsey> => {
    const tokenInstance = await TokenModel.findOne({accessToken}).populate('user')
    return tokenInstance;
}

export const findTokenByRefreshToken = async (refreshToken: string): Promise<Token | Falsey> => {
    const tokenInstance = await TokenModel.findOne({refreshToken}).populate('client');
    console.log("debug::", refreshToken, tokenInstance)
    return tokenInstance;
}

export const deleteToken = async (token: Token): Promise<boolean> => {
    const tokenInstance = await TokenModel.findOneAndDelete(token);
    return !!tokenInstance
}
