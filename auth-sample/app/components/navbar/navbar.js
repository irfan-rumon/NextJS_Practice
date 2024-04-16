"use client"

import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
    console.log( "Here session ",  { session });  
 
    return (
        <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 px-8 py-3 flex gap-7">
                <Link className="text-sky-600 hover:text-sky-700 font-extrabold text-xl" href={"/"}>
                    Home
                </Link>

                {session?.user?.user?.roll === 'admin' && (
                       <Link className="text-sky-600 hover:text-sky-700 font-extrabold text-xl" href={"/admin"}>
                          Admin
                       </Link>
                  )
                }

                {session?.user?.user?.roll === 'user' && (
                     <Link className="text-sky-600 hover:text-sky-700 font-extrabold text-xl" href={"/user"}>
                          User 
                      </Link>
                  )
                }

                <div className="ml-auto flex gap-2">
                    {session?.user ? (
                    <>
                        <p className="text-sky-600"> {session.user.name}</p>
                        <button className="text-red-600  text-xl" onClick={() => signOut()}>
                             Logout
                        </button>
                    </>
                    ) : (
                    <button className="text-sky-600 font-[500] text-xl" onClick={() => signIn()}>
                        Login
                    </button>
                    )}
            </div>
        
        </div>
    );
};

export default Navbar;