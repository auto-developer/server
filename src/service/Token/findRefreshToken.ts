import {RefreshTokenModel} from "./TokenSchema";
import {Falsey, RefreshToken} from "../../type";

export const findRefreshToken = async (refreshToken: string): Promise<RefreshToken | Falsey> => {
    const tokenInstance = await RefreshTokenModel.findOne({refreshToken})
        .populate('client')
    return tokenInstance;
}
