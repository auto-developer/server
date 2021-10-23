import {POLICY} from "../type";
import {ADMIN_CLIENT_ID} from "./config";

export const policy:POLICY = [{
    name: 'admin',
    clientRule: new RegExp(`^${ADMIN_CLIENT_ID}$`),
    userRule: /^\w+$/
}]
