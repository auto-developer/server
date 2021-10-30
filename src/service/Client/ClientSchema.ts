import {Schema} from "mongoose";
import {mongoose} from '../../common/db'
import {Client} from "../../type";

/**
 * client    Object    The return value.
 * client.id    String    A unique string identifying the client.
 * [client.redirectUris]    Array<String>    Redirect URIs allowed for the client. Required for the authorization_code grant.
 * client.grants    Array<String>    Grant types allowed for the client.
 * [client.accessTokenLifetime]    Number    Client-specific lifetime of generated access tokens in seconds.
 * [client.refreshTokenLifetime]    Number    Client-specific lifetime of generated refresh tokens in seconds.
 */
const ClientSchema = new Schema<Client>({
    clientSecret: {type: String, required: 'client secret is required'},
    redirectUris: [String],
    grants: [String],
    accessTokenLifetime: Number,
    refreshTokenLifetime: Number,
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: 'owner is required'},
}, {toObject: {virtuals: true}, timestamps: true});

export const ClientModel = mongoose.model<Client>('Client', ClientSchema);
