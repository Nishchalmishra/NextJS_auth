"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage() {

    const router = useRouter();
    const [data, setData] = React.useState("null");

    const handleLogout = async() => {

        try {
            
            const response = await axios.get("/api/user/logout");

            console.log(response);
            router.push("/login");

        } catch (error:any) {
            console.log("logout failed...", error.message)
        }

    };

    const getUserDetails = async() => {
        const res = await axios.get("/api/user/userProf")
        console.log(res.data)
        setData(res.data.user._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2>{data === "null" ? "Loading..." : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button
             onClick={handleLogout}>
                Logout
            </button>
            <button
            onClick={getUserDetails}>
                get details
            </button>
        </div>
    )
}