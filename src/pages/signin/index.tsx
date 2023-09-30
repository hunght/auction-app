// pages/signin.tsx
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { setToken } from "~/server/ultil/localStorage";
import { api } from "~/utils/api";
// import { H } from "@highlight-run/next/client";
const SigninPage: React.FC = () => {
  const utils = api.useContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync, isLoading } = api.auth.signin.useMutation();
  const { toast } = useToast();
  const router = useRouter();
  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your sign-in logic here
    mutateAsync({ email, password })
      .then(({ token }) => {
        //store token in local storage
        if (!token) {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          });
          return;
        }
        // H.identify(email);
        setToken(token);
        toast({
          title: "Login success",
          description: "Go to dashboard",
        });
        utils.auth.getProfile
          .invalidate()
          .then(() => {
            void router.push("/");
          })
          .catch((error) => {
            console.log("error", error);
            // Handle errors
            toast({
              title: "Error",
              description: "Something went wrong. Please try again later.",
              variant: "destructive",
            });
          });
      })
      .catch((error) => {
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
