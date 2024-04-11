import React, { useState, useEffect } from "react";
import WizardFormSingleStep from "../components/form/WizardFormSingleStep";
import styles from "../styles/welcome.module.css";
import FairyTale from "../components/fairyTale/FairyTale";
import { saveStory } from "../utils/buttonActions";
import {createFairyTale} from "../utils/generateFairyTale";

const Welcome = ({ userId }) => {
  const [fairyTaleData, setFairyTaleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData ? JSON.parse(savedFormData) : null;
  });

  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  console.log(formData);
  // Save fairy tale data
  const handleSave = () => {
    if (fairyTaleData) {
      saveStory(userId, fairyTaleData.title, fairyTaleData.content)
        .then(() => setIsSaved(true))
        .catch((error) => console.error("Failed to save the story", error));
    }
  };

  // Close and clear data
  const handleClose = () => {
    setFairyTaleData(null);
    setIsLoading(false);
    setIsSaved(false);
  };

  // Load fairy tale from localStorage if not a guest
  useEffect(() => {
    if (userId !== "guest") {
      const savedFairyTale = localStorage.getItem("fairyTaleData");
      if (savedFairyTale) {
        const fairyTaleData = JSON.parse(savedFairyTale);
        setFairyTaleData(fairyTaleData);
        localStorage.removeItem("fairyTaleData"); // Clear after successful retrieval
      }
    }
  }, [userId]);

  if (userId === "guest" && fairyTaleData) {
    localStorage.setItem("fairyTaleData", JSON.stringify(fairyTaleData)); // Save for guests
  }

  const handleCreateFairyTaleAgain = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createFairyTale(formData);
      setFairyTaleData(response.fairyTale);
      setIsSaved(false);
    } catch (error) {
      console.error("Failed to create fairy tale", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Action buttons
  const buttons = [
    { content: "Create Again", onClick: handleCreateFairyTaleAgain },
    ...(isSaved ? [] : [{ content: "Save", onClick: handleSave }]),
  ];

  return (
    <section className={styles.wrapper} id="create">
      {isLoading || fairyTaleData ? (
        <FairyTale
          isGuest={userId === "guest"}
          content={fairyTaleData?.content}
          loading={isLoading}
          title={fairyTaleData?.title}
          buttons={buttons}
          onClose={handleClose}
        />
      ) : (
        <>
          <h1 className={styles.firstTitle}> Create your Fairy tale ✨ </h1>
          <WizardFormSingleStep
            setFairyTaleData={setFairyTaleData}
            setLoading={setIsLoading}
            setFormDataCreateAgain={setFormData}
          />
        </>
      )}
    </section>
  );
};

export default Welcome;
