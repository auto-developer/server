import OAuth2Server, {
    AuthorizationCode,
    AuthorizationCodeModel,
    Client,
    ClientCredentialsModel,
    Falsey,
    PasswordModel,
    RefreshToken,
    RefreshTokenModel,
    Token,
    User
} from "oauth2-server";
import {findClientByClientIdClientSecret} from '../service/Client';
import {findCodeByAuthorizationCode, insertCode, removeCode} from '../service/Code';
import {findRefreshToken, findTokenByAccessToken, insertToken, removeToken} from '../service/Token';
import {findAuthenticationByIdentifier} from '../service/Authentication';
import {policy} from "./policy";

const model: AuthorizationCodeModel | PasswordModel | RefreshTokenModel | ClientCredentialsModel = {

    /**
     * request authentication
     * @param accessToken
     */
    getAccessToken: findTokenByAccessToken,

    /**
     * authorization_code grant
     * @param authorizationCode
     * @returns {Promise<AuthorizationCode>}
     */
    getAuthorizationCode: findCodeByAuthorizationCode,

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
        return await insertToken({...token, client, user});
    },

    /**
     * authorization_code grant
     * @param code code
     * @param client client
     * @param user user
     * @returns authorizationCode {Promise<AuthorizationCode>}
     */
    saveAuthorizationCode: async (code, client, user): Promise<AuthorizationCode> => {
        const codeModel = await insertCode({...code, user, client});
        return codeModel
    },

    /**
     * authorization_code grant
     * @param code code
     * @returns boolean {Promise<boolean>}
     */
    revokeAuthorizationCode: async (code: AuthorizationCode): Promise<boolean> => {
        return removeCode(code)
    },

    /**
     * Invoked to check if the requested scope is valid for a particular client/user combination.
     * @param user
     * @param client
     * @param scope
     */
    validateScope: async (user: User, client: Client, scope: string | string[]): Promise<string | string[] | Falsey> => {
        const validScope = policy
            .filter(s => scope.includes(s.name))
            .filter(s => new RegExp(`^${s.clientRule}`).test(client.id))
            .filter(s => new RegExp(`^${s.userRule}`).test(user.id))
            .map(s => s.name)
        return validScope.length > 0 && validScope
    },

    /**
     * request authentication
     * @param token token
     * @param scope scope
     */
    verifyScope: async (token: Token, scope: string | string[]): Promise<boolean> => {
        if (!token.scope || !Array.isArray(scope) || !Array.isArray(token.scope)) {
            return false
        }
        return scope.every(s => token.scope?.includes(s));
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
        const removeResult = await removeToken(token.accessToken);
        return removeResult;
    },
    getUserFromClient: async(client: Client): Promise<User | Falsey> => {
        return client.owner
    }
}

export const server = new OAuth2Server({model})

