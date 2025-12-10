"use client";
import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@/src/models/userModel";

export default function LoginPage() {
  const [user, setUser] = React.useState({ email: "", password: "" });

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [disabledButton, setDisabledButton] = React.useState(false);

  const handleLogin = async () => {
    try {
      setLoading(false);
      const response = await axios.post("/api/user/login", user);
      console.log(response.data);
      router.push("/profile");
    } catch (error) {
      console.log("login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] grid-rows-[1fr_2fr_1fr] h-lvh max-w-lvw">
      <div className="grid grid-rows-[1fr_2fr] col-start-2 col-end-3 row-start-2 row-end-3 bg-gray-500 rounded-4xl">
        <div className="flex justify-center items-center m-2 p-4">
          <h2 className="text-black text-3xl">
            {loading ? "Loading..." : "Login"}
          </h2>
        </div>
        <div className=" text-black grid grid-rows-4 grid-cols-6 gap-3 m-3 p-2">
          <input
            className="bg-gray-200 rounded-2xl col-start-1 col-end-7 p-3"
            type="text"
            placeholder="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="bg-gray-200 rounded-2xl col-start-1 col-end-7 p-3"
            type="password"
            placeholder="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            className="bg-green-500 rounded-2xl col-start-2 col-end-4"
            onClick={handleLogin}
          >
            {disabledButton ? "Fill all the fields" : "Login"}
          </button>
          <Link
            className="bg-green-500 rounded-2xl col-start-4 col-end-6 flex justify-center items-center"
            href={"signup"}
          >
            Signup?
          </Link>
        </div>
      </div>
    </div>
  );
}
