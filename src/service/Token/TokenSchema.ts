import {model, Schema} from 'mongoose'
import {RefreshToken, Token} from "oauth2-server";
import {mongoose} from "../../db";

/**
 * token    Object    The token(s) to be saved.
 * token.accessToken    String    The access token to be saved.
 * token.accessTokenExpiresAt    Date    The expiry time of the access token.
 * [token.refreshToken]    String    The refresh token to be saved.
 * [token.refreshTokenExpiresAt]    Date    The expiry time of the refresh token.
 * [token.scope]
 * token.client    Object    The client associated with the access token.
 * token.client.id    String    A unique string identifying the client.
 * token.user    Object    The user associated with the access token.
 */
const TokenSchema = new Schema<Token>({
    accessToken: String,
    accessTokenExpiresAt: Date,
    refreshToken: String,
    refreshTokenExpiresAt: Date,
    scope: String,
    client: {type: Schema.Types.ObjectId, ref: 'Client'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
});

export const TokenModel = mongoose.model<Token>('Token', TokenSchema)

export const RefreshTokenModel = mongoose.model<RefreshToken>('Token', TokenSchema)
