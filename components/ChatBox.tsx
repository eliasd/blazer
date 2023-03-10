import { useRef, useEffect, useState } from 'react'

import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

import "../style.css"


function ChatBox({chatMessages, setChatMessages, inputText, setInputText}) {

  return (
    <div className="relative flex flex-col w-96 bg-gray-200 rounded-md border outline outline-2 outline-blue-800/80 max-h-[39rem] min-h-[3.75rem]" >
      <div className="flex flex-col max-h-[39rem] overflow-y-auto border">
          <ul>
            {chatMessages.slice(1).map((msg, index) => (
              <ChatMessage key={index} content={msg.content}/>
            ))}
          </ul>
      </div>
        <div className="flex justify-center py-2">
            <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} inputText={inputText} setInputText={setInputText} />
        </div>
    </div>
  );
};

export default ChatBox;