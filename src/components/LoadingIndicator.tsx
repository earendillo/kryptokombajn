import React from "react";
import './LoadingIndicator.scss'

export function LoadingIndicator(): JSX.Element {
    return <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
}
