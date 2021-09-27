import {Falsey, UpdateUserById, User} from "../../type";
import {UserModel} from "./UserSchema";

export const updateUserById:UpdateUserById = async (uid: string, user: User): Promise<User | Falsey> => {
    const userInstance = await UserModel.findByIdAndUpdate(uid, user);
    return userInstance?.toObject<User>()
}
