import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Searchbox = () => {
  const { name: userName, logOut } = useContext(AuthContext);

  return (
    <>
      <div className="headind_srch">
        <div className="recent_heading mt-2">
          <h4>{userName}</h4>
        </div>
        <div className="srch_bar">
          <div className="stylish-input-group">
            <button className="btn text-danger" onClick={logOut}>
              Exit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbox;
