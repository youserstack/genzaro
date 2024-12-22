// 숫자 포맷팅 함수
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ko-KR").format(price) + "원"; // 한글 원화 표시
};
