import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import api from '@/lib/api'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        clientId: { label: 'Client ID', type: 'email' },
        secretKey: { label: 'Secret Key', type: 'password' }
      },
      async authorize(credentials) {
        const token = process.env.INTERBRIDGE_ACCESS_TOKEN

        try {
          const apiObj = await api()
          const { data } = await apiObj.post(
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
    async jwt({ token, user }) {
      // On first sign-in, user object is available
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.id as string
      return session
    }
  },

  pages: {
    signIn: '/sign-in'
  },

  session: { strategy: 'jwt', maxAge: 10 * 60 }
})
