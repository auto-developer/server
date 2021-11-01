import React from "react"

export type FormErrorMessageProps = {
    message: string
}

const FormErrorMessage = (props: FormErrorMessageProps) => {
    return <div className="error-message">
        {props.message}
        <button className="flash-close js-flash-close" type="button" aria-label="Dismiss this message">
            <img src="/assets/close.svg" alt="close button"/>
        </button>
    </div>
}

export default FormErrorMessage
