export default function ShippingInfo() {
  return (
    <div
      className="ShippingInfo 배송정보
      p-4 rounded-lg shadow-md 
      border border-neutral-200 bg-white 
      divide-y 
      "
    >
      <h1 className="p-2 text-xl font-bold">배송정보</h1>

      <div className="px-2 pt-4 space-y-2 font-medium">
        <div className="ShippingRecipient flex gap-4 items-center">
          <p className="font-semibold">홍길동</p>
          <p className="text-sm">010-0000-000</p>
        </div>

        <div className="ShippingAddress">
          <p>서울시 종로구</p>
        </div>

        <div className="ShippingSetting text-end">
          <button>수정</button>
        </div>
      </div>
    </div>
  );
}
