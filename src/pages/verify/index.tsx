import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/utils/api";

const VerifyTokenPage: React.FC = () => {
  const router = useRouter();
  const { token } = useParams();

  const { mutate, isLoading, data } = api.auth.verify.useMutation();

  useEffect(() => {
    if (typeof token === "string") {
      // Validate the token by sending it to your server
      mutate({ token });
    }
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-md bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Email Verification</h2>
        {data?.success ? (
          <p>
            Your email has been successfully verified.
            <p>
              Back to sign in page{" "}
              <Link href="/signin" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </p>
        ) : (
          <p>
            Invalid or expired verification token. Please check your email for a
            valid link.
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyTokenPage;
