import React, {useRef} from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/header.module.css";

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
    // const section = containerRef.current?.querySelector(`#${path}`);
    const section = document.getElementById(path);
    if (section) {
      console.log(section);
      section.scrollIntoView({ behavior: "smooth" });
    }
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
