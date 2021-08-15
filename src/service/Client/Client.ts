import {Client} from "oauth2-server";

export interface ClientType extends Client {
    logo: string;
    description: string;
    name: string;
}
