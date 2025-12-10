import { getDataFromToken } from "@/src/helpers/decodeToken";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/src/models/userModel";

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId).select("-password");
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}