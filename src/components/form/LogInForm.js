import React, { useState } from "react";
import styles from "../../styles/log.module.css";
import CustomButton from "../buttons/Button";
import CustomInput from "../buttons/Input";
import { validLog } from "../../utils/validations";
import { handleLogin } from "../../utils/authService";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [formIsValid, tempErrors] = validLog(email, password);
    if (!formIsValid) {
      setErrors(tempErrors);
      return;
    }

    const { success, message, userId, userName } = await handleLogin(email, password);
    if (success) {
      navigate(`/`, { state: { userId, userName } });
    } else {
      setLoginError(message);
    }
  };

  return (
    <form className={styles.logContainerForm} onSubmit={handleSubmit}>
      <h1 className={styles.logTitle}>Sign into your account</h1>
      {!loginError && Object.keys(errors).length > 0 && (
        <div className={styles.validationErrors}>
          <ul>
            {Object.values(errors).map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      )}
      {loginError && <p className={styles.loginError}>{loginError}</p>}
      <CustomInput
        status={errors.email ? "error" : ""}
        className={styles.logInput}
        size="large"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        autoComplete="email"
      />
      <Input.Password
        className={styles.logInput}
        status={errors.password ? "error" : ""}
        size="large"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <CustomButton type="submit" content="Sign In" className="regButton" />
    </form>
  );
};

export default LoginForm;
