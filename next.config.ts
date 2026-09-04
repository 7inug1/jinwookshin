import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  /** dev 서버가 .next를 쓰는 동안 검증 빌드는 다른 디렉토리로 보낸다 */
  distDir: process.env.BUILD_DIR ?? ".next",
};

export default config;
