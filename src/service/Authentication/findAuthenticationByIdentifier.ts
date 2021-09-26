import {Authentication, Falsey} from "../../type";
import {AuthenticationModel} from "./AuthenticationSchema";

export const findAuthenticationByIdentifier = async (username: string, password: string): Promise<Authentication | Falsey> => {
    const instance = await AuthenticationModel.findOne({
        identityType: 'username',
        identifier: username,
        certificate: password
    }).populate('user');
    return instance?.toObject();
}
