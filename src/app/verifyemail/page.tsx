"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function VerifyEmail() { 

    const [token, setToken] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [error, setError] = React.useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/user/verifyemail", { token });
            console.log("data is here: ", response.data);
            setVerified(true);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Verify Email </h1>
            <h2>{token ? `${token}`:"Token not found"}</h2>
            {verified && <h1>Email verified successfully</h1>}
            {error && <h1>Something went wrong</h1>}
            <Link href="/login">Login</Link>
        </div>
    )
}