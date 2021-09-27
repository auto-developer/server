import {FindUsers} from "../../type";
import {UserModel} from "./UserSchema";

export const findUsers: FindUsers = async (userFilter, pagination) => {
    const users = await UserModel.find()
        .skip(pagination.page * pagination.size)
        .limit(pagination.size)
        .where(userFilter)
        .lean()
    return users
}
