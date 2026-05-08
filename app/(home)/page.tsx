"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setMessage(data.message);
        console.log("From Hono: ", data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <h1 className="text-[70px] text-red-500 font-semibold">Loading...</h1>
      </div>
    );
  }

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
              <span>{message}</span>
            </span>
          </p>
          <ul className="mx-auto">
            {users.map((user) => (
              <li key={user.id} className="flex items-center gap-x-[20px]">
                <span className="text-[30px] font-bold">{user.id}</span>
                <h2 className="text-[30px] font-semibold text-gray-600">
                  {user.name}
                </h2>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
