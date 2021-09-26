import {User} from "../../type";
import {Falsey} from "oauth2-server";
import {UserModel} from "./UserSchema";

export const findUserById = async (uid: string): Promise<User | Falsey> => {
    const user = await UserModel.findById(uid)
    return user?.toObject<User>()
}
