import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongodbClient from "./lib/mongodbClient";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { authUserCredentialsAction } from "./server/actions/authActions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(mongodbClient),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // logic to salt and hash password
        //   const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if user exists
        user = await authUserCredentialsAction({ email, password });

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      // console.log({ token });

      return token;
    },
    async session({ token, session }) {
      console.log({ token });
      console.log({ session });
      if (token.sub && session.user) {
        //@ts-ignore
        session.user._id = token.sub;
      }
      return session;
    },
  },
});
