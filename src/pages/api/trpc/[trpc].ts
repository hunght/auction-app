import { createNextApiHandler } from "@trpc/server/adapters/next";
import { Handlers } from "@highlight-run/node";

import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createContext } from "~/server/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : ({ error, req }) => {
          void Handlers.trpcOnError(
            { error, req },
            {
              projectID: env.HIGHT_LIGHT_IO_KEY,
              serviceName: "my-trpc-app",
              serviceVersion: "git-sha",
            },
          );
        },
});
