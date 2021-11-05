import React from "react"

export type AuthorizeHeaderProps = {
    clientLogo: string;
    clientName: string;
}
const AuthorizeHeader = (props: AuthorizeHeaderProps) => <div className="px-4 pt-6">
    <div className="AuthorizeHeader m-auto flex justify-between items-center">
        <div className="w-24 h-24 relative bg-white rounded-full flex justify-center items-center">
            <img className="w-12 h-12"
                 src={props.clientLogo}
                 alt="Application logo"/>
        </div>
        <div className="w-8 h-8 bg-primary rounded-full text-white relative">
            <svg className="fill-current" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
            </svg>
        </div>
        <div className="w-24 h-24 relative bg-white rounded-full">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                 data-view-component="true"
                 className="w-full h-full">
                <path fillRule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
        </div>
    </div>
    <h2 className="text-2xl text-center mt-6 mb-6 font-normal">Authorize {props.clientName}</h2>
</div>

export default AuthorizeHeader
