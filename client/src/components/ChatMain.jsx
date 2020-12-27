import ChatHistory from "./ChatHistory";
import SendMessage from "./SendMessage";

const ChatMain = () => {
  return (
    <>
      <div className="mesgs">
        <ChatHistory />
        <SendMessage />
      </div>
    </>
  );
};

export default ChatMain;
