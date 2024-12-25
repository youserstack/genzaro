import NextAuth from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    realname?: string; // realname 속성 추가
  }

  interface Session {
    user: User; // 확장된 User 타입 사용
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    realname?: string;
  }
}

interface NaverProfile extends Profile {
  resultcode: string;
  message: string;
  response: {
    id: string;
    nickname: string;
    profile_image: string;
    name: string;
    email: string;
  };
}

interface KakaoProfile extends Profile {
  id: string;
  kakao_account: {
    email: string;
  };
  properties: {
    nickname: string;
  };
}
