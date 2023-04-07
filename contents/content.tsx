import type { PlasmoCSConfig } from "plasmo"
import React from "react"
import App from "../components/App"

import cssText from "data-text:~style.css"

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

const DEV_URLS: string[] = [
    "http://paulgraham.com/*",
    "http://www.paulgraham.com/*",
    "https://*.substack.com/*",
    "https://www.theverge.com/*",
    "https://www.youtube.com/*",
    "https://www.wsj.com/*",
    "https://www.ycombinator.com/*",
    "https://super-static-assets.s3.amazonaws.com/*",
]

export const config: PlasmoCSConfig = {
    matches: DEV_URLS,
    all_frames: true
}

function Content({}) {
    return (
        <App />
    );
}

export default Content;