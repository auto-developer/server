import {Schema} from 'mongoose'
import {mongoose} from "../../common/db";
import {Code} from "../../type";

/**
 * code	Object	The return value.
 * code.code	String	The authorization code passed to getAuthorizationCode().
 * code.expiresAt	Date	The expiry time of the authorization code.
 * [code.redirectUri]	String	The redirect URI of the authorization code.
 * [code.scope]	String	The authorized scope of the authorization code.
 * code.client	Object	The client associated with the authorization code.
 * code.client.id    String    A unique string identifying the client.
 * code.user    Object    The user associated with the authorization code.
 */
const CodeSchema = new Schema<Code>({
    authorizationCode: String,
    expiresAt: Date,
    redirectUri: String,
    scope: [String],
    client: {type: Schema.Types.ObjectId, ref: 'Client'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {toObject: {virtuals: true}});

export const CodeModel = mongoose.model<Code>('Code', CodeSchema)
