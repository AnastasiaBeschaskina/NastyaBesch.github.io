// Utility function for email validation
const validateEmail = (email) => {
  if (!email.trim()) {
    return "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
};

// Utility function for password validation
const validatePassword = (password) => {
  if (!password.trim()) {
    return "Please enter your password.";
  } else if (password.length < 8) {
    return "Your password must be at least 8 characters long.";
  }
  return "";
};

const validatePasswordOnLog = (password) => {
  if (!password.trim()) {
    return "Please enter your password.";
  } 
  return "";
};

// Registration form validation
export const validRegistrationForm = (userName, email, password) => {
  let tempErrors = {};
  let formIsValid = true;

  // User name validation
  if (!userName.trim()) {
    tempErrors.userName = "Please enter your user name.";
    formIsValid = false;
  }

  // Email validation
  const emailError = validateEmail(email);
  if (emailError) {
    tempErrors.email = emailError;
    formIsValid = false;
  }

  // Password validation
  const passwordError = validatePassword(password);
  if (passwordError) {
    tempErrors.password = passwordError;
    formIsValid = false;
  }

  return [formIsValid, tempErrors];
};

// Login form validation
export const validLog = (email, password) => {
  let tempErrors = {};
  let formIsValid = true;

  // Repeat the email and password validation logic for the login form
  const emailError = validateEmail(email);
  if (emailError) {
    tempErrors.email = emailError;
    formIsValid = false;
  }

  const passwordError = validatePasswordOnLog(password);

  if (passwordError) {
    tempErrors.password = passwordError;
    formIsValid = false;
  }

  return [formIsValid, tempErrors];
};

export function validateFormData(formData) {
  const { firstName, friendsName, gender, animal, language, category } =
    formData;

  // Initialize an errors object
  let errors = {};

  // Regular expression to check if a string consists only of letters
  const lettersOnlyRegex = /^[A-Za-z]+$/; // Use + instead of * to ensure at least one character

  // Validate firstName: not empty and consists only of letters
  if (!firstName.trim()) {
    errors.firstName = "Please enter your first name.";
  } else if (!lettersOnlyRegex.test(firstName)) {
    errors.firstName = "First name should contain letters only.";
  }

  // Validate friendsName: can be empty, but if not, consists only of letters
  if (friendsName && !lettersOnlyRegex.test(friendsName.trim())) {
    errors.friendsName = "Friend's name should contain letters only.";
  }

  // Validate gender: not empty
  if (!gender.trim()) {
    errors.gender = "Please select your gender.";
  }

  // Validate animal: not empty
  if (!animal.trim()) {
    errors.animal = "Please choose an animal.";
  }

  // Validate language: not empty
  if (!language.trim()) {
    errors.language = "Please select a language.";
  }

  // Validate category: not empty
  if (!category.trim()) {
    errors.category = "Please select a category.";
  }

  // Determine if the form data is valid based on the presence of errors
  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
};

