import OAuth2Server, {
    AuthorizationCode,
    AuthorizationCodeModel,
    Client,
    Falsey,
    PasswordModel,
    RefreshToken,
    RefreshTokenModel,
    Token,
    User
} from "oauth2-server";
import {findClientByClientIdClientSecret} from '../service/Client';
import {getCodeByAuthorizationCode, saveCode} from '../service/AuthorizationCode';
import {deleteToken, findRefreshToken, findToken, saveToken} from '../service/Token';
import {findAuthenticationByIdentifier} from '../service/Authentication';

const model: AuthorizationCodeModel | PasswordModel | RefreshTokenModel = {

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
     *  @param clientId string
     *  @param clientSecret string
     *  @returns client {Promise<Client|Falsy>}
     */
    getClient: findClientByClientIdClientSecret,

    /**
     * password grant
     * @param username
     * @param password
     */
    getUser: async (username, password): Promise<User | Falsey> => {
        const authentication = await findAuthenticationByIdentifier(username, password);
        return authentication && authentication.user;
    },

    /**
     * authorization_code grant
     * client_credentials grant
     * refresh_token grant
     * password grant
     * @param token string
     * @param client user
     * @param user user
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

    validateScope: async (user: User, client: Client, scope: string | string[]): Promise<string | string[] | Falsey> => {
        console.log('user, client,scope')
        console.log(user, client, scope)
        return scope
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

export const server = new OAuth2Server({model})

