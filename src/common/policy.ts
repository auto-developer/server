import {POLICY} from "../type";
import {ADMIN_CLIENT_ID, ADMIN_USER_ID} from "./config";

export const policy:POLICY = [{
    name: 'admin',
    clientRule: ADMIN_CLIENT_ID,
    userRule: ADMIN_USER_ID
}]
