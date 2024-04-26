import { signIn, signInWithGoogle } from "@/services/auth/services";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn({ email });
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) return user;
          return null;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.phone = user.phone;
        token.role = user.role;
        token.id = user.id;
        token.image = user.image;
        token.type = user.type;
      }
      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: "google",
        };
        console.log("user: ", user);

        await signInWithGoogle(data, (result: any) => {
          console.log("data: ", data);
          console.log("signInWithGoogle: ", result);
          if (result.status) {
            token.email = result.data.email;
            token.fullname = result.data.fullname;
            token.type = result.data.type;
            token.image = result.data.image;
            token.role = result.data.role;
            token.id = result.data.id;
          }
        });
      }
      return token;
    },
    async session({ session, token }: any) {
      //console.log("token: ", token);
      //console.log("session: ", session);
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("phone" in token) {
        session.user.phone = token.phone;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("type" in token) {
        session.user.type = token.type;
      }
      if ("id" in token) {
        session.user.id = token.id;
      }

      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });
      session.accessToken = accessToken;
      //console.log("session: ", session);
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
