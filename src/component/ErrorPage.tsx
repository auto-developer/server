import React from "react"

export type ErrorProps = {
    title?: string,
    status?: number,
    message?: string
}

const ErrorPage = ({status = 404, title = "404", message = "Page Not Found"}: ErrorProps) => {
    const back = () => history.back()
    return <html lang="zh-cn">
    <head>
        <meta charSet="UTF-8"/>
        <title>{title}</title>
        <link rel="stylesheet" href="/assets/error.css"/>
    </head>
    <body>
    <img src="/assets/decorate.svg" alt="svg"/>
    <div className="message-box">
        <h1>{status}</h1>
        <p>{message}</p>
        <div className="buttons-con">
            <div className="action-link-wrap">
                <a onClick={back} className="link-button link-back-button">返回上一页</a>
                <a href="#" className="link-button">返回首页</a>
            </div>
        </div>
    </div>
    </body>
    </html>
}


export default ErrorPage
