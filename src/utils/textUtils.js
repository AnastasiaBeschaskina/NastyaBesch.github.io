/*
This function divides the input text into two parts: for guests, it limits the content to the first four sentences and appends a prompt to log in or register; for logged-in users, it splits the content halfway, making it suitable for displaying the text in two parts or columns
*/
import React from "react";
import { Link } from "react-router-dom";

export const splitText = (text, isGuest) => {
  // Split the text into sentences based on punctuation marks.

  const sentences = text.split(/(?<=[.!?])\s/);

  if (isGuest) {
    // Return only the first 4 sentences for guests.
    const firstPartSentences = sentences.slice(0, 4);
    const secondPartPrompt = (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>To continue reading, please log in or register.</p>
        <Link to="/log">Sign In</Link>
      </div>
    );
    // Return the first part as the initial sentences and the second part as a registration prompt.
    return [firstPartSentences, [secondPartPrompt]];
  } else {
    // For registered users, return the text divided in half.
    const middleIndex = Math.ceil(sentences.length / 2);
    // Return the first half and the second half of the sentences.
    return [sentences.slice(0, middleIndex), sentences.slice(middleIndex)];
  }
};
