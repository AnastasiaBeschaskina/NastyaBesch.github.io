import axios from "axios";
import { validateFormData } from "./validations";

// /**
//  * Attempts to create a fairy tale without form validation.
//  * @param {Object} formData The data collected from the form.
//  * @returns The fairy tale data received from the server if successful.
//  */
export const createFairyTaleAgain = async (formData) => {
  try {
    // Making a POST request to the server with formData
    const response = await axios.post(
      "https://personal-fairytale-a48db14070ba.herokuapp.com/generateFairyTale",
      formData
    );
    // Logging the response data for debugging purposes
    console.log(response.data);
    // Assuming the response data is the fairy tale, return it
    return response.data; 
  } catch (error) {
    // Logging the error to the console
    console.error("Error creating fairy tale", error);
    // Rethrowing the error for further handling by the caller
    throw error;
  }
};

/**
 * Creates a fairy tale with preliminary form data validation.
 * @param {Object} formData The data collected from the form.
 * @returns An object indicating success/failure and containing fairy tale data or errors.
 */
export const createFairyTale = async (formData) => {
  // Perform initial form data validation
  const { isValid, errors } = validateFormData(formData);
  if (!isValid) {
    // If validation fails, return an object indicating failure and the validation errors
    return { success: false, errors };
  }

  try {
    console.log(generateFairyTale);
    // If validation passes, proceed to make a POST request with the formData
    const response = await axios.post(
      "https://personal-fairytale-a48db14070ba.herokuapp.com/generateFairyTale",
      formData
    );
    // Return an object indicating success and including the fairy tale data
    return { success: true, fairyTale: response.data };
  } catch (error) {
    // If the request fails, log the error
    console.error("Error creating fairy tale", error);
    // Return an object indicating failure and include the error for UI handling
    return { success: false, error };
  }
};