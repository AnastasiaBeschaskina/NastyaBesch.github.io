import axios from "axios";

export const fetchStoriesData = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/stories?userId=${userId}`
    );
    if (response.status === 200 && response.data) {
      return response.data; // Return the fetched stories
    } else {
      throw new Error("Failed to fetch stories");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
