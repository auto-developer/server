import {Falsey, User} from "oauth2-server";
import {UserModel} from "./UserSchema";
import {PaginationQuery} from "../../type";
import {UserType} from "./User";

export const addUser = async (user: UserType): Promise<UserType> => {
    const userInstance = new UserModel(user);
    const result = await userInstance.save();
    return result.toObject<UserType>()
}

export const findUsers = async (userFilter: Partial<User>, pagination: PaginationQuery): Promise<UserType[]> => {
    const users = await UserModel.find()
        .skip(pagination.page * pagination.size)
        .limit(pagination.size)
        .where(userFilter)
        .lean()
    return users
}

export const findUserById = async (uid: string): Promise<UserType | Falsey> => {
    const user = await UserModel.findById(uid)
    return user?.toObject<UserType>()
}

export const findUserApplicationsById = async (uid: string) : Promise<UserType | Falsey> => {
    const user = await UserModel.findById(uid)
    return user
}
