import React, { useState } from "react";
import styles from "../../styles/selectAnimal.module.css";

const SelectAnimal = ({ formData, handleChange, error }) => {
  const [selectedAnimalId, setSelectedAnimalId] = useState("");

  const handleSelectAnimal = (id) => {
    handleChange("animal", id);
    setSelectedAnimalId(id);
  };

  const animals = [
    { id: "Cat", src: "/images/animals/cat.webp", alt: "Cat" },
    { id: "Hedgehog", src: "/images/animals/hedgehog.webp", alt: "Hedgehog" },
    { id: "Dog", src: "/images/animals/dog.webp", alt: "Dog" },
    { id: "Chick", src: "/images/animals/chick.webp", alt: "Chick" },
    { id: "Horse", src: "/images/animals/horse.webp", alt: "Horse" },
    { id: "Cow", src: "/images/animals/cow.webp", alt: "Cow" },
    { id: "Elephant", src: "/images/animals/elephant.webp", alt: "Elephant" },
    { id: "Sheep", src: "/images/animals/sheep.webp", alt: "Sheep" },
    { id: "Squirrel", src: "/images/animals/squirrel.webp", alt: "Squirrel" },
    { id: "Hare", src: "/images/animals/hare.webp", alt: "Hare" },
    { id: "Fox", src: "/images/animals/fox.webp", alt: "Fox" },
    { id: "Mouse", src: "/images/animals/mouse.webp", alt: "Mouse" },
    { id: "Monkey", src: "/images/animals/monkey.webp", alt: "Monkey" },
    { id: "Lion", src: "/images/animals/lion.webp", alt: "Lion" },
    { id: "Bear", src: "/images/animals/bear.webp", alt: "Bear" },
    { id: "Giraffe", src: "/images/animals/giraffe.webp", alt: "Giraffe" },
    { id: "Deer", src: "/images/animals/deer.webp", alt: "Deer" },
    { id: "Donkey", src: "/images/animals/donkey.webp", alt: "Donkey" },
  ];

  return (
    <div className={styles.container}>
      <p
        className={styles.title}
        style={{ color: error ? "red" : "rgba(0, 0, 0, 0.25)" }}
      >
        Choose your favorite animal
      </p>
      <div className={styles.animalsContainer}>
        {animals.map((animal) => (
          <div
            className={`${styles.animalCard} ${
              selectedAnimalId === animal.id ? styles.selected : ""
            }`}
            key={animal.id}
            onClick={() => handleSelectAnimal(animal.id)}
          >
            <img
              className={styles.animalImage}
              src={animal.src}
              alt={animal.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectAnimal;
