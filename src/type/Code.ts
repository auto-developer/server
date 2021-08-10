export type Code = {
    clientSecret: string,
    redirectUris: string[],
    grants: string[],
    accessTokenLifetime: number,
    refreshTokenLifetime: number
}
