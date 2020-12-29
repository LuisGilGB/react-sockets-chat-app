import { useContext } from "react";
import ChatMain from "../components/ChatMain";
import ChatMainEmpty from "../components/ChatMainEmpty";
import PeopleInbox from "../components/PeopleInbox";
import { ChatContext } from "../context/chat/ChatContext";
import "../css/chat.css";

const ChatView = () => {
  const { activeChat } = useContext(ChatContext);

  return (
    <>
      <div className="messaging">
        <div className="inbox_msg">
          <PeopleInbox />
          {activeChat ? <ChatMain /> : <ChatMainEmpty />}
        </div>
      </div>
    </>
  );
};

export default ChatView;
