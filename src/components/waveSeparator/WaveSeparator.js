// WaveSeparator.js
import React from "react";
import styles from "../../styles/weveSeparator.module.css";

const WaveSeparator = ({ className }) => {
  return (
    <div className={styles.layotTopSep}>
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className={styles[className]}
      >
        <path d="M1000,40c0,0 -120.077,-38.076 -250,-38c-129.923,0.076 -345.105,78 -500,78c-154.895,0 -250,-30 -250,-30l0,50l1000,0l0,-60Z"></path>
        <path
          d="M1000,40c0,0 -120.077,-38.076 -250,-38c-129.923,0.076 -345.105,73 -500,73c-154.895,0 -250,-45 -250,-45l0,70l1000,0l0,-60Z"
          style={{ opacity: 0.4 }}
        ></path>
        <path
          d="M1000,40c0,0 -120.077,-38.076 -250,-38c-129.923,0.076 -345.105,68 -500,68c-154.895,0 -250,-65 -250,-65l0,95l1000,0l0,-60Z"
          style={{ opacity: 0.4 }}
        ></path>
      </svg>
    </div>
  );
};

export default WaveSeparator;
