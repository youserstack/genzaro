# GENZARO

- frontend: https://genzaro.vercel.app
- backend: 비공개

이 프로젝트는 가상의 이커머스 웹 애플리케이션입니다. 사용자는 상품을 탐색하고 장바구니에 담고 결제를 해서 구매를 할 수 있습니다.
프론트엔드와 백엔드가 독립적으로 분리되있습니다. 프론트엔드는 nextjs로 작성되었고, 백엔드는 expressjs로 작성되었습니다. 백엔드는 nextjs api routes가 아니라 외부 api 서버입니다.

## 주요기능

##### frontend (vercel deployment)

- 상품탐색
- 장바구니
- 결제
- 주문내역
- reverse proxy (모든 데이터를 백엔드로 요청)

##### backend (외부 api, vercel deployment)

- 인증(oauth2.0)
- 주문데이터
- 제품데이터
