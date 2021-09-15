import {redis} from '../../common/db'
import {v4} from "uuid";

export const getSession = async (sessionId: string): Promise<string> => {
    return await redis.get(sessionId) || ''
}

export const setSession = async (value: string): Promise<string> => {
    const session = v4()
    await redis.set(session, value)
    return session
}
