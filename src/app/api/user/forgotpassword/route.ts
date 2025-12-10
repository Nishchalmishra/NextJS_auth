import { NextRequest, NextResponse } from "next/server";
import {User} from "@/src/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/src/dbconfig/dbconfig";
import { sendEmail } from "@/src/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json();
        const { email } = reqBody;
        
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        await sendEmail({email: user.email, emailType: "RESET", userId: user._id});
        return NextResponse.json({ message: "Reset link has been sent to your email" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Something went wrong aya" }, { status: 500 });
    }
}