import { useState, useEffect } from "react";
import { fetchStoriesData } from "../utils/storiesFetch";

export const useFetchStories = (userId) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storiesData = await fetchStoriesData(userId);
        setStories(storiesData);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchData();
  }, [userId]);

  return { stories };
};
