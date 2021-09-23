import {Falsey, RefreshToken, Token} from "oauth2-server";
import {RefreshTokenModel, TokenModel} from "./TokenSchema";


export const saveToken = async (token: Token): Promise<Token> => {
    const tokenInstance = new TokenModel(token);
    const result = await tokenInstance.save();
    return result;
}

export const findToken = async (accessToken: string): Promise<Token | Falsey> => {
    const tokenInstance = await TokenModel.findOne({accessToken}).populate('user')
    return tokenInstance;
}

export const findRefreshToken = async (refreshToken: string): Promise<RefreshToken | Falsey> => {
    const tokenInstance = await RefreshTokenModel.findOne({refreshToken})
        .populate('client')
    return tokenInstance;
}

export const deleteToken = async (token: Token): Promise<boolean> => {
    const tokenInstance = await TokenModel.findOneAndDelete(token);
    return !!tokenInstance
}
