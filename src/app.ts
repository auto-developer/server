import {APP_KEY} from './common/config';
import Koa from 'koa';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import path from 'path'
import router from './router';
import {pageErrorHandler} from "./router/handler";
import {loggerMiddleware} from "./common/logger";

const ROOT = process.cwd();

const staticRoot = path.join(ROOT, 'static')
const app = new Koa();
app.keys = [APP_KEY];
app.proxy = true;

app.use(loggerMiddleware);
app.use(koaStatic(staticRoot))
app.use(koaBody({multipart: true}));
app.use(pageErrorHandler)
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
