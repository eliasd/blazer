import { useState } from 'react'
import ChatButton from './ChatButton'
import ChatBox from './ChatBox'
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';

import "../style.css"

const INIT_CHAT_MESSAGE: ChatCompletionRequestMessage = {role:ChatCompletionRequestMessageRoleEnum.System, content:"You are a helpful assistant."};

function App() {
    const [showChatBox, setShowChatBox] = useState(false);
    const [chatMessages, setChatMessages] = useState<Array<ChatCompletionRequestMessage>>([INIT_CHAT_MESSAGE]);
    const [inputText, setInputText] = useState("");
  
    const toggleChatBox = () => {
      setShowChatBox((prevState) => !prevState);
    };
  
    return (
      <div className="">
        {showChatBox && (
          <div className="fixed bottom-20 right-5">
            <ChatBox chatMessages={chatMessages} setChatMessages={setChatMessages} inputText={inputText} setInputText={setInputText} />
          </div> 
        )}
        <div className="fixed bottom-5 right-5">
          <ChatButton onClick={toggleChatBox} />
        </div>
      </div>
    );
  }
  
export default App;
  