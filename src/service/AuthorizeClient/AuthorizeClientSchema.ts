import {Schema} from 'mongoose'
import {mongoose} from "../../common/db";
import {AuthorizeClient} from "./AuthorizeClient";

const AuthorizeClientSchema = new Schema<AuthorizeClient>({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    client: {type: Schema.Types.ObjectId, ref: 'Client'}
}, {toObject: {virtuals: true}})

export const AuthorizeClientModel = mongoose.model<AuthorizeClient>('AuthorizeClient', AuthorizeClientSchema)
