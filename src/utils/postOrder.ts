export async function postOrder(order: Order) {
  try {
    // const res = await fetch(`http://localhost:7000/api/order`, {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(order),
    //   // 크로스오리진이면 쿠키를 자동으로 보내지않아서 포함하겠다라는 명시를 해야한다.
    //   credentials: "include",
    // });

    const res = await fetch(`/api/orders`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      //   세임오리진이면 쿠키를 자동으로 보낸다.
      //   credentials: "include",
    });
    if (!res.ok) throw new Error("주문요청실패");
  } catch (error) {
    console.error(error);
  }
}
