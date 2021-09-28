import {
    Falsey,
    FindAuthenticationByIdentifier,
    InsertAuthentication,
    Authentication
} from '../../type';
import {AuthenticationModel} from './AuthenticationSchema';

export const findAuthenticationByIdentifier: FindAuthenticationByIdentifier = async (username: string, password: string): Promise<Authentication | Falsey> => {
    const instance = await AuthenticationModel.findOne({
        identityType: 'username',
        identifier: username,
        certificate: password
    }).populate('user');
    return instance?.toObject();
}

export const insertAuthentication: InsertAuthentication = async (authentication: Authentication): Promise<Authentication> => {
    const instance = new AuthenticationModel(authentication);
    const result = await instance.save();
    return result.toObject()
}

