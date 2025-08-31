import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const systemMessage = "Siz tajribali IT psixologi roliningizni bajaring. Siz faqat IT sohasidagi muammolar, karyera yo'nalishlari, stressni boshqarish, motivatsiya va shaxsiy rivojlanish bo'yicha maslahatlar bera olasiz. Boshqa mavzulardagi savollarga javob bermang.";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Faqat POST so\'rovlariga ruxsat beriladi' });
  }

  try {
    const { chatHistory, userMessage } = req.body;

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemMessage }] },
        ...chatHistory
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const responseText = result.response.text();

    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ichki server xatosi' });
  }
}
