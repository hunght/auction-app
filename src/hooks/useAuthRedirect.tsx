// hooks/useAuthRedirect.tsx

import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";

export function useAuthRedirect() {
  const router = useRouter();
  const { data, isLoading } = api.auth.getProfile.useQuery();

  useEffect(() => {
    if (!isLoading && !data) {
      void router.push("/signin"); // Redirect to the login page if not authenticated
    }
  }, [isLoading, data]);
  return { isLoading, user: data?.user };
}
