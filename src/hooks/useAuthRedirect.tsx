// hooks/useAuthRedirect.tsx

import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";

export function useAuthRedirect() {
  const router = useRouter();
  const { data, isLoading, isError, isFetching } =
    api.auth.getProfile.useQuery();

  useEffect(() => {
    // if (!isLoading && isError) {
    //   localStorage.removeItem("token");
    //   void router.push("/signin"); // Redirect to the login page if not authenticated
    // }
  }, [isLoading, isError, router]);
  return { isLoading, user: data?.user, isError, isFetching };
}
