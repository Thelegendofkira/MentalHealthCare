
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json();
        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) return NextResponse.json({ error: "Email already exists" }, { status: 400 });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });

        return NextResponse.json({ message: "User created successfully", userId: user._id });
    } catch (error) {
        console.error("[register] Error:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}