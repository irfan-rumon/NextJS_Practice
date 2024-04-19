"use client"

import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Home() {

    const userSession = useSelector(state => state.authReducer.value.username);

    useEffect( ()=>{
       console.log("Here user session is: ", userSession);
    }, [userSession])

    return (
        <Fragment>
            <h1 className="text-3xl text-blue-600 font-bold flex justify-center items-center mt-16 ">
                This is public Home Page
            </h1>

            <p>User Session:  {userSession} </p>

        </Fragment>
    );
}
