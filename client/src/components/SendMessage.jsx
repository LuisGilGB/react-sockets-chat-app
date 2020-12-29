import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { socket } = useContext(SocketContext);
  const { uid: from } = useContext(AuthContext);
  const { activeChat: to } = useContext(ChatContext);

  const onChange = (ev) => {
    setMessage(ev.target.value);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!message) {
      return;
    }
    socket?.emit("send-chat-message", {
      payload: {
        from,
        to,
        body: message,
      },
    });
    setMessage("");
  };

  return (
    <form onSubmit={onSubmit}>
      {/* <!-- Enviar mensaje Inicio --> */}
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Message..."
            value={message}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            Send
          </button>
        </div>
      </div>
      {/* <!-- Enviar mensaje Fin --> */}
    </form>
  );
};

export default SendMessage;
