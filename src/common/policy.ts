import {POLICY} from "../type";
import {ADMIN_CLIENT_ID, ADMIN_USER_ID} from "./config";

/**
 * The Token policy.
 * name is the api scope name.
 * clientRule and userRule is used as RegExp to check if the requested scope is valid for a particular client/user combination.
 */
export const policy:POLICY = [{
    name: 'admin',
    clientRule: ADMIN_CLIENT_ID,
    userRule: ADMIN_USER_ID
}]
