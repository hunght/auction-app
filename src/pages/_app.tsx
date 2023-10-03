import { type AppType } from 'next/app';
import { api } from '~/utils/api';
// import { HighlightInit } from "@highlight-run/next/client";
import '~/styles/globals.css';
import { Toaster } from '~/components/ui/toaster';
import { env } from '~/env.mjs';
import { useAuthRedirect } from '~/hooks/useAuthRedirect';
import Header from '~/components/header';

const MyApp: AppType = ({ Component, pageProps }) => {
  const { user, isFetching, isError } = useAuthRedirect();
  return (
    <>
      {/* <HighlightInit
        projectId={env.NEXT_PUBLIC_HIGHT_LIGHT_IO_KEY}
        serviceName="my-nextjs-frontend"
        tracingOrigins={["localhost", "auction-app-rose.vercel.app"]}
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
        }}
      /> */}

      <Header
        username={!isError ? user?.email : undefined}
        balance={user?.balance}
      />

      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default api.withTRPC(MyApp);
