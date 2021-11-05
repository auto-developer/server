import React from "react"

export type ClientInfoProps = {
    created_to_now: string;

}
const ClientInfo = (props: ClientInfoProps) => {
    return <div className="box-user-two">
        <div className="gutter-condensed">
            <div className="col-md-left mb-md-0">
                <div className="pl-6">
                    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1"
                         data-view-component="true">
                        <path fill-rule="evenodd"
                              d="M1.5 8a6.5 6.5 0 0110.535-5.096l-9.131 9.131A6.472 6.472 0 011.5 8zm2.465 5.096a6.5 6.5 0 009.131-9.131l-9.131 9.131zM8 0a8 8 0 100 16A8 8 0 008 0z"></path>
                    </svg>
                    <strong>Not</strong> owned or operated by GitHub
                </div>
            </div>
            <div className="col-md-left mb-md-0">
                <div className="pl-6">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                         data-view-component="true" className="octicon octicon-clock left-0 position-absolute">
                        <path fill-rule="evenodd"
                              d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.5 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.471.696l2.5 1a.75.75 0 00.557-1.392L8.5 7.742V4.75z"></path>
                    </svg>
                    Created <strong className="inline-block">{props.created_to_now} years ago</strong></div>
            </div>
            <div className="col-md-left">
                <div className="pl-6">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                         data-view-component="true"
                         className="octicon octicon-organization left-0 position-absolute">
                        <path fill-rule="evenodd"
                              d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"></path>
                    </svg>
                    <strong>More than 1K</strong> <span className="inline-block">GitHub users</span></div>
            </div>
        </div>
    </div>

}

export default ClientInfo
