import React, { useState, useEffect } from "react";
import { Spin, Flex, Button } from "antd";
import CustomButton from "../buttons/Button";
import { CloseOutlined } from "@ant-design/icons";
import { splitText } from "../../utils/textUtils";
import styles from "../../styles/fairyTale.module.css";

const FairyTale = ({ title, content, loading, onClose, isGuest, buttons }) => {
  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);

  useEffect(() => {
    if (!loading && content) {
      const [firstPart, secondPart] = splitText(content, isGuest);
      setFirstHalf(firstPart);
      setSecondHalf(secondPart);
    }
  }, [loading, content, isGuest]);

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: "url(/images/openBookBackGround.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Button
        className={styles.closeButton}
        icon={<CloseOutlined />}
        onClick={onClose}
      />
      {loading && (
        <div className={styles.spinnerStyle}>
          <p style={{ textAlign: "center", fontFamily: "2rem" }}>
            We're crafting your personalized fairy tale. Hang tight – magic is
            on its way!
          </p>
          <Spin size="large" />
        </div>
      )}
      {!loading && (
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <Flex justify="space-evenly" gap="large" align="start">
            <div style={{ width: "50%" }}>
              {firstHalf.map((sentence, index) => (
                <div className={styles.containerText} key={`first-${index}`}>
                  {sentence}
                </div>
              ))}
            </div>

            <div style={{ width: "50%" }}>
              {secondHalf.map((sentence, index) => (
                <div className={styles.containerText} key={`second-${index}`}>
                  {sentence}
                </div>
              ))}
            </div>
          </Flex>
          {!isGuest && (
            <Flex gap="middle" justify="center" align="center" wrap="wrap">
              {buttons.map(({ content, onClick }, index) => (
                <CustomButton
                  key={index}
                  content={content}
                  onClick={onClick}
                  className="btnFairyTale"
                />
              ))}
            </Flex>
          )}
        </div>
      )}
    </div>
  );
};

export default FairyTale;
