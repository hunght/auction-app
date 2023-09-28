// pages/signin.tsx
import Link from "next/link";
import React, { useState } from "react";
import { api } from "~/utils/api";

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync, isLoading } = api.auth.signin.useMutation();
  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your sign-in logic here
    mutateAsync({ email, password })
      .then(() => {
        // Redirect to the dashboard
      })
      .catch(() => {
        // Handle errors
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-md bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Sign In</h2>
        <form onSubmit={handleSignin}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full rounded-md border px-4 py-2 focus:ring focus:ring-blue-200"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full rounded-md border px-4 py-2 focus:ring focus:ring-blue-200"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <p className="w-full pt-2 text-right">
          {"Don't have an account? "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
