import axios from "axios";

export const fetchStoriesData = async (userId) => {
  try {
    const response = await axios.get(
      `https://personal-fairytale-a48db14070ba.herokuapp.com/api/stories?userId=${userId}`
    );
    if (response.status === 200 && response.data) {
      return response.data; // Return the fetched stories
    } else {
      console.error("No stories found or bad response");
      return []; // Return an empty array or handle accordingly
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return []; // Return an empty array or handle accordingly
  }
};

