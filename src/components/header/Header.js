import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

const Header = ({ userName, userId }) => {
  const containerRef = useRef(null);
  let navItems = [
    { title: "Your Stories", path: "stories" },
    { title: "How does it work", path: "about" },
  ];

  if (userId === "guest") {
    navItems = [
      { title: "How does it work", path: "about" },
      { title: "Join TaleCrafter", path: "join" },
    ];
  }

 const handleLinkClick = (path) => (event) => {
   event.preventDefault();
   // Wait for the element to be available if it's loaded dynamically
   setTimeout(() => {
     const section = document.getElementById(path);
     console.log(section)
     if (section) {
       section.scrollIntoView({ behavior: "smooth" });
     } else {
       console.error("Element not found: ", path);
     }
   }, 100); // Adjust timing based on your app's behavior
 };

  return (
    <div className={styles.header} ref={containerRef}>
      <div className={styles.headerContainer}>
        <div className={styles.nav}>
          {navItems.map((item, index) => (
            // Use item.path to dynamically set the href attribute
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
        <div className={styles.signIn}>
          <Link to="/log" className={styles.navLink}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
