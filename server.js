const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const cron = require("node-cron");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const rateLimit = require("express-rate-limit");

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "build")));

// Import the query function from your database configuration file
const query = require("./public/connectDB");

//Define allowed origins
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://personal-fairytale-a48db14070ba.herokuapp.com"]
    : ["http://localhost:3000", "http://localhost:4000"];

// Apply CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      console.log(`Origin attempting access: ${origin}`);
      if (!origin) {
        console.log(
          "No origin provided. Likely server-to-server or similar request."
        );
        return callback(null, true);
      }
      if (allowedOrigins.indexOf(origin) === -1) {
        console.log(`Access denied for origin: ${origin}`);
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
  })
);

// Handle POST requests to "/generateFairyTale"
app.post("/generateFairyTale", async (req, res) => {
  const { gender, language, category, firstName, friendsName, animal } =
    req.body;

  let prompt;
  if (language === "russian") {
    prompt = `Создайте название и сказку на русском языке в категории "${category}" для ${firstName}${
      friendsName ? ` и друга ${friendsName}` : ""
    }, ${gender}, который любит ${animal}.`;
  } else if (language === "hebrew") {
    prompt = `צור כותרת וסיפור בעברית בקטגוריה "${category}" ל${firstName}${
      friendsName ? ` ולחבר ${friendsName}` : ""
    }, שאוהב ${animal}.`;
  } else {
    prompt = `Create a title and a fairy tale in ${language} in the category "${category}" for ${firstName}${
      friendsName ? ` and their friend ${friendsName}` : ""
    }, ${gender} who loves ${animal}.`;
  }

  try {
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

    const generatedResponse = response.data.choices[0].message.content;
    const [titleWithPrefix, ...storyParts] = generatedResponse.split("\n\n");
    const regex = /^(Title: |כותרת: |Hазвание: )/i;

    // Replace the matched prefix with an empty string
    const title = titleWithPrefix.replace(regex, "");
    const generatedText = storyParts.join("\n\n");

    res.json({ title, content: generatedText });
  } catch (error) {
    console.error("Error:", error);
    if (error.response?.status === 429) {
      console.log(
        "Rate limit exceeded. Implementing retry logic or notifying the user."
      );
      res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
});

// Endpoint to save a story
app.post("/api/saveStory", async (req, res) => {
  const storyId = uuidv4();
  const { title, content, userId } = req.body;

  const sqlQuery =
    "INSERT INTO stories (story_id, title, content, user_id) VALUES (?, ?, ?, ?)";

  try {
    await query(sqlQuery, [storyId, title, content, userId]);
    console.log("Story saved successfully!");
    res.status(200).json({ message: "Story saved successfully", id: storyId });
  } catch (err) {
    console.error("Error saving story:", err);
    res.status(500).json({ message: "Failed to save the story" });
  }
});

// Endpoint to fetch stories
app.get("/api/stories", async (req, res) => {
  const { userId } = req.query;

  const sqlQuery = "SELECT * FROM stories WHERE user_id = ?";

  try {
    const results = await query(sqlQuery, [userId]);
    res.json(results);
  } catch (err) {
    console.error("Error fetching stories by userId:", err);
    res.status(500).json({ message: "Failed to fetch stories" });
  }
});

// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
// });

// //Apply the rate limiting middleware to your routes
// app.use("/api/registration", apiLimiter);
// app.use("/api/login", apiLimiter);

//Registration function

app.post("/api/registration", async (req, res) => {
  console.log("reg");
  const { userName, email, password } = req.body;
  console.log(req.body);

  try {
    // Check if email already exists
    const results = await findUserByEmail(email);
    console.log(results);
    if (results) {
      return res.status(409).json({ message: "Email already exists" });
    }
    console.log("yes");
    // Email does not exist, proceed with creating new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    await insertUser(userId, userName, email, hashedPassword);
    res.status(201).json({
      message: "User created successfully",
      userId: userId,
      userName: userName,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

async function insertUser(userId, userName, email, hashedPassword) {
  try {
    const insertQuery =
      "INSERT INTO users (user_id, userName, email, password) VALUES (?, ?, ?, ?)";
    const results = await query(insertQuery, [
      userId,
      userName,
      email,
      hashedPassword,
    ]);
    return results[0] || null;
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    throw error;
  }
}

// Login function

app.post("/api/login", async (req, res) => {
  console.log("Incoming POST request to /api/login");
  console.log("Request body:", req.body); // This should now log the correct body
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log(`Login successful for user: ${user.userName}`);
      res.json({
        message: "Login successful",
        userId: user.user_id,
        userName: user.userName,
      });
    } else {
      res.status(401).json({ message: "Password is incorrect" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ message: "An error occurred during the login process" });
  }
});

async function findUserByEmail(email) {
  console.log("func findUserByEmail");
  try {
    const sqlQuery = "SELECT * FROM users WHERE email = ?";
    console.log("Executing query:", sqlQuery, "with email:", email);
    const results = await query(sqlQuery, [email]);
    return results[0] || null;
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    throw error;
  }
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
