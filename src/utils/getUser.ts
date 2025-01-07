interface SessionCookie {
  name: string;
  value: string;
}

export async function getUser(sessionCookie: SessionCookie) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/profile`, {
      headers: { Cookie: `connect.sid=${sessionCookie.value}` },
    });
    if (!res.ok) throw new Error("유저정보패칭에러");
    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
