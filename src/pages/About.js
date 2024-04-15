import React from "react";
import styles from "./about.module.css";
import WaveSeparator from "../components/waveSeparator/WaveSeparator";

const About = () => {

  return (
    <div className={styles.containerAbout} id="about">
      <WaveSeparator className="svg" />
      <div className={styles.container}>
        <h1 className={styles.title}>How does it work ✨</h1>
        <div className={styles.flexContainer}>
          <div className={styles.verticalWrap}>
            <img
              src={`${process.env.PUBLIC_URL}/images/6.webp`}
              alt="Description"
              className={styles.imageShake}
            />
            <h2 className={styles.h2Title}>Create your fairy tale</h2>
            <p className={styles.pDescription}>
              Choose your fairy tale's hero—it could be you, a friend, or your
              pet. This makes your story truly unique and personal.
            </p>
          </div>
          <div className={styles.verticalWrap}>
            <img
              src={`${process.env.PUBLIC_URL}/images/childAmongBooks.webp`}
              alt="Description"
              className={styles.imageShake}
            />
            <h2 className={styles.h2Title}>Your Library</h2>
            <p className={styles.pDescription}>
              Dive back into your favorite stories anytime, turning any moment
              into a magical storytelling adventure.
            </p>
          </div>
          <div className={styles.verticalWrap}>
            <img
              src={`${process.env.PUBLIC_URL}/images/4.webp`}
              alt="Description"
              className={styles.imageShake}
            />
            <h2 className={styles.h2Title}>Listen</h2>
            <p className={styles.pDescription}>
              Kids can enjoy their fairy tales all by themselves, no grown-up
              help needed!
            </p>
          </div>
        </div>
      </div>
      <WaveSeparator className="svg2" />
    </div>
  );
};

export default About;
