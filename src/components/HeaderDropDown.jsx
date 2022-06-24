import React from "react";
import styles from "./css/HeaderDropDown.module.css";

const HeaderDropDown = (props) => {
  const { onClick, name, icon } = props;
  return (
    <div className={styles.dropmenu}>
      <div className={styles.item} onClick={onClick}>
        <div className={styles.icon}>{icon}</div>
        <div>{name}</div>
      </div>
    </div>
  );
};

export default HeaderDropDown;
