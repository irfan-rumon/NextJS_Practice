"use client";

import { useRouter } from 'next/router'; // Corrected import
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { logout } from "@/redux/features/auth-slice";

const LogoutPage = () => {
 const router = useRouter();
 const dispatch = useDispatch();

 useEffect(() => {
    console.log("Logout clicked...");
    dispatch(logout());
    router.push('/');
 }, [dispatch]);

 return null;
};

export default LogoutPage;