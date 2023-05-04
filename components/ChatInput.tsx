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

const fixedResponse = "There are many factors that make Kevin Durant a great basketball player. Here are some possible reasons: 1. Scoring ability: Durant is one of the greatest scorers in NBA history. He has led the league in scoring four times and has a career average of 27.0 points per game. He is known for his shooting, driving, and post-up skills, and can score from anywhere on the court. 2. Size and athleticism: Durant is 6'10' (2.08m) tall and has a 7'5' (2.26m) wingspan, making him a matchup nightmare for most defenders. He is also quick, agile, and explosive, allowing him to create space and finish plays with impressive dunks and layups. 3. Versatility: Durant can play multiple positions and adapt to different roles on the court. He can be a scoring machine, a facilitator, a rebounder, a defender, or a combination of these. He can also switch on defense and guard players of different sizes and styles.";

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


function ChatInput({chatMessages, setChatMessages}) {
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

        const inputText: string = textareaRef.current.value;
        let chatMessagesNew: ChatCompletionRequestMessage[] = [...chatMessages, {role: "user", content: `${inputText}`}];
        setChatMessages(chatMessagesNew);
        const response = await PromptHandler(chatMessagesNew);
        setChatMessages([
            ...chatMessagesNew,
            response,
        ]);

        // Reset the height and content of the textarea.
        textareaRef.current.value = "";
        textareaRef.current.style.height = "0px" // Momentarily resets the height.
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
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

        // Reset the scrollHeight by forcing the browser to redraw the content of 
        // the textarea element by temporarily changing its height to 0, and then back 
        // to the current height.
        textarea.style.height = '0';
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        return;
      }
    }

    return (
      <form className="m-0 w-[368px]" onSubmit={handleSubmit}>
        <div className="flex flex-row relative w-full py-[8px] border border-black/50 bg-white rounded-[6px] drop-shadow-md">
          <textarea ref={textareaRef} onKeyDown={handleKeyDown} className="m-0 w-full resize-none border-0 bg-transparent pl-[8px] pr-[28px] max-h-[100px] h-[24px] leading-[24px] text-[16px] focus:outline-none" placeholder='Type here. (Shift+Enter for newline)'/>
          <button className="absolute right-[16px] bottom-[6px] p-[4px] rounded-[6px] text-gray-500 hover:bg-gray-100"> 
            <FontAwesomeIcon icon={faPaperPlane} className="h-[16px] w-[16px]" />
          </button>
        </div>
      </form>
    )
}

export default ChatInput;