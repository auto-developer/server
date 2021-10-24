import {Context, Next} from "koa";
import {createLogger, format, transports} from 'winston';

export const logger = createLogger({
    defaultMeta: {service: 'user-service'},
    transports: [
        new transports.File({
            filename: 'combined.log',
            format: format.combine(
                format.timestamp(),
                format.splat(),
                format.json(),
            )
        }),
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.splat(),
                format.simple(),
            ),
        }),
    ],
    exitOnError: true,
})

export const loggerMiddleware = async (ctx: Context, next: Next) => {
    logger.info('<= %s %s', ctx.method, ctx.path, {
        ip: ctx.ip,
        url: ctx.url,
        ua: ctx.headers["user-agent"],
        method: ctx.method,
    })
    await next()
    logger.info('=> %d %s %s', ctx.status, ctx.method, ctx.path, {
        ip: ctx.ip,
        url: ctx.url,
        ua: ctx.headers["user-agent"],
        method: ctx.method,
    })
}
