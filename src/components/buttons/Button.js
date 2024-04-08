import React from "react";
import styles from "../../styles/button.module.css"

const CustomButton = ({ content, className, onClick }) => {
  return (
    <button className={styles[className]} onClick={onClick}>
      {content} 
    </button>
  );
};

export default CustomButton;
