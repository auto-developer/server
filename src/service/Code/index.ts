import {
  Falsey,
  FindCodeByAuthorizationCode,
  RemoveCode,
  SaveCode,
  Code,
} from '../../type';
import { CodeModel } from './CodeSchema';


export const findCodeByAuthorizationCode: FindCodeByAuthorizationCode = async (authorizationCode: string): Promise<Code | Falsey> => {
  const codeInstance = await CodeModel.findOne({authorizationCode}).populate('client')
  return codeInstance;
}

export const removeCode: RemoveCode = async (code: Code): Promise<void> => {
  await CodeModel.findOneAndDelete(code)
}

export const saveCode: SaveCode = async (code: Code): Promise<Code> => {
  const codeInstance = new CodeModel(code)
  const result = await codeInstance.save();
  return result
}
