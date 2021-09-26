import {PaginationQuery, User} from "../../type";
import {UserModel} from "./UserSchema";

export const findUsers = async (userFilter: Partial<User>, pagination: PaginationQuery): Promise<User[]> => {
    const users = await UserModel.find()
        .skip(pagination.page * pagination.size)
        .limit(pagination.size)
        .where(userFilter)
        .lean()
    return users
}
