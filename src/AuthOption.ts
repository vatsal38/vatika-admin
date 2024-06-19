import { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DataService from '@/services/requestApi';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userToken: { label: 'UserToken', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials) {
          try {
            const response: any = await DataService.Login(credentials);
            if (response?.data?.message === 'Success') {
              return {
                ...response.data,
              } as User;
            } else {
              throw new Error(response?.data?.message);
            }
          } catch (error: any) {
            throw new Error(error.response?.data.message);
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, account, user }) {
      if (trigger === 'update' && session) {
        token.user = session;
        return token;
      }
      if (account?.provider === 'credentials' && user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  debug: false,
  session: {
    strategy: 'jwt',
    maxAge: 86400,
  },
  pages: {
    signIn: '/',
    error: '/',
  },
};
