import React from "react";

export type AuthorizeFormProps = {
    clientId: string;
    returnTo: string;
    redirectUri: string;
    clientName: string;
}

const AuthorizeForm = (props: AuthorizeFormProps) => <div className="p-6">
    <div className="box-footer-data-0">
        <form action="/application" accept-charset="UTF-8" method="post">
            <input type="hidden" name="client_id" id="client_id" value={props.clientId}/>
            <input type="hidden" name="return_to" id="return_to" value={props.returnTo}/>
            <div className="flex text-sm font-medium">
                <button type="submit" name="authorize"
                        value="0"
                        className="block leading-6 w-full border border-gray-300 rounded-md px-4 py-1 bg-gray-50 mr-2">Cancel
                </button>
                <button type="submit" name="authorize" value="1"
                        className="block leading-6 w-full border border-gray-300 rounded-md px-4 py-1 bg-primary text-white">Authorize {props.clientName}
                </button>
            </div>
        </form>
    </div>
    <div className="box-footer-data-1">
        <p className="p-text">
            Authorizing will redirect to
            <br/>
            <strong className="color-text-primary">{props.redirectUri}</strong>
        </p>
    </div>
</div>

export default AuthorizeForm
