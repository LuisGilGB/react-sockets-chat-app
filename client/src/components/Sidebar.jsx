import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <>
      {/* <!-- Sidebar inicio --> */}
      <div className="inbox_chat">
        <SidebarItem active />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        {/* <!-- Espacio extra para scroll --> */}
        <div className="extra_space"></div>
      </div>
    </>
  );
};

export default Sidebar;
