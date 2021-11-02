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
        <link rel="stylesheet" href="/style.css"/>
    </head>
    <body className="bg-gray-700">
    <div className="m-auto max-w-7xl flex justify-around items-center text-white top-1/2 relative -mt-60">
        <img src="/assets/decorate.svg"
             className="flex-shrink"
             alt="svg"/>
        <div className="mr-20">
            <h1 className="text-6xl mb-6">{status}</h1>
            <p>{message}</p>
            <div className="mt-10 text-sm">
                <a onClick={back}
                   className="cursor-pointer rounded-md px-6 py-2 bg-green-400 font-bold mr-2.5">返回上一页</a>
                <a href="#" className="cursor-pointer rounded-md px-6 py-2 bg-green-400 font-bold">返回首页</a>
            </div>
        </div>
    </div>
    </body>
    </html>
}


export default ErrorPage
