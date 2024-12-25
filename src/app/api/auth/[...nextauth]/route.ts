import NextAuth, { NextAuthOptions, User, Account, Profile, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { JWT } from "next-auth/jwt";
import { KakaoProfile, NaverProfile } from "@/types/next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_ID as string,
      clientSecret: process.env.NAVER_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID as string,
      clientSecret: process.env.KAKAO_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile | NaverProfile | KakaoProfile;
    }) {
      if (!account) {
        console.log("\n\n\nno account\n\n\n");
        return false;
      }
      if (account.provider === "naver" && profile && "response" in profile) {
        user.realname = profile.response.name;
      }
      // console.log("\n\n\nsignIn", { user, profile }, "\n\n\n");
      console.log("\n\n\nsignIn", { user }, "\n\n\n");

      return true; // 로그인 허용
    },

    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.realname = user.realname;
      }
      console.log("\n\n\njwt", token, "\n\n\n");

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.realname = token.realname;
      }
      console.log("\n\n\nsession", session, "\n\n\n");

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // 커스텀 로그인 페이지 (credentials를 활용한) 를 만들 경우에 사용한다.
  // pages: { signIn: "/signin" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// else if (account.provider === "google") {
//   // Google의 경우 프로필의 'sub' 필드를 ID로 사용
//   const googleProfile = profile as Profile; // Profile 타입 단언
//   user.name = googleProfile?.name; // Google에서 제공하는 이름
//   user.email = googleProfile?.email; // Google에서 제공하는 이메일
// } else if (account.provider === "kakao" && profile && "kakao_account" in profile) {
//   const kakaoProfile = profile as KakaoProfile;
//   user.name = kakaoProfile.properties.nickname;
//   user.email = kakaoProfile.kakao_account.email;
// }
