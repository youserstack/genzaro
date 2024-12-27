export default function PaymentOptions() {
  return (
    <div className="PaymentOptions 결제수단 bg-white p-4 rounded-lg shadow-md divide-y">
      <div className="Title 타이틀 p-2 font-semibold text-xl">
        <h1>결제수단</h1>
      </div>

      <div className="PaymentList px-2 py-4 space-y-2">
        {[
          { id: "easybank-payment-item", label: "계좌 간편결제" },
          { id: "easycard-payment-item", label: "카드 간편결제" },
          { id: "general-payment-item", label: "일반결제" },
        ].map((item, index) => (
          <div key={index}>
            <input
              type="radio"
              id={item.id}
              name="payment"
              className="hidden peer"
              defaultChecked={item.id === "easybank-payment-item"}
            />
            <label
              htmlFor={item.id}
              className="RoundedSquare
                flex items-center space-x-2 cursor-pointer 
                peer-checked:ring-2 ring-blue-500 rounded-md p-2
                peer-checked:[&_.OuterRound]:border-8
                peer-checked:[&_.OuterRound]:border-blue-500
                "
            >
              <div className="OuterRound size-6 rounded-full border-2 border-neutral-200">
                <div className="InnerRound size-full rounded-full bg-white"></div>
              </div>

              <span className="text-sm text-gray-800">{item.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
