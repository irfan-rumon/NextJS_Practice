import Link from "next/link";
import React from "react";

const Navbar = () => {
 
  return (
    <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 px-8 py-3 flex gap-7">
      <Link className="text-sky-600 hover:text-sky-700 font-extrabold text-xl" href={"/"}>
          Home
      </Link>

      <Link className="text-sky-600 hover:text-sky-700 font-extrabold text-xl" href={"/admin"}>
          Admin
      </Link>
      <Link className="text-sky-600 hover:text-sky-700 font-extrabold text-xl" href={"/user"}>
          User 
      </Link>
     
    </div>
  );
};

export default Navbar;