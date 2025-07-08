// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import Groq from "groq-sdk";

// dotenv.config();
// const cors = require('cors');

// app.use(cors({
//   origin: 'https://learningbuddy-c8654.web.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// app.use(cors({
//   origin: ['http://localhost:5173', 'https://learningbuddy-c8654.web.app'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));


// const app = express();



// app.post('/', (req, res) => {
//   res.send('Root POST route working');
// });

// app.use(express.json());

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// // ✅ Route for generating quizzes
// app.post("/api/aichat", async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await groq.chat.completions.create({
//       model: "llama3-70b-8192",
//       messages: [
//         {
//           role: "system",
//           content: "You are an expert quiz generator AI. Return only valid JSON with no extra text.",
//         },
//         {
//           role: "user",
//           content: message,
//         },
//       ],
//     });

//     const aiResponse = response.choices[0].message.content;
//     res.json({ response: aiResponse });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Groq API error" });
//   }
// });

// // ✅ Optional ask route (keep if needed)
// app.post("/api/ask", async (req, res) => {
//   const { question } = req.body;

//   try {
//     const response = await groq.chat.completions.create({
//       model: "llama3-70b-8192",
//       messages: [
//         {
//           role: "system",
//           content: "You are a helpful learning buddy AI.",
//         },
//         {
//           role: "user",
//           content: question,
//         },
//       ],
//     });

//     res.json({ answer: response.choices[0].message.content });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Groq API error" });
//   }
// });

// app.listen(5000, () => {
//   console.log("✅ Backend server running on port 5000");
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express(); // ✅ Define app first

app.use(express.json()); // ✅ For JSON parsing

// ✅ Configure CORS (only once)
app.use(cors({
  origin: ['http://localhost:5173', 'https://learningbuddy-c8654.web.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.options('*', cors());

// ✅ Initialize Groq SDK
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ✅ Health check or root route
app.post('/', (req, res) => {
  res.send('Root POST route working');
});

// ✅ Route for generating quizzes
app.post("/api/aichat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: "You are an expert quiz generator AI. Return only valid JSON with no extra text.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const aiResponse = response.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Groq API error" });
  }
});

// ✅ Route for ask feature
app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: "You are a helpful learning buddy AI.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Groq API error" });
  }
});

// app.listen(5000, () => {
//   console.log("✅ Backend server running on port 5000");
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});