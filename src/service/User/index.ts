import {
    Falsey,
    FindUserById,
    FindUserByUsername,
    FindUsers,
    InsertUser,
    PaginationQuery,
    UpdateUserById,
    User
} from "../../type";
import {UserModel} from "./UserSchema";
import * as mongoose from "mongoose";

export const findUsers: FindUsers = async (userFilter: Partial<User>, pagination: PaginationQuery): Promise<User[]> => {
    const users = await UserModel.find()
        .skip(pagination.page * pagination.size)
        .limit(pagination.size)
        .where(userFilter)
        .lean()
    return users
}

export const findUserByUsername: FindUserByUsername = async (username: string): Promise<User | Falsey> => {
    const user = await UserModel.findOne({
        username
    })
    return user?.toObject<User>()
}

export const findUserById: FindUserById = async (uid): Promise<User | Falsey> => {
    const userInstance = await UserModel.findById(uid)
    const user = userInstance?.toObject<User>()
    if (user) {
        user.applications = user.applications.map((cid: mongoose.ObjectId) => cid.toString())
    }
    return user
}

export const insertUser: InsertUser = async (user: User): Promise<User> => {
    const userInstance = new UserModel(user);
    const result = await userInstance.save();
    return result.toObject<User>()
}

export const updateUserById: UpdateUserById = async (uid: string, user: User): Promise<User | Falsey> => {
    const userInstance = await UserModel.findByIdAndUpdate(uid, user);
    return userInstance?.toObject<User>()
}
