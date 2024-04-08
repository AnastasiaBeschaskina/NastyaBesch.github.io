import React, { useState } from "react";
import styles from "../styles/registrationPage.module.css";
import WaveSeparator from "../components/waveSeparator/WaveSeparator";
import RegistrationForm from "../components/form/RegistrationForm";

const Reg = () => {
  const [email, setEmail] = useState("");
  return (
    <div className={styles.containerRegPage} id="join">
      <WaveSeparator className="svg3" />
      <div className={styles.regPageContainer}>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Reg;
