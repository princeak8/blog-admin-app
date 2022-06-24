import React, { useContext, useState } from "react";
import styles from "./css/Header.module.css";
import AuthContext from "../context/AuthProvider";
import * as IoIcon from "react-icons/io";
import * as FaIcon from "react-icons/fa";
// import logo from "../asset/medicsynclogo.png";
import { useNavigate } from "react-router-dom";
import HeaderDropDown from "./HeaderDropDown";
import * as BiIcon from "react-icons/bi";
import * as RiIcon from "react-icons/ri";
import * as VscIcon from "react-icons/vsc";
import { userDisplayActions } from "../store/userDisplaySlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    authCtx.logout();
    navigate("/admin/login");
  };

  const handleDrop = () => {
    setShowDropdown(!showDropdown);
  };

  const handleToggleSidebar = () => {
    dispatch(userDisplayActions.toggleSideBar());
  };

  return (
    <>
      <header>
        <VscIcon.VscThreeBars
          onClick={handleToggleSidebar}
          className={styles.collapse}
        />
        <div className={styles.left}></div>

        <div className={styles.right}>
          <div className={styles.rightIcons}>
            <div className={styles.notifyIcon}>
              <IoIcon.IoMdNotificationsOutline />
            </div>
            <span>Notifications</span>
          </div>
          <div className={styles.rightIcons}>
            <div className={styles.notifyIcon}>
              <FaIcon.FaUser />
            </div>
            <span className={styles.welcome}>{"authCtx.name"}</span>
            <BiIcon.BiChevronDown
              onClick={handleDrop}
              className={styles.dropicon}
            />
          </div>
        </div>
        {showDropdown && (
          <HeaderDropDown
            className={styles.drop}
            onClick={handleLogout}
            name={"Logout"}
            icon={<RiIcon.RiLogoutBoxRLine />}
          />
        )}
      </header>
    </>
  );
};

export default Header;
