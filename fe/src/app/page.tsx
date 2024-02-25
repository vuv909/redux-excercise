"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../services/auth.service";

type TLogin = {
  email: string;
  password: string;
};

export default function Login() {
  const loginSchema = z.object({
    email: z.string().min(1, "Plase not empty"),
    password: z.string().min(1, "Please not empty"),
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  useLayoutEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/home");
    }
  }, []);

  const onSubmit = (data: TLogin) => {
    login(data).then(
      (res) => {
        localStorage.setItem("accessToken", res.data.access_token);
        router.push("/home");
      },
      (err) => {
        alert(err.response.data.message);
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
