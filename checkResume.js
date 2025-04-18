require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const apikey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: apikey });

async function checkResume(resumeData){
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Check this resume data , the data is directly parsed so respond accordingly.Give only the areas which need improvement and also give the overall impressions , dont tell the strengths , keep all this short. The resume data is : ${resumeData}`,
    })
    return response.text;
}

module.exports = {checkResume};