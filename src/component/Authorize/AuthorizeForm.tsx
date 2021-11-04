import React from "react";

export type AuthorizeFormProps = {
    clientId: string;
    returnTo: string;
    redirectUri: string;
    clientName: string;
}

const AuthorizeForm = (props: AuthorizeFormProps) => <div className="box-footer">
    <div className="box-footer-data-0">
        <form action="/application" accept-charset="UTF-8" method="post">
            <input type="hidden" name="client_id" id="client_id" value={props.clientId}/>
            <input type="hidden" name="return_to" id="return_to" value={props.returnTo}/>
            <div className="box-footer-flex-center">
                <button type="submit" name="authorize" value="0"
                        className="btn btn-0">Cancel
                </button>
                <button type="submit" name="authorize" value="1"
                        className="btn btn-1">Authorize {props.clientName}
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
