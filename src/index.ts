import app from './app';
import {SERVICE_PORT} from "./config";

app.listen(SERVICE_PORT);
console.log('server listen at', SERVICE_PORT);
