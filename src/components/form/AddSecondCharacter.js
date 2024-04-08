import React, { useState } from "react";
import CustomInput from "../buttons/Input";
import { Card } from "antd";
import styles from "../../styles/addSecondCharacter.module.css";

const AddSecondCharacter = ({ formData, handleChange, error }) => {
  const [selectedGender, setSelectedGender] = useState("");
  
  const handleGenderChange = (gender) => {
    handleChange("gender", gender);
    setSelectedGender(gender);
  };

  const genderOptions = [
    { id: "Female", src: "/images/girl.webp", alt: "Girl" },
    { id: "Male", src: "/images/boy.webp", alt: "Boy" },
  ];

  return (
     <div className={styles.container}>
      <div className={styles.inputContainer}>
        <CustomInput
          placeholder="Pick your adventure buddy"
          id="friendsName"
          value={formData.friendsName}
          onChange={(e) => handleChange("friendsName", e.target.value)}
        />
      </div>
      <div className={styles.genderSelectionContainer}>
        <p style={{ color: error ? "red" : "rgba(0, 0, 0, 0.25)" }}>
          Choose gender
        </p>
        {genderOptions.map((option) => (
          <Card
            key={option.id}
            className={`${styles.genderCard} ${
              selectedGender === option.id.toLowerCase() ? styles.selected : ""
            }`}
            onClick={() => handleGenderChange(option.id.toLowerCase())}
          >
            <img
              src={option.src}
              alt={option.alt}
              className={styles.genderImage}
            />
          </Card>
        ))}
      </div> 
    </div>
  );
};

export default AddSecondCharacter;
