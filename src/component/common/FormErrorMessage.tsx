import React from "react"

export type FormErrorMessageProps = {
    message: string
}

const FormErrorMessage = (props: FormErrorMessageProps) => {
    return <div className="rounded-md px-5 py-4 mb-3.5 error-message border border-red-300 bg-red-50 text-xs">
        {props.message}
        <button className="cursor-pointer float-right p-0.5" type="button" aria-label="Dismiss this message">
            <img src="/assets/close.svg" alt="close button"/>
        </button>
    </div>
}

export default FormErrorMessage
