import {TokenModel} from "./TokenSchema";
import {Falsey, Token} from "../../type";

export const findToken = async (accessToken: string): Promise<Token | Falsey> => {
    const tokenInstance = await TokenModel.findOne({accessToken}).populate('user')
    return tokenInstance;
}
