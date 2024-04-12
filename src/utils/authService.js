import axios from "axios";
import { message } from "antd";

export const handleLogin = async (email, password) => {
  console.log(email);
  try {
    const response = await axios.post(
      "https://personal-fairytale.herokuapp.com/api/login",
      {
        email,
        password,
      }
    );
    if (response.data.userId) {
      return {
        success: true,
        message: "Login successful",
        userId: response.data.userId,
        userName: response.data.userName
      };
    } else {
      return { success: false, message: "Login failed. Please try again." };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Login failed. Please try again.",
    };
  }
};



export const handleRegistration = async (userName, email, password, navigate) => {
  console.log("handleRegistration");
  try {
    const response = await axios.post(
      // "http://localhost:4000/api/registration",
     "https://personal-fairytale.herokuapp.com/api/login",
      {
        userName,
        email,
        password,
      }
    );
    if (response.data.userId) {
      message.success("Registration successful");
      navigate(`/`, { state: { userId: response.data.userId } });
    } else {
      message.error("Registration failed. Please try again.");
    }
  } catch (error) {
    message.error(
      error.response?.data?.message || "Registration failed. Please try again."
    );
  }
};

export const handleLogout = (navigate) => {
  navigate(`/`, { state: { userId: "guest" } });
};
