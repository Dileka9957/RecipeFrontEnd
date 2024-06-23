"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const router = useRouter();
  const validateForm = () => {
    const newErrors = {
      email: formData.email ? "" : "Email is required",
      password: formData.password ? "" : "Password is required",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/login",
          formData
        );

        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          router.push("/"); // Navigate after successful login
        } else {
          console.error("Token missing in login response"); // Handle missing token
        }
      } catch (error) {
        console.error("There was an error logging in", error);
      }
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if no token found
    }
  }, [router]);

  return (
    <>
      <div className="flex items-center h-screen w-full bg-[#eee6f0]">
        <div className="w-full bg-white rounded-xl shadow-lg py-20 px-10 m-4 max-w-xs md:max-w-sm mx-auto">
          <Link href="/">
            <Image
              src="/logo.png"
              width={95}
              height={0}
              className="d-block mx-auto mb-10"
              alt=""
            />
          </Link>
          <h1 className="block w-full text-start text-3xl fw-bold text-black mb-6">
            Login
          </h1>
          <form
            className="mb-4 md:flex md:flex-wrap md:justify-between gap-5"
            onSubmit={handleSubmit}
          >
            <div className="relative w-full min-w-[200px] h-14">
              <input
                aria-label="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full max-w-xs pr-4 pl-12 py-3 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed"
              />
              <label className="flex w-full select-none pointer-events-none absolute left-0 !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Email address
              </label>
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
            </div>

            <div className="relative w-full min-w-[200px] h-14">
              <input
                aria-label="pass"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full max-w-xs pr-4 pl-12 py-3 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed"
              />
              <label className="flex w-full select-none pointer-events-none absolute left-0 !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Password
              </label>
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#f54e86] hover:bg-[#b8184d] text-white font-medium py-2 px-4 rounded mx-auto w-full"
            >
              Sign In
            </button>
          </form>
          <p className="text-black text-center text-sm mt-10">
            Don&apos;t have an account?&nbsp;&nbsp;
            <Link
              className="link link-grey w-full text-[#f54e86]"
              href="/register"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
