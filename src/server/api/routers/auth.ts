import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import * as bcrypt from 'bcrypt';
import { Resend } from 'resend';
import { EmailTemplate } from '~/components/email-template';
import { env } from '~/env.mjs';
import { generateToken, generateUniqueToken } from '~/server/ultil/token';

const resend = new Resend(env.RESEND_API_KEY);
console.log(`==== env.RESEND_API_KEY ===`);
console.log(env.RESEND_API_KEY);
console.log('==== end log ===');

export const authRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new Error('No user');
    }
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.user.userId,
      },
    });
    if (!user) {
      throw new Error('No user');
    }
    return {
      user,
    };
  }),
  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ ctx, input: { email, password } }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      // After user registration, send verification email with a unique token
      const uniqueVerificationToken = generateUniqueToken();

      const users = await ctx.db.user.create({
        data: {
          email,
          password: hashedPassword,
          verification: {
            create: {
              token: uniqueVerificationToken,
            },
          },
        },
      });

      const verificationLink = `${env.BASE_URL}/verify?token=${uniqueVerificationToken}`;

      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Verify your email',
        react: EmailTemplate({
          firstName: verificationLink,
        }) as React.ReactElement,
      });
      return users;
    }),

  signin: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .output(
      z.object({
        token: z.string().nullable(),
        error: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input: { email, password } }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return { token: null, error: 'Something went wrong' };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { token: null, error: 'Something went wrong' };
      }

      return { token: generateToken(user.id), error: null };
    }),

  verify: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input: { token } }) => {
      // Verify the user's email

      const verificationRecord = await ctx.db.verification.findUnique({
        where: {
          token,
        },
      });

      if (verificationRecord) {
        // Mark the email as verified and associate it with the user
        await ctx.db.user.update({
          where: {
            id: verificationRecord.userId,
          },
          data: {
            verification: {
              update: {
                verifiedAt: new Date(),
              },
            },
          },
        });
        return {
          success: true,
        };
      }
      return {
        success: false,
      };
    }),
});
