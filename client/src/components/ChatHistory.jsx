import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";

const ChatHistory = () => {
  const { messages } = useContext(ChatContext);
  const { uid } = useContext(AuthContext);

  return (
    <>
      <div className="msg_history" id="chat-history">
        {messages.map((message) => {
          const Component =
            message.from === uid ? OutgoingMessage : IncomingMessage;
          return <Component key={message._id} content={message.body} />;
        })}
      </div>
    </>
  );
};

export default ChatHistory;
