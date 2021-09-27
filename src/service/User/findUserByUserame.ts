import {Falsey, FindUserByUsername, User} from "../../type";
import {UserModel} from "./UserSchema";

export const findUserByUsername:FindUserByUsername = async (username: string): Promise<User | Falsey> => {
    const user = await UserModel.findOne({
        username
    })
    return user?.toObject<User>()
}
