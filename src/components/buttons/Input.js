import React from "react";
import { Input } from "antd";

const CustomInput = ({ onChange, id, placeholder, status, autoComplete }) => (
  <Input
    onChange={onChange}
    id={id}
    size="large"
    placeholder={placeholder}
    status={status}
    autoComplete={autoComplete}
  />
);

export default CustomInput;
