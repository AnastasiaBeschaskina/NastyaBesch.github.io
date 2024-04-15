import React, { useState } from "react";
import { Pagination } from "antd";
import StoriesList from "../components/storiesList/StoriesList";
import FairyTale from "../components/fairyTale/FairyTale";
import { listen } from "../../src/utils/buttonActions";
import styles from "./gallery.module.css";
import { useFetchStories } from "../hooks/useFetchStories";

const pageSize = 6;

const GalleryPage = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);
  const buttons =  [];//[{ content: "Listen", onClick: listen }];
  const { stories } = useFetchStories(userId);

  console.log(stories);

  const filteredStories = stories.filter(
    (story) =>
      !filter || story.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSelectStory = (story) => setSelectedStory(story);

  const handleScrollToStories = () => {
    const storiesElement = document.getElementById("stories");
    if (storiesElement) {
      storiesElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
    handleScrollToStories();
  };

  return (
    <div className={styles.galleryContainer} id="stories">
      {selectedStory ? (
        <FairyTale
          {...selectedStory}
          loading={false}
          onClose={() => setSelectedStory(null)}
          buttons={buttons}
        />
      ) : (
        <div className={styles.gallery}>
          <h1 className={styles.title}>Your Library ✨</h1>
          {/* <FilterComponent onFilter={setFilter} /> */}
          <StoriesList
            stories={filteredStories.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )}
            onSelectStory={handleSelectStory}
          />
          <Pagination
            id="stories"
            current={currentPage}
            total={filteredStories.length}
            pageSize={pageSize}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
