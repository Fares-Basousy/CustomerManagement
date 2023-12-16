import NextAuth from "next-auth"
import { authOptions } from "../../../util/auth"
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}
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