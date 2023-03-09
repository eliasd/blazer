import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'
import { useEffect } from 'react'

import "../style.css"


function ChatInput({}) {
    const textareaRef = useRef(null);
    useEffect(() => {
        const listener = () => {
        textareaRef.current.style.height = "0px" // Momentarily resets the height.
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        };
        textareaRef.current.addEventListener("input", listener);
    }, [textareaRef]);

    return (
      <form className="m-0 w-[23rem]">
        <div className="flex flex-row relative w-full py-2 border border-black/50 bg-white rounded-md drop-shadow-md">
          <textarea ref={textareaRef} className="m-0 w-full resize-none border-0 bg-transparent pl-2 pr-7 max-h-[100px] h-6 focus:outline-none" placeholder='Type here.'/>
          <button className="absolute right-4 bottom-1.5 p-1 rounded-md text-gray-500 hover:bg-gray-100"> 
            <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
          </button>
        </div>
      </form>
    )
}

export default ChatInput;