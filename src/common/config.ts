import * as dotenv from 'dotenv';

dotenv.config();

export const ADMIN_USER_ID = process.env.ADMIN_USER_ID || ''
export const ADMIN_CLIENT_ID = process.env.ADMIN_CLIENT_ID || ''
export const ADMIN_CLIENT_SECRET = process.env.ADMIN_CLIENT_SECRET || ''

export const MYSQL_USERNAME = process.env.MYSQL_USERNAME || 'root';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '123456';
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'test';
export const MYSQL_PORT = Number(process.env.MYSQL_PORT) || 3306;
export const MYSQL_HOST = process.env.MYSQL_HOST || '127.0.0.1';

export const MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1';
export const MONGO_PORT = Number(process.env.MONGO_PORT) || 27017;
export const MONGO_DATABASE = process.env.MONGO_DATABASE || 'test';
export const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`

export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
export const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;

export const SERVICE_PORT = Number(process.env.SERVICE_PORT) || 8080;
export const APP_KEY = process.env.APP_KEY || 'user-server';
