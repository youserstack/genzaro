import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    DEFAULT_API_URL: process.env.DEFAULT_API_URL,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  },
  images: {
    remotePatterns: [
      //
      { hostname: "shopping-phinf.pstatic.net" },
      { hostname: "blog-next-app.tooroo.rf.gd" },
      { hostname: "store.storeimages.cdn-apple.com" },
      { hostname: "inventstore.in" },
      { hostname: "eg.coca-colahellenic.com" },
      { hostname: "www.mcdonalds.co.kr" },
      { hostname: "upload.wikimedia.org" },
      { hostname: "ko.wikipedia.org" },
      { hostname: "file.kelleybluebookimages.com" },
      { hostname: "rk-se.s3.us-west-2.amazonaws.com" },
      { hostname: "*" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:7000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
