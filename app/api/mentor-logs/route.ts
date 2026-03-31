import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import MentorLog from "@/models/MentorLog";

export async function GET() {
    try {
        await connectToDatabase();
        const logs = await MentorLog.find().sort({ createdAt: -1 });
        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        await connectToDatabase();
        const newLog = await MentorLog.create(data);
        return NextResponse.json(newLog);
    } catch (error) {
        return NextResponse.json({ error: "Failed to save log" }, { status: 500 });
    }
}