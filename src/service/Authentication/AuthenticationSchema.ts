import {Schema} from 'mongoose'
import {mongoose} from "../../db";
import {PLATFORM} from "../User/User";
import {AuthenticationType} from "./Authentication";

/**
 * authentication.identityType  认证方式
 * authentication.identifier    认证用户名
 * authentication.certificate   认证密钥
 */
const AuthenticationSchema = new Schema<AuthenticationType>({
    identityType: {type: String, default: PLATFORM.mobile, enum: [PLATFORM.username]},
    identifier: String,
    certificate: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {toObject: {virtuals: true}})

export const AuthenticationModel = mongoose.model<AuthenticationType>('Authentication', AuthenticationSchema)
