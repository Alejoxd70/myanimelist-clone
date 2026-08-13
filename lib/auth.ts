import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  session: {
    expiresIn: 60 * 60 * 24, // 1 day
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,

    // Send verificaton email using resend
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: user.email,
        subject: 'Verify your email in MyAnimeListClone',
        html: `
        <div>
          <h1>Hi ${user.name || 'there'}! Welcome to MyAnimeListClone </h1>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${url}">Verify Email</a>
        </div>`,
      })
    },
  },
  plugins: [nextCookies()],
})
