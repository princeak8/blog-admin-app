import React, { useState } from "react";
import "./css/SubMenu.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const sidebarState = useSelector((state) => state.userDisplay.sidebar);

  // const [isActive, setIsActive] = useState(false)

  const showSubnav = () => setSubnav(!subnav);

  const fullNavBar = (
    <NavLink
      className="content"
      to={item.path}
      onClick={item.subNav && showSubnav}
    >
      <div>
        {item.icon}
        <span>{item.title}</span>
      </div>
      <div>
        {item.subNav && subnav
          ? item.iconOpened
          : item.subNav
          ? item.iconClosed
          : null}
      </div>
    </NavLink>
  );

  const miniNavBar = (
    <NavLink
      className="mini-content"
      to={item.path}
      onClick={item.subNav && showSubnav}
    >
      <div>{item.icon}</div>
      <div>
        {item.subNav && subnav
          ? item.iconOpened
          : item.subNav
          ? item.iconClosed
          : null}
      </div>
    </NavLink>
  );
  return (
    <>
      {sidebarState ? fullNavBar : miniNavBar}
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <NavLink to={item.path} key={index} className="dropdownlink">
              {item.icon}{" "}
              {sidebarState && <span className="label">{item.title}</span>}
            </NavLink>
          );
        })}
    </>
  );
};

export default SubMenu;
