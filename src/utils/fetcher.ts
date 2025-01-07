export async function fetcher(url: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/${url}`);
    if (!res.ok) throw new Error("데이터 패칭 오류!");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
