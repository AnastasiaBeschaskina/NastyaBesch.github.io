import React, { useState } from "react";
import styles from "./log.module.css";
import CustomButton from "../buttons/Button";
import CustomInput from "../buttons/Input";
import {validRegistrationForm} from "../../utils/validations"
import {handleRegistration} from "../../utils/authService";
import { Input} from "antd";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Function to update state based on input
  const onUserNameChange = (e) => setUserName(e.target.value);
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [formIsValid, tempErrors] = validRegistrationForm(
      userName,
      email,
      password
    );
    if (!formIsValid) {
      setErrors(tempErrors);
      return;
    }
    await handleRegistration(userName, email, password, navigate);
  };

  return (
    <form className={styles.logContainerForm} onSubmit={handleSubmit}>
      <h1 className={styles.logTitle}>Create your account</h1>
      {Object.keys(errors).length > 0 && (
        <div className={styles.validationErrors}>
          <ul>
            {Object.values(errors).map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      )}
      <CustomInput
        status={errors.userName ? "error" : ""}
        placeholder="User Name"
        value={userName}
        onChange={onUserNameChange}
        autoComplete="username"
      />
      <CustomInput
        status={errors.email ? "error" : ""}
        placeholder="Email Address"
        value={email}
        onChange={onEmailChange}
        autoComplete="email"
      />
      <Input.Password
        status={errors.password ? "error" : ""}
        className={styles.logInput}
        size="large"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        autoComplete="current-password"
      />
      <CustomButton
        type="submit"
        content="Create Account"
        className="regButton"
      />
    </form>
  );
};

export default RegistrationForm;
