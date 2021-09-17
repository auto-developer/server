import {ApplicationModel} from "./ApplicationSchema";
import {Application} from "./Application";
import {Falsey} from "oauth2-server";

export const findApplicationByUserAndClient = async (userId: string, clientId: string): Promise<Application | Falsey> => {
    return null
}

export const saveApplication = async (application: Application) => {
    console.log(application)
    const instance = new ApplicationModel(application)
    const result = await instance.save();
    return result.toObject();
}
