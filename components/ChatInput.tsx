import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

import cssText from "data-text:~style.css"

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

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
      if (e.code === "Enter" && !e.shiftKey) { 
        e.preventDefault();
        await handleSubmit(e);
        return;
      } 

      const isPrintable: boolean = e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey;
      if (isPrintable) {
        e.preventDefault();
        const textarea: HTMLTextAreaElement = textareaRef.current;
        const start: number = textarea.selectionStart;
        const end: number = textarea.selectionEnd;
        const value: string = textarea.value;

        // Replace any selected / highlighted text with the key.
        const newValue: string = value.slice(0, start) + e.key + value.slice(end);
        textarea.value = newValue;

        // Reset height and selection start.
        const newHeight = textarea.scrollHeight;
        textarea.style.height = `${newHeight}px`;
        textarea.selectionStart = textarea.selectionEnd = start + 1;

        setInputText(newValue);
        return;
      }
    }

    return (
      <form className="m-0 w-[368px]" onSubmit={handleSubmit}>
        <div className="flex flex-row relative w-full py-[8px] border border-black/50 bg-white rounded-md drop-shadow-md">
          <textarea ref={textareaRef} value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={handleKeyDown} className="m-0 w-full resize-none border-0 bg-transparent pl-[8px] pr-[28px] max-h-[100px] h-[24px] leading-[24px] text-[16px] focus:outline-none" placeholder='Type here. (Shift+Enter for newline)'/>
          <button className="absolute right-[16px] bottom-[6px] p-[4px] rounded-md text-gray-500 hover:bg-gray-100"> 
            <FontAwesomeIcon icon={faPaperPlane} className="h-[16px] w-[16px]" />
          </button>
        </div>
      </form>
    )
}

export default ChatInput;