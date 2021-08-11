import {
    AuthorizationCode,
    AuthorizationCodeModel,
    Client, Falsey,
    PasswordModel, RefreshToken,
    RefreshTokenModel,
    Token,
    User
} from "oauth2-server";
import {getClient} from '../Client';
import {getCodeByAuthorizationCode, saveCode} from '../AuthorizationCode';
import {findToken, saveToken, deleteToken, findRefreshToken} from '../Token';
import {getAuthenticationByUsername} from '../Authentication';

export const model: AuthorizationCodeModel | PasswordModel | RefreshTokenModel = {

    /**
     * request authentication
     * @param accessToken
     */
    getAccessToken: findToken,

    /**
     * authorization_code grant
     * @param authorizationCode
     * @returns {Promise<AuthorizationCode>}
     */
    getAuthorizationCode: getCodeByAuthorizationCode,

    /**
     *  authorization_code grant
     *  client_credentials grant
     *  refresh_token grant
     *  password grant
     * @param clientId string
     * @param clientSecret string
     * @returns client {Promise<Client>}
     */
    getClient: getClient,

    /**
     * password grant
     * @param username
     * @param password
     */
    getUser: async (username, password): Promise<User | Falsey> => {
        const authentication = await getAuthenticationByUsername(username, password);
        return authentication && authentication.user;
    },

    /**
     * authorization_code grant
     * client_credentials grant
     * refresh_token grant
     * password grant
     * @param token
     * @param client
     * @param user
     * @returns {Promise<Token>}
     */
    saveToken: async (token, client, user): Promise<Token | Falsey> => {
        return await saveToken({...token, client, user});
    },

    /**
     * authorization_code grant
     * @param code code
     * @param client client
     * @param user user
     * @returns authorizationCode {Promise<AuthorizationCode>}
     */
    saveAuthorizationCode: async (code, client, user): Promise<AuthorizationCode> => {
        const codeModel = await saveCode({...code, user, client});
        return codeModel
    },

    /**
     * authorization_code grant
     * @param code code
     * @returns boolean {Promise<boolean>}
     */
    revokeAuthorizationCode: async (code: AuthorizationCode): Promise<boolean> => {
        return true
    },

    /**
     * request authentication
     * @param token token
     * @param scope scope
     */
    verifyScope: async (token: Token, scope: string | string[]) => {
        return token.scope === scope;
    },

    /**
     * refresh_token
     * @param refreshToken refreshToken
     */
    getRefreshToken: findRefreshToken,

    /**
     * refresh_token
     */
    revokeToken: async (token: RefreshToken | Token): Promise<boolean> => {
        const removeResult = await deleteToken(token.accessToken);
        return removeResult;
    },
}
