// 고정 환율 (1400원 = 1 USD 기준)
const FIXED_EXCHANGE_RATE: number = 1 / 1400;

export function convertKRWToUSD(krwAmount: number): number {
  if (typeof krwAmount !== "number" || krwAmount < 0) {
    throw new Error("유효한 원화 금액을 입력하세요.");
  }

  // 100을 곱하고 Math.round로 반올림 후 다시 100으로 나누어 소수점 두 자리 고정
  return Math.round(krwAmount * FIXED_EXCHANGE_RATE * 100) / 100;
}

export function convertUSDToKRW(usdAmount: number): number {
  if (typeof usdAmount !== "number" || usdAmount < 0) {
    throw new Error("유효한 달러 금액을 입력하세요.");
  }

  // 100을 곱하고 Math.round로 반올림 후 다시 100으로 나누어 소수점 두 자리 고정
  return Math.round(usdAmount * (1 / FIXED_EXCHANGE_RATE) * 100) / 100;
}
