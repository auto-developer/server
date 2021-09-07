import {Mongoose} from 'mongoose'
import {Sequelize} from 'sequelize';
import Redis from 'ioredis'
import fs from 'fs';
import {MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USERNAME} from '../config';
import {logger} from "./logger";

logger.info(`MYSQL_PORT:${MYSQL_PORT}`)
logger.info(`MYSQL_USERNAME:${MYSQL_USERNAME}`)
logger.info(`MYSQL_PASSWORD:${MYSQL_PASSWORD}`)
logger.info(`MYSQL_HOST:${MYSQL_HOST}`)
logger.info(`MYSQL_DATABASE:${MYSQL_DATABASE}`)

const logStream = fs.createWriteStream('./sql.log', {'flags': 'a'});

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
    logging: msg => logStream.write(msg + '\n'),
});

export const mongoose = new Mongoose()

export const redis = new Redis()
