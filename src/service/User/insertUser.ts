import {InsertUser, User} from "../../type";
import {UserModel} from "./UserSchema";

export const insertUser:InsertUser = async (user: User): Promise<User> => {
    const userInstance = new UserModel(user);
    const result = await userInstance.save();
    return result.toObject<User>()
}
