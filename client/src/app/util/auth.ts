import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth";
import jwt from 'jsonwebtoken'
 class userData 
 { sub: string
  name: string
  email: string}
export const authOptions:NextAuthOptions   = {
  // Configure one or more authentication providers
  providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: {label: "email", type: "text" },
          password: {label: "password", type: "password" },
        },
        // add req to the authorize 
        async authorize(credentials,req) {
          const res = await fetch("http://localhost:4000/auth/signin", {
            method: 'POST',
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
            headers: { "Content-Type": "application/json" }
         })
          const resData = await res.json()
          const decoded  = jwt.decode(resData.access_token) as userData
          if (res.ok && resData) {
            const user = {id:decoded.sub, name:decoded.name, email:decoded.email} 
            return user
          }
          else        
            return null
                  
        //
        }
      }),
  ],
  secret : process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
    newUser: '/register'},
  
debug:true,
callbacks:{
  jwt: async ({ token, user }) =>{

    if (user) {
      token.uid = user;
    }

    return token
  },
  session: async ({ session, token }) => {
      // here we put session.useData and put inside it whatever you want to be in the session
      // here try to console.log(token) and see what it will have 
      // sometimes the user get stored in token.uid.userData
      // sometimes the user data get stored in just token.uid

      const uid = token.uid as userData
     
      const user = {
        id: token.sub,
        name:token.name,
        email:token.email
      }
      session.user=user
    return session;
  },
  //process.env.NODE_ENV === "development",
}
}

/*
export async function loginIsRequiredServer() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
}

export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/main");
  }
}


*/