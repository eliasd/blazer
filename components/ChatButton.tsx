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
        <button className="rounded-full h-[44px] w-[44px] overflow-hidden flex justify-center items-center bg-blue-800 " onClick={onClick}>
            <FontAwesomeIcon className="text-cyan-100 h-[28px] mt-[4px]" icon={faMessage} />
        </button>
      );
}

export default ChatButton;