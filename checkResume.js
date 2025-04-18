require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const apikey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: apikey });

async function checkResume(resumeData) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You're an expert resume reviewer. 
                   Analyze the following raw resume data and provide:
                   Avoid complaining about url and phone numbers, and give a well crafted
                   response , this message will be directly rendered on the page , and keep it short.
                   You will be rewarded if you do this all correctly.
                   No sugarcoating , be brutally honest.
                   - Bullet-point areas of improvement
                   - Short 2-line overall impression.
                   Resume Data: ${resumeData}`,
    })
    return response.text;
}

module.exports = { checkResume };