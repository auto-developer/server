import app from './app';
import {MONGO_URI, SERVICE_PORT} from "./common/config";
import {mongoose} from "./common/db";
import {logger} from "./common/logger";

const databaseConnection = async () => {
    const mongodbConnection = mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    return Promise.all([mongodbConnection])
}

databaseConnection()
    .then(() => {
        app.listen(SERVICE_PORT);
        logger.info(`server listen at ${SERVICE_PORT}`);
    })
    .catch(e => {
        logger.error(e)
    })
