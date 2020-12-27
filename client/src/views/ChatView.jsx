import ChatMain from "../components/ChatMain";
import ChatMainEmpty from "../components/ChatMainEmpty";
import PeopleInbox from "../components/PeopleInbox";
import "../css/chat.css";

const ChatView = () => {
  return (
    <>
      <div className="messaging">
        <div className="inbox_msg">
          <PeopleInbox />
          {true ? <ChatMain /> : <ChatMainEmpty />}
        </div>
      </div>
    </>
  );
};

export default ChatView;
