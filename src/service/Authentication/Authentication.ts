import {User} from "oauth2-server";

export interface Authentication{
    identityType: string;
    identifier: string;
    certificate: string;
    user: User;
}
