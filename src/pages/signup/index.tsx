// pages/signup.tsx
import Link from "next/link";
import React, { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync, isLoading } = api.auth.signup.useMutation();
  const { toast } = useToast();
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    mutateAsync({ email, password })
      .then(() => {
        toast({
          title: "Signup success",
          description: "Please check your email to verify your account",
        });
      })
      .catch(() => {
        // Handle errors
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-md bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Sign Up</h2>
        <form onSubmit={handleSignup}>
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
            Sign Up
          </button>
        </form>
        <p className="w-full pt-2 text-right">
          {"Already have an account? "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
