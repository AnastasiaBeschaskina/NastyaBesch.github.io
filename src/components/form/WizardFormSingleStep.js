import React, { useState, useEffect, useRef } from "react";
import CustomButton from "../buttons/Button";
import CustomInput from "../buttons/Input";
import CustomSelect from "../buttons/Select";
import SelectAnimal from "./SelectAnimal";
import AddSecondCharacter from "./AddSecondCharacter";
import { createFairyTale } from "../../utils/generateFairyTale";
import styles from "../../styles/WizardForm.module.css";
import { validateFormData } from "../../utils/validations";

const WizardFormSingleStep = ({
  setFairyTaleData,
  setLoading,
  setFormDataCreateAgain,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    // age: "",
    gender: "",
    friendsName: "",
    animal: "",
    language: "",
    category: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [formError, setFormError] = useState(true);

  const imageRef = useRef(null);
  const formInnerRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.classList.add(styles.slideInLeft);
    }
    if (formInnerRef.current) {
      formInnerRef.current.classList.add(styles.slideInRight);
    }
  }, []);

  const handleChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = async () => {
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setFormError(false);
      setValidationErrors(validation.errors);
      return;
    }

    setLoading(true);
    const result = await createFairyTale(formData);
    setLoading(false);
    setFormDataCreateAgain(formData);

    if (!result.success) {
      if (result.errors) {
        setValidationErrors(result.errors);
      } else if (result.error) {
        console.error("An error occurred:", result.error);
      }
      return;
    }
    setFairyTaleData(result.fairyTale);
  };

  return (
    <div className={styles.formContainer}>
      <img
        src={`${process.env.PUBLIC_URL}/images/13.webp`}
        alt="Description"
        className={styles.slideImage}
      />
      <div className={styles.formInner}>
        {!formError && (
          <p className={styles.loginError}>
            Oops! Looks like something's amiss. Could you take another look?
            We're eager to craft your unique fairy tale as soon as everything's
            perfect.
          </p>
        )}
        <CustomInput
          id="firstName"
          status={validationErrors.firstName ? "error" : ""}
          value={formData.firstName}
          placeholder="Choose your hero's name"
          onChange={(e) => handleChange("firstName", e.target.value)}
        />

        <div className={styles.flexContainer}>
          <CustomSelect
            status={validationErrors.category ? "error" : ""}
            id="category"
            value={formData.category}
            onChange={(value) => handleChange("category", value)}
            placeholder="Favorite story theme"
            options={[
              { value: "enchantedForest", label: "Enchanted Forest" },
              { value: "spaceAdventures", label: "Space Adventures" },
              { value: "robotChronicles", label: "Robot Chronicles" },
              { value: "pirateTreasures", label: "Pirate Treasures" },
              { value: "castleKingdoms", label: "Castle Kingdoms" },
              { value: "underwaterWorlds", label: "Underwater Worlds" },
              { value: "dinosaurLand", label: "Dinosaur Land" },
              { value: "fairyAndElfRealms", label: "Fairy and Elf Realms" },
              { value: "superheroSagas", label: "Superhero Sagas" },
              { value: "animalKingdoms", label: "Animal Kingdoms" },
              { value: "mysticalMountains", label: "Mystical Mountains" },
              { value: "hauntedHouses", label: "Haunted Houses" },
            ]}
          />
          <CustomSelect
            status={validationErrors.language ? "error" : ""}
            id="language"
            onChange={(value) => handleChange("language", value, setFormData)}
            value={formData.language}
            placeholder="Language"
            options={[
              { value: "english", label: "English" },
              { value: "hebrew", label: "Hebrew" },
              { value: "russian", label: "Russian" },
            ]}
          />
        </div>
        {/* <CustomSelect
            id="age"
            onChange={(value) => handleChange("age", value, setFormData)}
            value={formData.age}
            placeholder="Child's age"
            options={[
              { value: "0-1", label: "0-1" },
              { value: "1-3", label: "1-3" },
              { value: "3-5", label: "3-5" },
              { value: "5-7", label: "5-7" },
            ]}
          />
        </Flex> */}
        {/* <AddSecondCharacter
          formData={formData.friendsName}
          handleChange={handleChange}
        /> */}
        <AddSecondCharacter
          genderError={validationErrors.gender}
          nameError={validationErrors.friendsName}
          formData={formData.friendsName}
          handleChange={handleChange}
        />
        <SelectAnimal
          error={validationErrors.animal}
          formData={formData.animal}
          handleChange={handleChange}
          status={validationErrors.animal}
        />
        <CustomButton
          content={"Create your story"}
          className="buttonForm"
          onClick={handleFormSubmit}
        />
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/images/11.webp`}
        alt="Description"
        ref={formInnerRef}
        className={styles.slideImageSecond}
      />
    </div>
  );
};

export default WizardFormSingleStep;
