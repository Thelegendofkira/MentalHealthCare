import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        await connectToDatabase();

        const user = await User.findOne({ email });
        if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

        // Create JWT Payload
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        // Set HTTP-Only Cookie (Next.js 15 standard)
        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return NextResponse.json({ message: "Logged in successfully", role: user.role });
    } catch (error) {
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}