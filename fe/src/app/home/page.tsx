"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("accessToken");
    setToken(tokenFromLocalStorage);
  }, []);

  return (
    <div>
      <h1 className="text-8xl text-center">Hello world!</h1>
      {token && (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              setToken(null);
              router.push("/")
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
