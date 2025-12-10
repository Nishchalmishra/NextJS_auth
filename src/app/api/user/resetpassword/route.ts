import { NextResponse, NextRequest } from "next/server";
import { User } from "@/src/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/src/dbconfig/dbconfig";

connect();

export async function POST(request: NextRequest) { 

    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;

        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        if (!password) {
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
        
        }

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        user.password = await bcrypt.hash(password, 10);
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

}