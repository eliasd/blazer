import cssText from "data-text:~style.css"

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

function ChatMessage({content}) {
  return (
    <div className="mx-[8px] my-[8px] px-[8px] py-[8px] text-[16px] leading-[20px] whitespace-pre-wrap border border-black/30 bg-white rounded-md drop-shadow-md">
      {content}
    </div>
  );
};

export default ChatMessage;