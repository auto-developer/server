import {TokenModel} from "./TokenSchema";
import {Token} from "../../type";

export const removeToken = async (token: Token): Promise<boolean> => {
    const tokenInstance = await TokenModel.findOneAndDelete(token);
    return !!tokenInstance
}
