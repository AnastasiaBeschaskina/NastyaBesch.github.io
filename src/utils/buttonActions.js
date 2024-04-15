import axios from "axios";

export const createAgain = async (
  e,
  formData,
  setLoading,
  onFormSubmitSuccess
) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axios.post(
      "https://personal-fairytale-a48db14070ba.herokuapp.com/generateFairyTale",
      formData
    );
    if (onFormSubmitSuccess) {
      onFormSubmitSuccess(response.data);
    }
  } catch (error) {
    console.error("Error submitting form", error);
  } finally {
    setLoading(false);
  }
};

export const listen = () => {
  console.log("Listening");
};

export const saveStory = async (userId, title, content) => {
  try {
    const response = await axios.post(
      "https://personal-fairytale-a48db14070ba.herokuapp.com/api/saveStory",
      {
        userId,
        title,
        content,
      }
    );
    console.log("Story saved successfully!", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Failed to save the story", error);
    return { success: false, error: error.message };
  }
};

// const textToSpeech = async (text, language) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:4000/api/textToSpeech",
//       {
//         text: text,
//         language: language,
//       }
//     );

//     // Handle response...
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error converting text to speech:", error);
//   }
// };

// textToSpeech(
//   "Hello, World! This is a test of Google Cloud Text-to-Speech",
//   "en-US"
// );
