import {Context, Next} from "koa";
import {UserType} from "./User";
import {UserModel} from "./UserSchema";
import {Falsey} from "oauth2-server";

export const saveUser = async (user: UserType): Promise<UserType | Falsey> => {
    const userInstance = new UserModel(user);
    const result = await userInstance.save();
    return result.toObject<UserType>()
}

export const findUserById = async (userId: string): Promise<UserType | Falsey> => {
    const user = await UserModel.findById(userId)
    return user?.toObject<UserType>()
}

export const getUsers = async (ctx: Context, next: Next) => {
    ctx.body = []
    await next()
}

