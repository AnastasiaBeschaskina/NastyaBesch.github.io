import React from "react";
import styles from "../../styles/storiesList.module.css";

const StoriesList = ({ stories, onSelectStory }) => {
  const imageData = [
    { src: "/images/1book.png", alt: "book1" },
    { src: "/images/2.png", alt: "book2" },
    { src: "/images/3.png", alt: "book3" },
    { src: "/images/4.png", alt: "book4" },
    { src: "/images/5.png", alt: "book5" },
    { src: "/images/6.png", alt: "book6" },
  ];

  return (
    <div className={styles.storiesContainer}>
      {stories.map((story, index) => (
        <div
          key={story.story_id}
          className={styles.storyCard}
          onClick={() => onSelectStory(story)}
        >
          <img
            className={!story.isActive ? styles.disabledImage : ""}
            src={imageData[index % imageData.length].src}
            alt={imageData[index % imageData.length].alt}
          />
          <div className={styles.storyTitle}>{story.title}</div>
        </div>
      ))}
    </div>
  );
};

export default StoriesList;
