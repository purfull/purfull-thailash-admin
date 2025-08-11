import NavBar from "../../components/navbar/navbar";
import SideNavBar from "../../components/sidebar/SideBAr";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./console.css";
const Console = () => {
  const [expand, setExpand] = useState(false);

  const toggleexpanded = () => {
    setExpand(!expand);
  };
  return (
    <div className="console-container">
      <NavBar />
      <div className={`console-sidebar  ${expand ? "expand" : "collapsed"}`}>
        <SideNavBar expand={expand} toggleexpanded={toggleexpanded} />
      </div>
      <div
        className="outlet-containerr"
        // style={{
        //   position: "absolute",
        //   padding: "6px",
        //   right: 0,
        //   top: "10vh",
        //   width: "80%",
        // }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Console;
