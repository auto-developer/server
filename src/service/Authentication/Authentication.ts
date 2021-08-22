import {User} from "oauth2-server";

export interface AuthenticationType{
    identityType: string;
    identifier: string;
    certificate: string;
    user: User;
}

