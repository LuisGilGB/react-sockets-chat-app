import classnames from "classnames";

const SidebarItem = ({ userName, active, online }) => {
  return (
    <>
      {/* <!-- conversación activa inicio --> */}
      <div className={classnames({ chat_list: true, active_chat: active })}>
        <div className="chat_people">
          <div className="chat_img">
            <img
              src="https://ptetutorials.com/images/user-profile.png"
              alt="test-user"
            />
          </div>
          <div className="chat_ib">
            <h5>
              {userName} <span className="chat_date">Dec 25</span>
            </h5>
            <p>
              Test, which is a new approach to have all solutions astrology
              under one roof.
            </p>
            {online ? (
              <span className="text-success">Online</span>
            ) : (
              <span className="text-danger">Offline</span>
            )}
          </div>
        </div>
      </div>
      {/* <!-- conversación activa Fin --> */}
    </>
  );
};

export default SidebarItem;
