import React, { useEffect, useRef} from "react";
import styles from "./galleryEmpty.module.css";

const GalleryPageUserGuest = () => {
  const [isAutoScrollActive, setIsAutoScrollActive] = React.useState(true);
  const containerRef = useRef(null);

  const placeholderImages = [
    { src: "/images/1book.png", alt: "book1" },
    { src: "/images/2.png", alt: "book2" },
    { src: "/images/3.png", alt: "book3" },
    { src: "/images/4.png", alt: "book4" },
    { src: "/images/5.png", alt: "book5" },
    { src: "/images/6.png", alt: "book6" },
  ];

  const duplicateImages = [...placeholderImages, ...placeholderImages];

  const disableAutoScrollTemporarily = () => {
    setIsAutoScrollActive(false);
    setTimeout(() => setIsAutoScrollActive(true), 1000);
  };

  useEffect(() => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) =>
      link.addEventListener("click", disableAutoScrollTemporarily)
    );

    return () => {
      navLinks.forEach((link) =>
        link.removeEventListener("click", disableAutoScrollTemporarily)
      );
    };
  }, []);

  useEffect(() => {
    if (!isAutoScrollActive) return;

    const scrollSpeed = 1; // Pixels to scroll
    const intervalTime = 20; // ms between each scroll increment

    const scrollFunction = () => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += scrollSpeed;

        if (
          containerRef.current.scrollWidth - containerRef.current.scrollLeft <=
          containerRef.current.clientWidth
        ) {
          containerRef.current.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(scrollFunction, intervalTime);
    return () => {
      clearInterval(intervalId);
      console.log("Interval cleared");
    };
  }, [isAutoScrollActive]);

  return (
    <div className={styles.galleryGuestContainer}>
      <div className={styles.galleryGuest}>
        <h1 className={styles.title}>Craft Your Magic Library ✨</h1>
        <p className={styles.title}>
          Craft and keep your cherished fairy tales safe in your library. Let
          your imagination soar!
        </p>
        <div className={styles.storiesContainer} ref={containerRef}>
          {duplicateImages.map((image, index) => (
            <div key={index} className={styles.storyPlaceholder}>
              <img
                src={image.src}
                alt={image.alt}
                className={styles.placeholderImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPageUserGuest;
