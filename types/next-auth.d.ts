import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
        _id: string
        firstName: string
        lastName: string
        username: string
        active: boolean
        createAt: string
        accessToken: string
      }
  }
}