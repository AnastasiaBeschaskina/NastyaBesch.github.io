# NastyaBesch.github.io
 A personalized fairy tale generator for kids using SQL, React, Node.js, and GPT-4 API. It creates unique stories and stores favorite tales in a database, blending technology with imagination for engaging storytelling.

## What the Project Does

Briefly describe what your project does. Explain the problem it solves, its features, and its functionality. For instance:

This project is a personalized fairy tale generator designed for children. It uses advanced technologies including SQL, React, Node.js, and the GPT-4 API to create unique, engaging stories tailored to each child's preferences. Users can generate new tales, save them, and revisit their favorite stories anytime.

## Why the Project is Useful

Explain why your project stands out and how it can benefit users. For example:

The project fosters creativity and imagination in children, providing a unique storytelling experience. It's an educational tool that encourages reading and language learning through interactive, personalized content.

## Getting Started
To set up this project on your local machine, follow the instructions below:

Prerequisites
Node.js installed on your system
MySQL installed and running on your system

### Clone the Repository

git clone https://github.com/NastyaBesch/NastyaBesch.github.io
cd NastyaBesch.github.io

### Install Dependencies

npm install

### MySQL Database Setup

Ensure MySQL is installed and running on your system. Configure your database connection details by creating a .env file at the root of your project with the following contents:

DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
DB_NAME=mydatabase
Replace myuser, mypassword, and mydatabase with your actual database user, password, and database name.

### Configure mysql2 Connection

In your project, ensure you have a module (e.g., ./db/connectDB.js) that uses mysql2 to connect to your MySQL database using the environment variables defined in your .env file. Here's a basic example:

const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;

### Start the Server

With the database configured and dependencies installed, you can start the server with:

npm start
The server will typically run on http://localhost:4000, allowing you to access your application.

## Features

Database Storage for Fairy Tales: The project already incorporates a feature to save generated fairy tales in a database. This functionality allows for the long-term preservation and easy retrieval of stories, enabling users to build a personalized library of fairy tales. It’s particularly useful for revisiting favorite stories and managing content efficiently.

Personalization: The ability to generate stories tailored to the user's input, including name, preferred language, and favorite animals, ensures that each fairy tale is unique and engaging. This customization makes the storytelling experience more personal and memorable.

Multilingual Support: Catering to a diverse audience, the project supports multiple languages, including Russian and Hebrew. This broad language support makes the platform accessible and enjoyable for users from various linguistic backgrounds, fostering a more inclusive storytelling environment.

Integration with OpenAI's API: Utilizing OpenAI's API, the project guarantees that each fairy tale is not just unique but also creatively rich. This integration facilitates the generation of high-quality content that can inspire and entertain, leveraging the latest advancements in AI to enrich the storytelling process.

Customizable Themes: Users have the liberty to select from various story categories, allowing for a tailored fairy tale experience that aligns with personal or the recipient’s interests. Whether it’s an adventure, a mystery, or a classic fairy tale, the project can craft a story to match these themes.

User-friendly Interface: With a straightforward API endpoint, the project is designed to be easily integrable into developers’ applications or for direct user interaction. This user-friendly approach simplifies the process of requesting and receiving personalized stories, enhancing user experience.

Educational Value: These fairy tales serve as a fun and engaging way for children and language learners to improve their reading skills and language comprehension. The personalized nature of the stories heightens engagement and fosters a deeper connection with the content.

Open Source: Being open source, the project encourages contributions and enhancements from the developer community. This openness ensures continuous growth, innovation, and adaptation to user needs, keeping the project vibrant and relevant.

Future Text-to-Speech Conversion: In the pipeline is the addition of text-to-speech functionality, aiming to transform written fairy tales into auditory experiences. This forthcoming feature will enhance accessibility and engagement, allowing for stories to be enjoyed in a new and dynamic format.

## Code Examples

The following code snippet illustrates how to handle POST requests for generating personalized fairy tales using our project's API endpoint. This example demonstrates integration with the OpenAI API, specifically utilizing the "gpt-3.5-turbo" model to generate creative content based on user input. This code can be adapted and integrated into your own projects, providing a basis for implementing custom storytelling or content generation features.

Handling POST Requests to Generate Fairy Tales
const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

// Handle POST requests to "/generateFairyTale"
app.post("/generateFairyTale", async (req, res) => {
  // Destructuring the request body to extract required fields
  const { gender, age, language, category, firstName, friendsName, animal } = req.body;

  console.log("Request body:", req.body);

  let prompt;

  // Constructing the prompt based on the language specified in the request
  if (language === "russian") {
    prompt = `Создайте название и сказку на русском языке в категории "${category}" для ${firstName} и друга ${friendsName}, ${age}-летний ${gender}, который любит ${animal}.`;
  } else if (language === "hebrew") {
    prompt = `צור כותרת וסיפור בעברית בקטגוריה "${category}" ל ${firstName} ולחבר ${friendsName}, בן ${age} שאוהב ${animal}.`;
  } else {
    prompt = `Create a title and a fairy tale in ${language} in the category "${category}" for ${firstName} and their friend ${friendsName}, a ${age}-year-old ${gender} who loves ${animal}.`;
  }

  try {
    // Sending the constructed prompt to OpenAI's API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Generate a fairy tale with a title." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Processing the response from OpenAI
    const generatedResponse = response.data.choices[0].message.content;
    const [titleWithPrefix, ...storyParts] = generatedResponse.split("\n\n");
    const regex = /^(Title: |כותרת: |Название: )/i;

    // Extracting the title and assembling the story parts
    const title = titleWithPrefix.replace(regex, "");
    const generatedText = storyParts.join("\n\n");

    // Sending the generated fairy tale as a response
    setTimeout(() => {
      res.json({ title, content: generatedText });
    }, 3000);
  } catch (error) {
    console.error("Error:", error);
    if (error.response?.status === 429) {
      console.log("Rate limit exceeded. Implementing retry logic or notifying the user.");
      res.status(429).json({ message: "Too many requests. Please try again later." });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

## Contribution

As a junior developer, this project represents some of my initial forays into software development. I am keen to receive feedback on the code and overall project structure to improve and learn from the community. I highly encourage other developers to contribute to this project, whether through code improvements, feature suggestions, or bug reporting. Your insights and contributions are invaluable to me.

Here’s how you can contribute:

Submit Pull Requests: If you have a suggestion for an improvement or a new feature, please feel free to fork the repository, make your changes, and submit a pull request. Include a clear description of what changes you've made and why.
Suggest Enhancements: If you have ideas for new features or suggestions for improving existing ones, I'd love to hear from you. Please create an issue on the project repository detailing your suggestion.
Report Bugs: If you encounter any bugs while using the project, please report them by creating an issue on the GitHub repository. Include details about the bug and, if possible, steps to reproduce it.
Your contributions will help make this project better for everyone. As I’m in the early stages of my development career, your feedback and contributions are especially appreciated.

## Contact Information

LinkedIn: www.linkedin.com/in/anastasia-beschaskina
Email: kopylovaap8@gmail.com
