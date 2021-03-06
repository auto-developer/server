import {Schema} from 'mongoose'
import {mongoose} from "../../common/db";
import {Authentication, PLATFORM} from "../../type";

/**
 * authentication.identityType  认证方式
 * authentication.identifier    认证用户名
 * authentication.certificate   认证密钥
 */
const AuthenticationSchema = new Schema<Authentication>({
    identityType: {type: String, default: PLATFORM.mobile, enum: [PLATFORM.username]},
    identifier: String,
    certificate: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {toObject: {virtuals: true}, timestamps: true})

export const AuthenticationModel = mongoose.model<Authentication>('Authentication', AuthenticationSchema)
