import { useRef, useEffect, useState } from 'react'

import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

import cssText from "data-text:~style.css"

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}


function ChatBox({chatMessages, setChatMessages}) {

  return (
    <div className="relative flex flex-col w-[384px] bg-gray-200 rounded-[6px] border outline outline-2 outline-blue-800/80 max-h-[624px] min-h-[60px]" >
      <div className="flex flex-col max-h-[624px] overflow-y-auto border">
          <ul>
            {chatMessages.slice(1).map((msg, index) => (
              <ChatMessage key={index} content={msg.content}/>
            ))}
          </ul>
      </div>
        <div className="flex justify-center py-[8px]">
            <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
        </div>
    </div>
  );
};

export default ChatBox;