import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const audioFile = formData.get("audio") as File;

        if (!audioFile) {
            return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
        }

        const arrayBuffer = await audioFile.arrayBuffer();
        const base64Audio = Buffer.from(arrayBuffer).toString("base64");

        const prompt = `
      Listen to this audio recording from an adolescent. 
      Analyze the content: is there an immediate risk of self-harm, severe abuse, or a life-threatening crisis?
      
      You must respond ONLY with a valid JSON object containing a single boolean key "serious". 
      Example: {"serious": true} or {"serious": false}
    `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                prompt,
                {
                    inlineData: {
                        mimeType: audioFile.type || "audio/webm",
                        data: base64Audio,
                    }
                }
            ],
            config: {
                responseMimeType: "application/json",
            }
        });

        const parsedData = JSON.parse(response.text);

        return NextResponse.json(parsedData);

    } catch (error) {
        console.error("Error processing audio:", error);
        return NextResponse.json(
            { error: "Failed to process audio analysis" },
            { status: 500 }
        );
    }
}