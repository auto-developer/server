import {APP_KEY} from './config';
import Koa from 'koa';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import koaViews from 'koa-views';
import koaStatic from 'koa-static';
import path from 'path'
import router from './router';
import {pageErrorHandler} from "./router/handler";

const ROOT = process.cwd();

const staticRoot = path.join(ROOT, 'static')
const viewRoot = path.join(ROOT, 'static')
const app = new Koa();
app.keys = [APP_KEY];
app.proxy = true;

app.use(logger());
app.use(koaStatic(staticRoot))
app.use(koaViews(viewRoot, {map: {html: 'handlebars'}}))
app.use(koaBody({multipart: true}));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(pageErrorHandler)

export default app;
