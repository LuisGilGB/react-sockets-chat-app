import Searchbox from "./Searchbox";
import Sidebar from "./Sidebar";

const PeopleInbox = () => {
  return (
    <>
      <div className="inbox_people">
        <Searchbox />

        <Sidebar />
      </div>
    </>
  );
};

export default PeopleInbox;
