import {APP_KEY} from './config';
import Koa from 'koa';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import koaViews from 'koa-views';
import koaStatic from 'koa-static';
import path from 'path'
import router from './router';

const ROOT = process.cwd();

const staticRoot = path.join(ROOT, 'static')
const app = new Koa();
app.keys = [APP_KEY];
app.proxy = true;

app.use(logger());
app.use(koaStatic(staticRoot))
app.use(koaViews(path.resolve(staticRoot)))
app.use(koaBody());
app.use(router.routes());

export default app;
