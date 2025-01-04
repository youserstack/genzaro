export async function postOrder(order: Order) {
  try {
    const res = await fetch(`/api/orders`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error("주문요청실패");
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
