import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

import "../style.css"

const configuration = new Configuration({
    apiKey: process.env.API_DEV_KEY
})
const openai = new OpenAIApi(configuration);

async function PromptHandler(chatMessages: ChatCompletionRequestMessage[]) {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chatMessages,
      });

      return completion.data.choices[0].message;
    } catch (error) {
      console.log("Prompt Handler", error);
    }
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

        // Reset the height of the textarea
        setInputText("");
        textareaRef.current.style.height = "1.5rem";

        let chatMessagesNew: ChatCompletionRequestMessage[] = [...chatMessages, {role: "user", content: `${inputText}`}];
        setChatMessages(chatMessagesNew);
        const response = await PromptHandler(chatMessagesNew);
        setChatMessages([
            ...chatMessagesNew,
            response,
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