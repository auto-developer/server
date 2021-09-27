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

export type Falsey = undefined | null

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

export interface AuthorizationCode extends AuthorizationCodeType {
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
