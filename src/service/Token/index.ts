import {
  Falsey,
  FindRefreshToken,
  FindToken,
  RefreshToken,
  RemoveToken,
  SaveToken,
  Token,
} from '../../type';
import { RefreshTokenModel, TokenModel } from './TokenSchema';

export const findRefreshToken: FindRefreshToken = async (refreshToken: string): Promise<RefreshToken | Falsey> => {
  const tokenInstance = await RefreshTokenModel.findOne({refreshToken})
      .populate('client')
  return tokenInstance;
}

export const findToken: FindToken = async (accessToken: string): Promise<Token | Falsey> => {
  const tokenInstance = await TokenModel.findOne({accessToken}).populate('user')
  return tokenInstance;
}
export const removeToken: RemoveToken = async (token: Token): Promise<boolean> => {
  const tokenInstance = await TokenModel.findOneAndDelete(token);
  return !!tokenInstance
}

export const saveToken: SaveToken = async (token: Token): Promise<Token> => {
  const tokenInstance = new TokenModel(token);
  const result = await tokenInstance.save();
  return result;
}

