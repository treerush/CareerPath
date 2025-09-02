// Next.js API route — OpenAI GPT chat
import OpenAI from "openai";

const API_KEY = process.env.GPT_API_KEY;
if (!API_KEY) throw new Error("GPT_API_KEY .env da mavjud emas!");

const openai = new OpenAI({
    apiKey: API_KEY,
});

const systemMessage = "Siz tajribali IT psixologi roliningizni bajaring. Siz faqat IT sohasidagi muammolar, karyera yo'nalishlari, stressni boshqarish, motivatsiya va shaxsiy rivojlanish bo'yicha maslahatlar bera olasiz. Boshqa mavzulardagi savollarga javob bermang.";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Faqat POST so'rovlariga ruxsat beriladi" });
    }

    try {
        const { chatHistory, userMessage } = req.body;
        if (!userMessage || typeof userMessage !== "string") {
            return res.status(400).json({ error: "userMessage required" });
        }

        const messages = [
            { role: "system", content: systemMessage },
            ...(Array.isArray(chatHistory) ? chatHistory : []),
            { role: "user", content: userMessage },
        ];

        // AI javobini olish
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const responseText = completion.choices[0].message.content;

        res.status(200).json({ response: responseText || "Kechirasiz, javob olinmadi." });
    } catch (error) {
        console.error("OpenAI chat error:", error.message, error);
        res.status(500).json({ error: "Ichki server xatosi" });
    }
}
