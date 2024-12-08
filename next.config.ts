import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "shopping-phinf.pstatic.net" }],
  },
};

export default nextConfig;
