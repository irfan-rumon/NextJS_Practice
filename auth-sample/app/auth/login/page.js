"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from 'next/navigation'


const LoginPage = ({ searchParams }) => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [errorMessage, setErrorMessage] = useState(""); 

 const router = useRouter();


 const onSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email, 
      password, 
      redirect: false, 
      callbackUrl: "/",
    });

    // Check if the sign-in attempt was unsuccessful
    if (!result.ok) {
      setErrorMessage("Wrong credentials. Please try again.");
    } else {
      // If successful, redirect 
      router.push('/');
    }
 };

 return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600">
      {searchParams?.message && (
        <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">
          {searchParams.message}
        </p>
      )}
      {errorMessage && (
        <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">
          {errorMessage}
        </p>
      )}
      <form onSubmit={onSubmit} className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <input
          type="text"
          placeholder="Email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          className="border border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Login
        </button>
      </form>
    </div>
 );
};

export default LoginPage;
