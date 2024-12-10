import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      //
      { hostname: "shopping-phinf.pstatic.net" },
      { hostname: "blog-next-app.tooroo.rf.gd" },
      { hostname: "store.storeimages.cdn-apple.com" },
      { hostname: "inventstore.in" },
    ],
  },
};

export default nextConfig;
