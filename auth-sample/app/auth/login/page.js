"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { login } from "@/redux/features/auth-slice";
import { useSearchParams } from 'next/navigation'


const LoginPage = ({ searchParams }) => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [isLoginBtnDisabled, setLoginBtnDisabled] = useState(true);
 const [errorMessage, setErrorMessage] = useState(""); 


 const searchParamss = useSearchParams()
 const { data: session } = useSession();
 const router = useRouter();
 const dispatch = useDispatch();
 const queryMsg = searchParamss.get('message')?.toString();
 //console.log(queryMsg)


  const checkBtnDisability = (val) => {
    if(val.length > 0)setLoginBtnDisabled(false);
    else setLoginBtnDisabled(true);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
       email, 
       password, 
       redirect: false, 
       callbackUrl: "/",
    });
   
    // Check if the sign-in attempt was unsuccessful
    if (!result) {
       setErrorMessage("Wrong credentials. Please try again.");
    }
   };

   useEffect(() => {
    if (session && queryMsg != "You Are Not Authorized!" ) {
        console.log("Session is now available:", session);
        dispatch(login({
         username: session?.user?.name, // Corrected property access
         accessToken: session?.user?.accessToken, // Corrected property access
         roll: session?.user?.roll, // Corrected property access
       }));
        if (router.pathname !== '/') {
          router.push('/');
        }
    }
  }, [session, router]);
   

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
          onChange={(e) => {setEmail(e.target.value); checkBtnDisability(e.target.value); }} 
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {setPassword(e.target.value); checkBtnDisability(e.target.value); }} 
          className="border border-gray-300 rounded-md p-2"
        />

      <style jsx>{`
      button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
      }
      `}</style>

        <button type="submit" 
            disabled={isLoginBtnDisabled}
            className="bg-blue-500 text-white rounded-md p-2">
          Login
        </button>
      </form>
    </div>
 );
};

export default LoginPage;