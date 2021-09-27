import {FindUserById, User} from "../../type";
import {UserModel} from "./UserSchema";

export const findUserById: FindUserById = async (uid) => {
    const user = await UserModel.findById(uid)
    return user?.toObject<User>()
}
