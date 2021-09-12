import {Context, Next} from "koa";
import {Falsey, User} from "oauth2-server";
import {UserModel} from "./UserSchema";
import {PaginationQuery} from "../../type";
import {UserType} from "./User";

export const addUser = async (user: UserType): Promise<UserType> => {
    const userInstance = new UserModel(user);
    const result = await userInstance.save();
    return result.toObject<UserType>()
}

export const findUsers = async (userFilter: Partial<User>, pagination: PaginationQuery): Promise<User[]> => {
    const users = await UserModel.find()
        .skip(pagination.page * pagination.size)
        .limit(pagination.size)
        .where(userFilter)
        .lean()
    return users
}

export const findUserById = async (uid: string): Promise<User | Falsey> => {
    const user = await UserModel.findById(uid)
    return user
}

export const getUsers = async (ctx: Context, next: Next) => {
    const {page, size} = ctx.request.query
    const userFilter = ctx.request.query
    const pagination = {page: Number(page), size: Number(size)}
    const users = await findUsers(userFilter, pagination)
    ctx.body = {
        data: users,
        pagination: {
            page: page,
            size: size,
            total: 0
        }
    }
    await next()
}

export const postUser = async (ctx: Context, next: Next) => {
    const userParam = ctx.request.body
    const userInstance = await addUser(userParam)
    ctx.status = 201
    ctx.body = userInstance
}
