import React from "react"
import {Client, User} from "../type";
import ClientInfo from "./common/ClientInfo";

export type ApplicationAuthorizeProps = {
    client: Client,
    user: User,
    redirect_uri: string,
    created_to_now: string,
    client_id: string,
    return_to: string,
}

const ApplicationAuthorize = (props: ApplicationAuthorizeProps) => {

    return <html lang="en">
    <head>
        <meta charSet="UTF-8"/>
        <title>Authorize application</title>
        <link rel="stylesheet" href="/assets/application.css"/>
    </head>
    <body>
    <main>
        <div className="mx-auto">
            <div className="mx-up">
                <div className="connect">
                    <div className="d-flex">
                        <div className="logo-left">
                            <img className="CircleBadge-left"
                                 src={props.client.logo}
                                 alt="Application logo"/>
                        </div>
                        <div className="Connection-succeeded">
                            <svg className="Check-sign" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                                <path fill-rule="evenodd"
                                      d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                            </svg>
                        </div>
                        <div className="logo-right">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                                 data-view-component="true"
                                 className="octicon octicon-mark-github width-full height-full">
                                <path fillRule="evenodd"
                                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <h2>Authorize {props.client.name}</h2>
            </div>
            <div className="mx-down">
                <div className="box-user-one">
                    <div className="box-body">
                        <div className="box-body-one">
                            <img src={props.user.avatar}
                                 alt="User avatar"/>
                            <strong>{props.client.name}</strong>
                            by
                            <strong><a href={props.client.owner.username}>{props.client.owner.nickname}</a></strong>
                            <small className="color-text-secondary">wants to access
                                your <strong>13842727496</strong> account</small>
                        </div>
                        <div className="box-body-two">
                            <button type="button" aria-label="More information about this request" aria-expanded="false"
                                    id="btn-0" value="hide">
                                <svg aria-hidden="true" viewBox="0 0 24 24" version="1.1" data-view-component="true"
                                     className="octicon-chevron-down" id="octicon-chevron-down">
                                    <path fill-rule="evenodd"
                                          d="M5.22 8.72a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 00-1.06-1.06L12 14.44 6.28 8.72a.75.75 0 00-1.06 0z"></path>
                                </svg>
                                <svg aria-hidden="true" viewBox="0 0 24 24" version="1.1" data-view-component="true"
                                     className="octicon-chevron-up" id="octicon-chevron-up">
                                    <path fill-rule="evenodd"
                                          d="M18.78 15.28a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 101.06 1.06L12 9.56l5.72 5.72a.75.75 0 001.06 0z"></path>
                                </svg>
                            </button>
                            <svg className="octicon-person" viewBox="0 0 24 24" version="1.1" aria-hidden="true">
                                <path fill-rule="evenodd"
                                      d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z"></path>
                            </svg>
                            <div className="permission-summary">
                                <strong className="permission-title">Personal user data</strong>
                                <small className="access-details">
                                    <span className="full-access">Full access</span>
                                    <span className="limited-access">Follow users, profile information (read-only), email addresses (read-only)</span>
                                    <span className="limited-access-emails-followers">Follow users, email addresses (read-only)</span>
                                    <span className="limited-access-emails-profile">Email addresses (read-only), profile information (read-only)</span>
                                    <span className="limited-access-followers-profile">Follow users, profile information (read-only)</span>
                                    <span className="limited-access-profile">Profile information (read-only)</span>
                                    <span className="limited-access-followers">Follow users</span>
                                    <span className="limited-access-emails">Email addresses (read-only)</span>
                                    <span className="no-access">No access</span>
                                </small>
                            </div>
                            <div className="content" id="content">
                                <div className="permission-help">
                                    <p>This application will be able to read your private email addresses.</p>
                                    <a href="https://docs.github.com/articles/authorizing-oauth-apps/">
                                        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1"
                                             data-view-component="true"
                                             className="octicon-question-mr">
                                            <path fill-rule="evenodd"
                                                  d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zM6.92 6.085c.081-.16.19-.299.34-.398.145-.097.371-.187.74-.187.28 0 .553.087.738.225A.613.613 0 019 6.25c0 .177-.04.264-.077.318a.956.956 0 01-.277.245c-.076.051-.158.1-.258.161l-.007.004a7.728 7.728 0 00-.313.195 2.416 2.416 0 00-.692.661.75.75 0 001.248.832.956.956 0 01.276-.245 6.3 6.3 0 01.26-.16l.006-.004c.093-.057.204-.123.313-.195.222-.149.487-.355.692-.662.214-.32.329-.702.329-1.15 0-.76-.36-1.348-.863-1.725A2.76 2.76 0 008 4c-.631 0-1.155.16-1.572.438-.413.276-.68.638-.849.977a.75.75 0 101.342.67z"></path>
                                        </svg>
                                        Learn more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-footer">
                        <div className="box-footer-data-0">
                            <form action="/application" accept-charset="UTF-8" method="post">
                                <input type="hidden" name="client_id" id="client_id" value={props.client_id}/>
                                <input type="hidden" name="return_to" id="return_to" value={props.return_to}/>
                                <div className="box-footer-flex-center">
                                    <button type="submit" name="authorize" value="0"
                                            className="btn btn-0">Cancel
                                    </button>
                                    <button type="submit" name="authorize" value="1"
                                            className="btn btn-1">Authorize
                                        {props.client.name}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="box-footer-data-1">
                            <p className="p-text">
                                Authorizing will redirect to
                                <br/>
                                <strong className="color-text-primary">{props.redirect_uri}</strong>
                            </p>
                        </div>
                    </div>
                </div>
                <ClientInfo created_to_now={props.created_to_now}/>
                <div className="box-user-three">
                    <a href="https://docs.github.com/articles/authorizing-oauth-apps" target="_blank"
                       className="Link--muted">Learn more about OAuth</a>
                </div>
            </div>
        </div>
    </main>
    </body>
    </html>
}
export default ApplicationAuthorize
