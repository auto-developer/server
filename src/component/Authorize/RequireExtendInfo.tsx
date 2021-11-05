import React from "react";

export type RequireExtendInfoProps = {

}

const RequireExtendInfo = (props: RequireExtendInfoProps) => <div className="pl-12 relative">
    <button type="button" aria-label="More information about this request" aria-expanded="false"
            id="btn-0" value="hide">
        <svg aria-hidden="true" viewBox="0 0 24 24" version="1.1"
             className="" id="octicon-chevron-down">
            <path fill-rule="evenodd"
                  d="M5.22 8.72a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 00-1.06-1.06L12 14.44 6.28 8.72a.75.75 0 00-1.06 0z"></path>
        </svg>
        <svg aria-hidden="true" viewBox="0 0 24 24" version="1.1" data-view-component="true"
             className="" id="octicon-chevron-up">
            <path fill-rule="evenodd"
                  d="M18.78 15.28a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 101.06 1.06L12 9.56l5.72 5.72a.75.75 0 001.06 0z"></path>
        </svg>
    </button>
    <svg className="w-8 h-8 absolute left-0" viewBox="0 0 24 24" version="1.1" aria-hidden="true">
        <path fill-rule="evenodd"
              d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z"></path>
    </svg>
    <div className="permission-summary">
        <strong className="block">Personal user data</strong>
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
                     className="h-4 w-4 inline">
                    <path fill-rule="evenodd"
                          d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zM6.92 6.085c.081-.16.19-.299.34-.398.145-.097.371-.187.74-.187.28 0 .553.087.738.225A.613.613 0 019 6.25c0 .177-.04.264-.077.318a.956.956 0 01-.277.245c-.076.051-.158.1-.258.161l-.007.004a7.728 7.728 0 00-.313.195 2.416 2.416 0 00-.692.661.75.75 0 001.248.832.956.956 0 01.276-.245 6.3 6.3 0 01.26-.16l.006-.004c.093-.057.204-.123.313-.195.222-.149.487-.355.692-.662.214-.32.329-.702.329-1.15 0-.76-.36-1.348-.863-1.725A2.76 2.76 0 008 4c-.631 0-1.155.16-1.572.438-.413.276-.68.638-.849.977a.75.75 0 101.342.67z"></path>
                </svg>
                Learn more</a>
        </div>
    </div>
</div>

export default RequireExtendInfo
