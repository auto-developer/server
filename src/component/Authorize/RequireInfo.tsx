import React from "react";

export type RequireInfoProps = {
    userAvatar: string;
    clientName: string;
    ownerUsername: string;
    ownerNickname: string;
}
const RequireInfo = (props: RequireInfoProps) => <div className="box-body-one">
    <img src={props.userAvatar}
         alt="User avatar"/>
    <strong>{props.clientName}</strong>
    by
    <strong><a href={props.ownerUsername}>{props.ownerNickname}</a></strong>
    <small className="color-text-secondary">wants to access
        your <strong>13842727496</strong> account</small>
</div>

export default RequireInfo
