import React, { useState } from "react";
import CustomButton from "../components/buttons/Button";
import styles from "../components/form/log.module.css";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../components/form/RegistrationForm";
import LoginForm from "../components/form/LogInForm";


const Log = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className={styles.logContainer}>
      {showLoginForm ? (
        <div className={styles.container}>
          <LoginForm navigate={navigate} />
          <CustomButton
            onClick={toggleForm}
            content="Create Account"
            className="logButton"
          />
        </div>
      ) : (
        <div className={styles.container}>
          <RegistrationForm navigate={navigate} />
          <CustomButton
            onClick={toggleForm}
            content="Sign In"
            className="logButton"
          />
        </div>
      )}
    </div>
  );
};

export default Log;
