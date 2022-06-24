import React from "react";
import logo from "./asset/medicsynclogo.png";
import minilogo from "./asset/mini-logo.png";
import { SidebarData } from "./SidebarData";
import { useSelector } from "react-redux";

import "./css/Sidebar.css";
import SubMenu from "./SubMenu";

const Sidebar = () => {
  const sidebarState = useSelector((state) => state.userDisplay.sidebar);

  // console.log(sidebarState);

  return (
    <div className={sidebarState ? "sidebar" : "mini-sidebar"}>
      <img src={sidebarState ? logo : minilogo} alt="logo" />

      {SidebarData.map((item, index) => {
        return <SubMenu item={item} key={index} />;
      })}
    </div>
  );
};

export default Sidebar;
