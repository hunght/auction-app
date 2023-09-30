// hooks/useAuthRedirect.tsx

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { removeToken } from "~/server/ultil/localStorage";
import { api } from "~/utils/api";

export function useAuthRedirect() {
  const router = useRouter();
  const { data, isLoading, isError, isFetching } =
    api.auth.getProfile.useQuery();

  useEffect(() => {
    if (!isLoading && isError) {
      removeToken();
      // void router.push("/signin"); // Redirect to the login page if not authenticated
    }
  }, [isLoading, isError, router]);
  return { isLoading, user: data?.user, isError, isFetching };
}
