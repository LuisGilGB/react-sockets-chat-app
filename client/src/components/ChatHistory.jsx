import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";

const ChatHistory = () => {
  return (
    <>
      <div className="msg_history">
        <IncomingMessage />
        <OutgoingMessage />
        <IncomingMessage />
        <OutgoingMessage />
        <IncomingMessage />
        <OutgoingMessage />
        <IncomingMessage />
        <OutgoingMessage />
        <IncomingMessage />
        <OutgoingMessage />
      </div>
    </>
  );
};

export default ChatHistory;
