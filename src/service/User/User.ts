import {User} from "oauth2-server";

export enum PLATFORM { 'username' = 'username', 'mobile' = 'mobile', 'email' = 'email', 'wechat' = "wechat", 'qq' = "qq", 'weibo' = "weibo"}

export enum USER_ROLE { 'normal' = 'normal', 'admin' = 'admin'}

export enum GENDER {'male' = 'male', 'female' = 'female'}

export interface UserType extends User {
    avatar: string
}
