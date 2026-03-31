import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
    try {
        const { userId, answers } = await req.json(); // answers is an object of the 10 questions

        const prompt = `
      You are an expert psychological evaluator for a youth mental health app.
      Review the user's answers to the initial intake assessment:
      ${JSON.stringify(answers)}
      
      Determine a starting Wellbeing Score (0-100, where 100 is perfect health) and extract an array of 1 to 3 "activeIssues" (e.g., "Academic Stress", "Sleep Deprivation").
      Return ONLY a valid JSON object matching this schema: {"score": 50, "issues": ["Issue 1"]}
    `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        if (!response.text) {
            throw new Error("Received empty response from Gemini");
        }
        const parsedData = JSON.parse(response.text);

        await connectToDatabase();
        await User.findByIdAndUpdate(userId, {
            currentScore: parsedData.score,
            activeIssues: parsedData.issues,
            chatHistory: [{ role: "model", text: "I've reviewed your assessment. How are you feeling right now?" }]
        });

        return NextResponse.json({ success: true, ...parsedData });
    } catch (error) {
        return NextResponse.json({ error: "Assessment failed" }, { status: 500 });
    }
}