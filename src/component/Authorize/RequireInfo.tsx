import React from "react";

export type RequireInfoProps = {
    userAvatar: string;
    clientName: string;
    ownerUsername: string;
    ownerNickname: string;
}
const RequireInfo = (props: RequireInfoProps) => <div className="pl-12 mb-2 relative">
    <img src={props.userAvatar}
         className="absolute rounded-full w-8 h-8 bg-white inline-block flex-shrink-0 leading-none mr-4 mt-1 top-0 left-0"
         alt="User avatar"/>
    <strong className="block">{props.clientName}</strong>
    <span> by </span>
    <strong><a href={props.ownerUsername}>{props.ownerNickname}</a></strong>
    <small className="">wants to access
        your <strong>13842727496</strong> account</small>
</div>

export default RequireInfo
