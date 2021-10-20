import {
    Falsey,
    FindRefreshToken,
    FindTokenByAccessToken,
    InsertToken,
    RefreshToken,
    RemoveToken,
    Token,
} from '../../type';
import {RefreshTokenModel, TokenModel} from './TokenSchema';

export const findRefreshToken: FindRefreshToken = async (refreshToken: string): Promise<RefreshToken | Falsey> => {
    const tokenInstance = await RefreshTokenModel.findOne({refreshToken})
        .populate('client')
    return tokenInstance;
}

export const findTokenByAccessToken: FindTokenByAccessToken = async (accessToken: string): Promise<Token | Falsey> => {
    const tokenInstance = await TokenModel.findOne({accessToken}).populate('user')
    return tokenInstance;
}
export const removeToken: RemoveToken = async (token: Token): Promise<boolean> => {
    const tokenInstance = await TokenModel.findByIdAndDelete(token.id);
    return !!tokenInstance
}

export const insertToken: InsertToken = async (token: Token): Promise<Token> => {
    const tokenInstance = new TokenModel(token);
    const result = await tokenInstance.save();
    return result;
}

