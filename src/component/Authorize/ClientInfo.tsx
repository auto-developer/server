import React from "react"

export type ClientInfoProps = {
    created_to_now: string;

}
const ClientInfo = (props: ClientInfoProps) => {
    return <div className="border border-gray-300 rounded-md px-6 py-4 flex text-xs mt-4">
        <div className="px-2 flex-1">
            <div className="relative pl-6">
                <img src="/assets/forbidden.svg"
                     className="absolute w-4 left-0"
                     alt=""/>
                <strong className="font-semibold">Not</strong> owned or operated by GitHub
            </div>
        </div>
        <div className="px-2 flex-1">
            <div className="relative pl-6">
                <img src="/assets/clock.svg"
                     className="absolute w-4 left-0"
                     alt=""/>
                Created <strong className="inline-block font-semibold">{props.created_to_now} years ago</strong>
            </div>
        </div>
        <div className="px-2 flex-1">
            <div className="relative pl-6">
                <img src="/assets/building.svg"
                     className="absolute w-4 left-0"
                     alt=""/>
                <strong className="font-semibold">More than 1K</strong> <span className="inline-block">GitHub users</span>
            </div>
        </div>
    </div>

}

export default ClientInfo
