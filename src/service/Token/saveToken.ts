import {TokenModel} from "./TokenSchema";
import {Token} from "../../type";

export const saveToken = async (token: Token): Promise<Token> => {
    const tokenInstance = new TokenModel(token);
    const result = await tokenInstance.save();
    return result;
}
