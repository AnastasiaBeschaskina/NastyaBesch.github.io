// import React, { useState, useEffect } from "react";
// import image1 from "../../../src/images/img111.webp";
// import image2 from "../../../src/images/img112.webp";
// import image3 from "../../../src/images/img113.webp";
// // import image4 from "../../../src/images/img2.webp";
// // import image5 from "../../../src/images/img6.webp";
// // import image6 from "../../../src/images/img3.webp";
// // import image7 from "../../../src/images/img8.webp";
// // import image8 from "../../../src/images/img9.webp";
// // import image9 from "../../../src/images/img10.webp";
// // import image10 from "../../../src/images/img4.webp";



// const ImageSlider = () => {
//   const images = [
//     image1,
//     image2,
//     image3,
//     // image4,
//     // image5,
//     // image6,
//     // image7,
//     // image8,
//     // image9,
//     // image10
//   ];
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000); // Change image every 3 seconds

//     return () => clearInterval(timer); // Cleanup the interval on component unmount
//   }, [images.length]); // Only re-run the effect if images.length changes

//   return (
//     <img
//       src={images[currentImageIndex]} // Correctly access the current image's src
//       alt="Slideshow"
//       style={{
//         display: "block",
//         width: "100%",
//         maxWidth: "450px",
//         // borderRadius: 16,
//         height: "100%",
//         maxHeight: "450px",
//       }} // Adjust styles as needed
//     />
//   );
// };

// export default ImageSlider;
