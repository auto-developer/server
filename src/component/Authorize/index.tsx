import React from "react"
import {Client, User} from "../../type";
import ClientInfo from "./ClientInfo";
import AuthorizeForm from "./AuthorizeForm";
import AuthorizeHeader from "./AuthorizeHeader";
import RequireInfo from "./RequireInfo";
import RequireExtendInfo from "./RequireExtendInfo";

export type AuthorizeProps = {
    client: Client,
    user: User,
    redirect_uri: string,
    created_to_now: string,
    client_id: string,
    return_to: string,
}

const Authorize = (props: AuthorizeProps) => {

    return <html lang="en">
    <head>
        <meta charSet="UTF-8"/>
        <title>Authorize application</title>
        <link rel="stylesheet" href="/style.css"/>
        <link rel="stylesheet" href="/Authorize/style.css"/>
    </head>
    <body className="bg-gray-50">
    <main>
        <div className="m-auto" style={{maxWidth: 530}}>
            <AuthorizeHeader clientName={props.client.name}
                             clientLogo={props.client.logo}/>

            <div className="">
                <div className="border border-gray-300 rounded-md bg-white">
                    <div className="border-b border-gray-300 p-4">

                        <RequireInfo clientName={props.client.name}
                                     userAvatar={props.user.avatar}
                                     ownerNickname={props.client.owner.nickname}
                                     ownerUsername={props.client.owner.username}/>

                        <RequireExtendInfo />
                    </div>
                    <AuthorizeForm clientId={props.client_id}
                                   clientName={props.client.name}
                                   returnTo={props.return_to}
                                   redirectUri={props.redirect_uri}/>

                </div>
                <ClientInfo created_to_now={props.created_to_now}/>
                <div className="text-center my-4">
                    <a href="https://docs.github.com/articles/authorizing-oauth-apps" target="_blank"
                       className="Link--muted">Learn more about OAuth</a>
                </div>
            </div>
        </div>
    </main>
    </body>
    </html>
}
export default Authorize
