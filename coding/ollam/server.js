const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // Allow frontend requests

// Chatbot Route
app.post("/chat", async (req, res) => {
    const { message } = req.body;
    console.log(req.body)
    try {
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "mistral", // Use any installed model (e.g., "llama3", "gemma", etc.)
            prompt: message,
            stream: false
        });

        res.json({ reply: response.data.response });
    } catch (error) {
        console.error("Error communicating with Ollama:", error);
        res.status(500).json({ error: "Failed to get response from Ollama" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
