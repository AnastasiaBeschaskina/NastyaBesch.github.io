import React from "react";
import WaveSeparator from "../waveSeparator/WaveSeparator";
import styles from "../../styles/footer.module.css"

const Footer = ({ userId }) => {
  const navItems = [
    { title: "Your Stories", path: "stories" },
    { title: "How does it work", path: "about" },
    { title: "Create Fairy tale", path: "create" },
  ];

   const handleLinkClick = (path) => (event) => {
     event.preventDefault();
     const section = document.getElementById(path);
     if (section) {
       console.log(section);
       section.scrollIntoView({ behavior: "smooth" });
     }
   };

  return (
    <div className={styles.containerFooter}>
      <WaveSeparator className="svg3" />
      <div className={styles.navItems}>
        {navItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.path}`}
            className={styles.navLink}
            onClick={handleLinkClick(item.path)}
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;
