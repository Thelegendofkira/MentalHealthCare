import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

const ai = new GoogleGenAI({});

export async function POST(request: Request) {
    try {
        const { userId, userMessage } = await request.json();

        await connectToDatabase();
        const user = await User.findById(userId);
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        // Add the user's new message to history
        const updatedHistory = [...user.chatHistory, { role: "user", text: userMessage }];

        const formattedHistory = updatedHistory
            .map((msg: any) => `${msg.role === 'user' ? 'User' : 'Mentor'}: ${msg.text}`).join('\n');

        const systemPrompt = `
      You are an empathetic, professional AI mentor.
      CURRENT STATE: Score: ${user.currentScore}/100, Issues: ${user.activeIssues.join(", ")}
      HISTORY: \n${formattedHistory}
      
      TASK:
      1. Provide a brief, supportive reply.
      2. Adjust the score slightly based on their action (cap 100).
      3. Update issues if resolved or emerged.
      
      OUTPUT FORMAT (Strict JSON):
      {"reply": "text", "newScore": number, "updatedIssues": ["issue"]}
    `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: systemPrompt,
            config: { responseMimeType: "application/json" }
        });
        if (!response.text) {
            throw new Error("Received empty response from Gemini");
        }
        const parsedData = JSON.parse(response.text);

        // Add the AI's response to history and save everything to MongoDB
        updatedHistory.push({ role: "model", text: parsedData.reply });

        user.currentScore = parsedData.newScore;
        user.activeIssues = parsedData.updatedIssues;
        user.chatHistory = updatedHistory;
        await user.save();

        return NextResponse.json({
            reply: parsedData.reply,
            newScore: parsedData.newScore,
            updatedIssues: parsedData.updatedIssues,
            chatHistory: updatedHistory
        });

    } catch (error) {
        return NextResponse.json({ error: "Chat processing failed" }, { status: 500 });
    }
}