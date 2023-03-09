import type { PlasmoCSConfig } from "plasmo"
import App from "~components/App"

import cssText from "data-text:~style.css"

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

export const config: PlasmoCSConfig = {
    matches: ["http://paulgraham.com/*"],
    all_frames: true
}

function Content({}) {
    return (
        <App />
    );
}

export default Content;