"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        console.log("From Hono: ", data);
      })
      .catch((err) => {
        setMessage("Error query");
        console.log(err);
      });
  }, []);

  return (
    <div className="">
      <main className="min-h-screen w-full flex justify-center items-center">
        <div className="flex flex-col gap-y-[100px]">
          <h1 className="font-bold text-red-600 text-8xl text-center leading-tight">
            Testing the integration of NextJS and Hono
          </h1>
          <p className="flex items-center justify-center gap-x-[20px]">
            <span className="text-[25px] font-bold">Response status:</span>
            <span className="text-[40px] font-semibold text-green-800">
              {message}
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
