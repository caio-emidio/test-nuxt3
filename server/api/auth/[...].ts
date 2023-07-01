import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";

const runtimeConfig = useRuntimeConfig();

async function refreshAccessToken(refreshToken: {
  accessToken: string;
  accessTokenExpires: string;
  refreshToken: string;
}) {
  try {
    console.warn("trying to post to refresh token");

    const refreshedTokens = await $fetch<{
      data: {
        access_token: string;
        expires: number;
        refresh_token: string;
      };
    } | null>("https://domain.directus.app/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        refresh_token: refreshToken.refreshToken,
        mode: "json",
      },
    });

    if (!refreshedTokens || !refreshedTokens.data) {
      console.warn("No refreshed tokens");
      throw refreshedTokens;
    }

    console.warn("Refreshed tokens successfully");
    return {
      ...refreshToken,
      accessToken: refreshedTokens.data.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.data.expires,
      refreshToken: refreshedTokens.data.refresh_token,
    };
  } catch (error) {
    console.warn("Error refreshing token", error);
    return {
      ...refreshToken,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NuxtAuthHandler({
  // secret needed to run nuxt-auth in production mode (used to encrypt data)
  secret: process.env.NUXT_SECRET,

  providers: [
    // GithubProvider({
    //   clientId: runtimeConfig.public.GITHUB_CLIENT_ID,
    //   clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET,
    // }),
    // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   email: { label: "Email", type: "text" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials: any) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!

        try {
          // const payload = {
          //   username: "t@t.t",
          //   password: "123123",
          // };
          const payload = {
            username: credentials.username,
            password: credentials.password,
          };
          const userTokens = await $fetch<{
            access_token: string;
          } | null>("http://localhost:3001/auth/login", {
            method: "post",
            body: payload,
          });
          const userDetails = await $fetch<{
            data: {
              _id: string;
              firstName: string;
              lastName: string;
              username: string;
              active: boolean;
              createAt: string;
            };
          } | null>("http://localhost:3001/users/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en-US",
              Authorization: `Bearer ${userTokens?.access_token}`,
            },
          });
          if (!userTokens || !userDetails) {
            throw createError({
              statusCode: 500,
              statusMessage: "Auth failed",
            });
          }

          const user = { ...userDetails, accessToken: userTokens.access_token };

          return user;
        } catch (error) {
          console.warn("Error logging in", error);

          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          ...user,
        };
      }

      // Handle token refresh before it expires of 15 minutes
      // if (token.accessTokenExpires) { //  && Date.now() > token.accessTokenExpires
      //   console.warn("Token is expired. Getting a new");
      //   return refreshAccessToken(token);
      // }

      return token;
    },
    async session({ session, token }) {
      console.warn("Calling async session", session, token);
      session.user = {
        ...session.user,
        ...token,
      };

      return session;
    },
  },
});
