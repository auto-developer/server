import {
  Falsey,
  GetCodeByAuthorizationCode,
  RemoveCode,
  SaveCode,
  AuthorizationCode,
} from '../../type';
import { AuthorizationCodeModel } from './AuthorizationCodeSchema';


export const getCodeByAuthorizationCode: GetCodeByAuthorizationCode = async (authorizationCode: string): Promise<AuthorizationCode | Falsey> => {
  const codeInstance = await AuthorizationCodeModel.findOne({authorizationCode}).populate('client')
  return codeInstance;
}

export const removeCode: RemoveCode = async (code: AuthorizationCode): Promise<void> => {
  await AuthorizationCodeModel.findOneAndDelete(code)
}

export const saveCode: SaveCode = async (code: AuthorizationCode): Promise<AuthorizationCode> => {
  const codeInstance = new AuthorizationCodeModel(code)
  const result = await codeInstance.save();
  return result
}