import "../style.css"

function ChatMessage({content}) {
  return (
    <div className="mx-2 my-2 pl-2 py-2 border border-black/30 bg-white rounded-md drop-shadow-md">
      {content}
    </div>
  );
};

export default ChatMessage;