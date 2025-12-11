"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ResetPassword() {
    
    const router = useRouter();
    const [token, setToken] = React.useState("");
    // const [verified, setVerified] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    // useEffect(() => {
    //     if (token.length > 0) {
    //         // verifyUserEmail();
    //     }
    // })

    const handleResetPassword = async () => {
        try {
            const response = await axios.post("/api/user/resetpassword", { token, password });
            console.log(response.data);
            router.push("/login");
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    return (
      <div className=" bg-[linear-gradient(130deg,rgba(154,48,156,1)_0%,rgba(134,30,141,1)_12%,rgba(58,27,138,1)_24%,rgba(9,18,121,1)_40%,rgba(0,255,255,1)_76%)] grid grid-cols-[1fr_2fr_1fr] grid-rows-[1fr_2fr_1fr] h-lvh max-w-lvw">
        <div className="grid grid-rows-[1fr_2fr] col-start-2 col-end-3 row-start-2 row-end-3 bg-[#1c9eb0] rounded-4xl">
          <div className="flex justify-center items-center m-2 p-4">
            <h2 className="text-black text-3xl">
              <b>Forgot Password</b>
            </h2>
          </div>
          <div className=" text-black grid grid-rows-4 grid-cols-6 gap-3 m-3 p-2">
            <input
              className="bg-gray-200 rounded-2xl col-start-1 col-end-7 p-3"
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-green-500 rounded-2xl col-start-3 col-end-5"
              onClick={handleResetPassword}
            >
              {/* {disabledButton ? "Fill all the fields" : "Login"} */}
              reset password
            </button>
          </div>
        </div>
      </div>
    );

}