export async function fetcher(url: string) {
  try {
    // console.log(`${process.env.DEFAULT_API_URL}/${url}`);
    const res = await fetch(`${process.env.DEFAULT_API_URL}/${url}`);
    if (!res.ok) throw new Error("데이터 패칭 오류!");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
