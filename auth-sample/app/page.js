import Image from "next/image";
import { Fragment } from "react";

export default function Home() {
  return (
      <Fragment>
          <h1 className="text-3xl text-blue-600 font-bold flex justify-center items-center mt-16 ">
              This is public Home Page
          </h1>
      </Fragment>
  );
}
