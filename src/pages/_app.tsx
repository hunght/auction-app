import { type AppType } from "next/app";
import { api } from "~/utils/api";
// import { HighlightInit } from "@highlight-run/next/client";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";
import { env } from "~/env.mjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      {/* <HighlightInit
        projectId={env.NEXT_PUBLIC_HIGHT_LIGHT_IO_KEY}
        serviceName="my-nextjs-frontend"
        tracingOrigins={["localhost", "auction-h4p9z8i4p-hth321.vercel.app"]}
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
        }}
      /> */}
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default api.withTRPC(MyApp);
