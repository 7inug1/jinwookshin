import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  /** dev 서버가 .next를 쓰는 동안 검증 빌드는 다른 디렉토리로 보낸다 */
  distDir: process.env.BUILD_DIR ?? ".next",

  /** 지운 주소는 404가 아니라 옮겨 간 곳으로 보낸다 */
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/:locale(ko|en)/about", destination: "/:locale", permanent: true },
    ];
  },
};

export default config;
