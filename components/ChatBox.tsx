import { useRef, useEffect, useState } from 'react'

import ChatInput from './ChatInput'

import "../style.css"


function ChatBox({}) {
  return (
    <div className="relative flex flex-col w-96 bg-gray-200 rounded-md border outline outline-2 outline-blue-800/80 max-h-[39rem] min-h-[3.75rem]" >
      <div className="flex flex-col max-h-[39rem] overflow-y-auto border">
          <div className="mx-2 my-2 pl-2 py-2 border border-black/30 bg-white rounded-md drop-shadow-md">
            #1 This is a long sentence, two lines of long .. .. .. .. sentences.
            #1 This is a long sentence, two lines of long .. .. .. .. sentences.
            #1 This is a long sentence, two lines of long .. .. .. .. sentences.
          </div>
          <div className="mx-2 my-2 pl-2 py-2 border border-black/30 bg-white rounded-md drop-shadow-md">
            #2 This is a long sentence, two lines of long .. .. .. .. sentences.
          </div>
          <div className="mx-2 my-2 pl-2 py-2 border border-black/30 bg-white rounded-md drop-shadow-md">
            #1 This is a long sentence, two lines of long .. .. .. .. sentences.
          </div>
          <div className="mx-2 my-2 pl-2 py-2 border border-black/30 bg-white rounded-md drop-shadow-md">
            #2 This is a long sentence, two lines of long .. .. .. .. sentences.
          </div>
          <div className="mx-2 my-2 pl-2 py-2 border border-black/30 bg-white rounded-md drop-shadow-md">
            #1 This is a long sentence, two lines of long .. .. .. .. sentences.
          </div>
          <div className="mx-2 my-2 pl-2 py-2 border border-black/30 bg-white rounded-md drop-shadow-md">
            #2 This is a long sentence, two lines of long .. .. .. .. sentences.
          </div>
          <div className="mx-2 my-2 pl-2 py-2 border border-black/30 bg-white rounded-md drop-shadow-md">
            #1 This is a long sentence, two lines of long .. .. .. .. sentences.
          </div>
          <div className="mx-2 my-2 pl-2 py-2 border border-black/30 bg-white rounded-md drop-shadow-md">
            #2 This is a long sentence, two lines of long .. .. .. .. sentences.
          </div>
          <div className="mx-2 my-2 pl-2 py-2 border border-black/30 bg-white rounded-md drop-shadow-md">
            #1 This is a long sentence, two lines of long .. .. .. .. sentences.
          </div>
      </div>
        <div className="flex justify-center py-2">
            <ChatInput />
        </div>
    </div>
  );
};

export default ChatBox;