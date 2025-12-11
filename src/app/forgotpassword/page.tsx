"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function submitEmail() {

    const router = useRouter();
    const [email, setEmail] = React.useState("");

    const handleSubmit = async() => {
        const res = await axios.post("/api/user/forgotpassword", { email });
        console.log(res.data);
        // router.push("/verifyemail");
    }


    return (
      <div className="bg-[linear-gradient(130deg,rgba(154,48,156,1)_0%,rgba(110,9,121,1)_21%,rgba(0,212,255,1)_72%)] grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr] h-lvh max-w-lvw">
        <div className="grid grid-rows-[1fr_2fr] col-start-2 col-end-3 row-start-2 row-end-3 bg-[#cd15d6a1] rounded-4xl">
          <div className="flex justify-center items-center m-2 p-4">
            <h2 className="text-black text-3xl">
              <b>Forgot Password</b>
            </h2>
          </div>
          <div className=" text-black grid grid-rows-2 grid-cols-6 gap-3 m-3 p-2">
            <input
              className="bg-gray-200 rounded-2xl col-start-1 col-end-7 p-3"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-green-500 rounded-2xl col-start-3 col-end-5"
              onClick={handleSubmit}
            >
              {/* {disabledButton ? "Fill all the fields" : "Login"} */}
              submit
            </button>
          </div>
        </div>
      </div>
    );

}