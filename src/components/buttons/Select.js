import React from "react";
import { Select } from "antd";

const CustomSelect = ({ options, id, onChange, placeholder, status }) => {
  return (
    <Select
      size="large"
      showSearch
      optionFilterProp="children"
      status={status}
      style={{ width: "100%" }}
      filterOption={(input, option) =>
        (option?.label ?? "").includes(input.toLowerCase())
      }
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      onChange={onChange}
      id={id}
      placeholder={placeholder}
    >
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
