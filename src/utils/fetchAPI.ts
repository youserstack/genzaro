export async function fetchAPI(url: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/${url}`);
    if (!res.ok) throw new Error("데이터 패칭 오류!");
    return res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function getUser(sessionCookie: { name: string; value: string }) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/profile`, {
      headers: { Cookie: `connect.sid=${sessionCookie.value}` },
    });
    if (!res.ok) throw new Error("유저정보패칭에러");
    const data = await res.json();
    // return data.user;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
