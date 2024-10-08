import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, _user, token }) {
      session.accessToken = token.accessToken;
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token = user.accessToken;
      }
      return token
    }
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("http://localhost:3001/v1/auth/login", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })

        // const user = await res.json()

        const res = { ok: true, user: { id: 'user-id', email: 'email', accessToken: 'accessToken', refreshToken: 'refreshToken', expiresAt: 1234 } };
        const user = res.user;

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }

        // Return null if user data could not be retrieved
        return null
      },
    })
  ]
})

export { handler as GET, handler as POST };

