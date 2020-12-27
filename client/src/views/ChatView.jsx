import ChatMain from "../components/ChatMain";
import PeopleInbox from "../components/PeopleInbox";
import "../css/chat.css";

const ChatView = () => {
  return (
    <>
      <div className="messaging">
        <div className="inbox_msg">
          <PeopleInbox />
          <ChatMain />
        </div>
      </div>
    </>
  );
};

export default ChatView;
