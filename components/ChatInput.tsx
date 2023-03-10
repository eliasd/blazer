import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'
import { useEffect } from 'react'

import "../style.css"

async function dummyOpenAICall() {
    const possibleResponses = [
        "This is a one-line response.",
        "This is a longer response with a lot more words that take up more space.",
        "This is the mega longest response because it includes even more words from before. In fact, the message repeats or not."];
    const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    return {role:"assistant", content:response};
};


function ChatInput({chatMessages, setChatMessages, inputText, setInputText}) {
    const textareaRef = useRef(null);
    useEffect(() => {
        const listener = () => {
        textareaRef.current.style.height = "0px" // Momentarily resets the height.
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        };
        textareaRef.current.addEventListener("input", listener);
    }, [textareaRef]);

    async function handleSubmit(e) {
        e.preventDefault();
        let chatMessagesNew = [...chatMessages, {role: "user", content: `${inputText}`}];
        setInputText("");
        setChatMessages(chatMessagesNew);

        // Reset the height of the textarea
        textareaRef.current.style.height = "1.5rem";

        const response = await dummyOpenAICall();
        setChatMessages([
            ...chatMessagesNew,
            {role:response.role, content: response.content},
        ]);
    }

    async function handleKeyDown(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        await handleSubmit(e);
      }
    }

    return (
      <form className="m-0 w-[23rem]" onSubmit={handleSubmit}>
        <div className="flex flex-row relative w-full py-2 border border-black/50 bg-white rounded-md drop-shadow-md">
          <textarea ref={textareaRef} value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={handleKeyDown} className="m-0 w-full resize-none border-0 bg-transparent pl-2 pr-7 max-h-[100px] h-6 focus:outline-none" placeholder='Type here. (Shift+Enter for newline)'/>
          <button className="absolute right-4 bottom-1.5 p-1 rounded-md text-gray-500 hover:bg-gray-100"> 
            <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
          </button>
        </div>
      </form>
    )
}

export default ChatInput;