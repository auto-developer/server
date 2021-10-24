import {Mongoose} from 'mongoose'
import {Sequelize} from 'sequelize';
import Redis from 'ioredis'

import {
    MYSQL_DATABASE,
    MYSQL_HOST,
    MYSQL_PASSWORD,
    MYSQL_PORT,
    MYSQL_USERNAME,
    REDIS_HOST,
    REDIS_PORT
} from './config';
import {logger} from "./logger";

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    define: {
        freezeTableName: true,
    },
    logging: logger.info,
});

export const mongoose = new Mongoose()

export const redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST
})
