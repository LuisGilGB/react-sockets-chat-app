import { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const { users = [], activeChat, selectChat } = useContext(ChatContext);

  return (
    <>
      {/* <!-- Sidebar inicio --> */}
      <div className="inbox_chat">
        {users.map((user, i) => (
          <SidebarItem
            key={user.uid}
            active={user.uid === activeChat}
            userName={user.name}
            online={user.online}
            onClick={() => {
              selectChat(user.uid);
            }}
          />
        ))}
        {/* <!-- Espacio extra para scroll --> */}
        <div className="extra_space"></div>
      </div>
    </>
  );
};

export default Sidebar;
