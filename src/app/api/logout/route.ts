import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("connect.sid");
  return Response.json({ msg: "next-server connect.sid cookie was deleted." });
}
