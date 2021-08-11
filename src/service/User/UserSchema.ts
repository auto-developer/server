import {model, Schema} from 'mongoose'
import {User} from "oauth2-server";
import {GENDER, PLATFORM, USER_ROLE} from "./User";
import {mongoose} from "../../db";

/**
 * UserSchema 用户基础信息
 * @param definition.username 用户账号，必须唯一
 * @param definition.nickname 用户昵称
 * @param definition.registerSource 注册来源
 * @param definition.gender 用户性别 female/male
 * @param definition.face 用户头像
 * @param definition.userRole 用户身份
 * @param definition.email 邮箱（唯一）
 * @param definition.emailBindTime 邮箱绑定时间
 * @param definition.mobile 用户手机号码（唯一）
 * @param definition.mobileBindTime 手机号码绑定时间
 */
const UserSchema = new Schema<User>({
    username: {type: String, required: true, unique: true},
    nickname: {type: String, required: true, default: '二狗子'},
    registerSource: {
        type: String,
        required: true,
        immutable: true,
        enum: [PLATFORM.username, PLATFORM.wechat, PLATFORM.qq, PLATFORM.weibo]
    },
    gender: {type: String, default: GENDER.male, enum: [GENDER.male, GENDER.female]},
    face: {type: String},
    signature: {type: String},
    userRole: {type: String, default: USER_ROLE.normal, enum: [USER_ROLE.normal, USER_ROLE.admin]},
    email: {type: String, unique: true},
    emailBindTime: {type: Date},
    mobile: {type: String, unique: true},
    mobileBindTime: {type: Date},
}, {toObject: {virtuals: true}})


export const UserModel = mongoose.model<User>('User', UserSchema)
