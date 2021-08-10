import {Client} from "./Client";
import {User} from "./User";

export type Token = {
    accessToken: string,
    accessTokenExpiresAt: Date,
    refreshToken: string,
    refreshTokenExpiresAt: Date,
    scope: string,
    client: Client,
    user: User
}
