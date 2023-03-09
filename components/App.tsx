import { useState } from 'react'
import ChatButton from './ChatButton'
import ChatBox from './ChatBox'

import "../style.css"


function App() {
    const [showChatBox, setShowChatBox] = useState(
      false
    );
  
    const toggleChatBox = () => {
      setShowChatBox((prevState) => !prevState);
    };
  
    return (
      <div className="">
        {showChatBox && (
          <div className="fixed bottom-20 right-5">
            <ChatBox />
          </div> 
        )}
        <div className="fixed bottom-5 right-5">
          <ChatButton onClick={toggleChatBox} />
        </div>
      </div>
    );
  }
  
export default App;
  