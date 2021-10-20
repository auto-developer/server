import {
  Falsey,
  FindCodeByAuthorizationCode,
  RemoveCode,
  Code, InsertCode,
} from '../../type';
import { CodeModel } from './CodeSchema';


export const findCodeByAuthorizationCode: FindCodeByAuthorizationCode = async (authorizationCode: string): Promise<Code | Falsey> => {
  const codeInstance = await CodeModel.findOne({authorizationCode}).populate('client')
  return codeInstance;
}

export const removeCode: RemoveCode = async (code: Code): Promise<boolean> => {
  const codeInstance = await CodeModel.findByIdAndDelete(code.id)
  return !!codeInstance
}

export const insertCode: InsertCode = async (code: Code): Promise<Code> => {
  const codeInstance = new CodeModel(code)
  const result = await codeInstance.save();
  return result
}
