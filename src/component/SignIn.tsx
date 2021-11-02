import React from "react"
import FormErrorMessage from "./common/FormErrorMessage"
import {Client} from "../type";

export type SignInProps = {
    client?: Client,
    return_to: string,
    client_id: string,
    error?: {
        message: string;
    }
}
const SignIn = (props: SignInProps) => <html lang="en">
<head>
    <meta charSet="UTF-8"/>
    <title>Sign In</title>
    <link rel="stylesheet" href="/assets/sign-in.css"/>
    <link rel="stylesheet" href="/style.css"/>
</head>
<body>
<div className="text-center w-full pt-8 pb-6">
    <a href="">
        <svg height="48" aria-hidden="true" viewBox="0 0 16 16" width="48" data-view-component="true"
             className="inline-block">
            <path fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
    </a>
</div>
<main>
    <div className="auth-form px-4">
        <div className="mb-4 text-center text-2xl font-light">
            <h1>Sign in to Github</h1>
        </div>
        <div className="auth-form-body p-5 border-r-4">
            {props.client && <div className="auth-application">
              <div className="logo">
                <img src={props.client.logo} alt="Application logo"/>
              </div>
              <p>Sign in to <strong>{props.client.name}</strong>
                <br/>
                to continue to <strong>GitLab.com</strong>
              </p>
              <hr/>
            </div>}

            {props.error && <FormErrorMessage message={props.error.message}/>}

            <form action="/session" method="post">
                <label htmlFor="identifier">Username or email address</label>
                <input id="identifier" name="identifier" type="text"/>
                <label htmlFor="certificate">Password</label>
                <input id="certificate" name="certificate" type="password"/>
                <input name="return_to" type="hidden" value={props.return_to}/>
                <input name="client_id" type="hidden" value={props.client_id}/>
                <input name="grant_type" type="hidden" value="password"/>
                <input type="submit" value="Sign in"/>
            </form>
        </div>
        <p>
            New to Github? <a href="/sign-up">Create an account</a>.
        </p>
    </div>
</main>

</body>
</html>

export default SignIn
