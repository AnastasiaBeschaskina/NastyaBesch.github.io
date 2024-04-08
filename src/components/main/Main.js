import React from "react";
import { Flex } from "antd";

const Main = ({ content }) => {
  return (
    <Flex
      vertical
      style={{ minHeight: "100vh", margin: "0", padding: "0" }}
      align="center"
      justify="center"
      wrap="wrap"
    >
      {content}
    </Flex>
  );
};

export default Main;
