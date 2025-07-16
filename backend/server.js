import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

// Middleware: JSON parsing
app.use(express.json());

// ✅ CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://learningbuddy-c8654.web.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Handle preflight OPTIONS requests
app.options('*', cors());

// ✅ Logger for debugging incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ✅ Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ✅ Root route for health check
app.post('/', (req, res) => {
  res.send('Root POST route working');
});

// ✅ Route: /api/aichat
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
    console.error("Groq API error (aichat):", error);
    res.status(500).json({ error: "Groq API error" });
  }
});

// ✅ Route: /api/ask
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
    console.error("Groq API error (ask):", error);
    res.status(500).json({ error: "Groq API error" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});
