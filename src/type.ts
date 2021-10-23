import {
    AuthorizationCode as AuthorizationCodeType,
    Client as ClientType,
    RefreshToken as RefreshTokenType,
    Token as TokenType,
    User as UserType
} from "oauth2-server";

export type PaginationQuery = {
    page: number;
    size: number;
}

export type Falsey = undefined | null | '' | false

export enum PLATFORM {
    'username' = 'username',
    'mobile' = 'mobile',
    'email' = 'email',
    'wechat' = "wechat",
    'qq' = "qq",
    'weibo' = "weibo"
}

export enum USER_ROLE { 'normal' = 'normal', 'admin' = 'admin'}

export enum GENDER {'male' = 'male', 'female' = 'female'}

export type POLICY_RULE = {
    name: string,
    clientRule: RegExp,
    userRule: RegExp
}

export type POLICY = POLICY_RULE[]

export interface Client extends ClientType {
    logo: string;
    description: string;
    name: string;
}

export interface User extends UserType {
    avatar: string;
    applications: Client;
    registerSource: PLATFORM;
}

export interface Authentication {
    identityType: string;
    identifier: string;
    certificate: string;
    user: User;
}

export interface Code extends AuthorizationCodeType {
}

export interface RefreshToken extends RefreshTokenType {
}

export interface Token extends TokenType {

}

/**
 * service User
 */
export type FindUsers = (userFilter: Partial<User>, pagination: PaginationQuery) => Promise<User[]>
export type FindUserById = (uid: string) => Promise<User | Falsey>
export type FindUserByUsername = (username: string) => Promise<User | Falsey>
export type InsertUser = (user: User) => Promise<User>
export type UpdateUserById = (uid: string, user: User) => Promise<User | Falsey>

/**
 * service Client
 */
export type FindClientByClientIdClientSecret = (clientId: string, clientSecret: string) => Promise<Client | Falsey>
export type FindClientById = (clientId: string) => Promise<Client | Falsey>
export type FindClients = (clientFilter: Partial<Client>, pagination: PaginationQuery) => Promise<Client[]>
export type InsertClient = (client: Client) => Promise<Client>

/**
 * service AuthorizationCode
 */
export type FindCodeByAuthorizationCode = (authorizationCode: string) => Promise<Code | Falsey>
export type InsertCode = (code: Code) => Promise<Code>
export type RemoveCode = (code: Code) => Promise<boolean>

/**
 * service Authentication
 */
export type FindAuthenticationByIdentifier = (username: string, password: string) => Promise<Authentication | Falsey>
export type InsertAuthentication = (authentication: Authentication) => Promise<Authentication>

/**
 * service Token
 */
export type FindRefreshToken = (refreshToken: string) => Promise<RefreshToken | Falsey>
export type FindTokenByAccessToken = (accessToken: string) => Promise<Token | Falsey>
export type InsertToken = (token: Token) => Promise<Token>
export type RemoveToken = (token: Token) => Promise<boolean>
