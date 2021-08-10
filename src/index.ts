import app from './app';
import {MONGO_URI, SERVICE_PORT} from "./config";
import {mongoose} from "./db";

const databaseConnection = async () => {
    const mongodbConnection = mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    return Promise.all([mongodbConnection])
}

databaseConnection()
    .then(() => {
        app.listen(SERVICE_PORT);
        console.log('server listen at', SERVICE_PORT);
    })
