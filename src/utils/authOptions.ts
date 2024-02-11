import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { serverAPI } from '@utils/api'

type User = {
  id: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        clientId: { label: 'Client ID' },
        secretKey: { label: 'Secret Key' }
      },
      authorize: async (credentials) => {
        const token = process.env.INTERBRIDGE_ACCESS_TOKEN

        try {
          const { data } = await serverAPI().post(
            '/login',
            { clientId: credentials?.clientId, secretKey: credentials?.secretKey },
            { headers: { 'x-auth-token': token } }
          )

          return {
            id: data.access_token
          }
        } catch (error: any) {
          throw new Error(error.response ? error.response.data?.message : error.message)
        }
      }
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user as User
      return token
    },

    session: async ({ session, token }) => {
      if (token) session.user = token.user as User
      return session
    }
  },

  session: {
    maxAge: 60 * 60 // 1 hour
  },

  jwt: {
    maxAge: 60 * 60 // 1 hour
  },

  pages: {
    signIn: '/sign-in'
  }
}
