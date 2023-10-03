import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { config } from 'dotenv';
config();
export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes('YOUR_MYSQL_URL_HERE'),
        'You forgot to change the default URL',
      ),
    RESEND_API_KEY: z
      .string()
      .refine(
        (str) => !str.includes('RESEND_API_KEY'),
        'You forgot to change the default URL',
      ),
    JWT_SECRET: z
      .string()
      .refine(
        (str) => !str.includes('JWT_SECRET'),
        'You forgot to change the default URL',
      ),
    HIGHT_LIGHT_IO_KEY: z
      .string()
      .refine(
        (str) => !str.includes('HIGHT_LIGHT_IO_KEY'),
        'You forgot to change the default URL',
      ),
    BASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes('BASE_URL'),
        'You forgot to change the default URL',
      ),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
    NEXT_PUBLIC_HIGHT_LIGHT_IO_KEY: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_HIGHT_LIGHT_IO_KEY: process.env.NEXT_PUBLIC_HIGHT_LIGHT_IO_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    HIGHT_LIGHT_IO_KEY: process.env.HIGHT_LIGHT_IO_KEY,
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
