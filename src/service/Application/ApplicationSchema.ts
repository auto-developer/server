import {Schema} from 'mongoose'
import {mongoose} from "../../common/db";
import {Application} from "./Application";

const ApplicationSchema = new Schema<Application>({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    client: {type: Schema.Types.ObjectId, ref: 'Client'}
}, {toObject: {virtuals: true}})

export const ApplicationModel = mongoose.model<Application>('Application', ApplicationSchema)
