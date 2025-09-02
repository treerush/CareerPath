import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const openai = new OpenAI({
    apiKey: process.env.GPT_API_KEY, 
});

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
    try {
        const { chatHistory, userMessage } = req.body;
        if (!userMessage || typeof userMessage !== "string") {
            return res.status(400).json({ error: "userMessage is required." });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Siz foydalanuvchiga yordamchi AI assistentisiz. O'zbek tilida javob bering." },
                ...chatHistory,
                { role: "user", content: userMessage },
            ],
        });

        const aiResponse = completion.choices[0].message.content;
        res.json({ response: aiResponse || "Kechirasiz, javob olinmadi." });

    } catch (err) {
        console.error("OpenAI error:", err);
        res.status(500).json({ error: "AI javobida xatolik." });
    }
});

app.get("/", (req, res) => {
    res.send("CareerPath OpenAI GPT backend ishlayapti!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
