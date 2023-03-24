import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

import cssText from "data-text:~style.css"

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

type ChatButtonProps = {
    onClick: () => void
}

function ChatButton({ onClick }: ChatButtonProps) {
    return (
        <button className="rounded-full h-11 w-11 overflow-hidden flex justify-center items-center bg-blue-800 " onClick={onClick}>
            <FontAwesomeIcon className="text-cyan-100 h-7 mt-1" icon={faMessage} />
        </button>
      );
}

export default ChatButton;