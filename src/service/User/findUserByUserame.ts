import {User} from "../../type";
import {Falsey} from "oauth2-server";
import {UserModel} from "./UserSchema";

export const findUserByUsername = async (username: string): Promise<User | Falsey> => {
    const user = await UserModel.findOne({
        username
    })
    return user?.toObject<User>()
}
