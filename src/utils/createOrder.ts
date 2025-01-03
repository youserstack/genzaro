export async function postOrder(order: Order) {
  try {
    const res = await fetch(`/api/order`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
      //   credentials: "include",
    });
    if (!res.ok) throw new Error("주문요청실패(앱서버:express)");
  } catch (error) {
    console.error(error);
  }
}
