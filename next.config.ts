import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  /** dev 서버가 .next를 쓰는 동안 검증 빌드는 다른 디렉토리로 보낸다 */
  distDir: process.env.BUILD_DIR ?? ".next",

  /**
   * 옮겨 간 주소만 리다이렉트한다. 대신할 페이지가 없으면 404를 준다.
   * About의 내용은 통째로 이 글이 됐다.
   */
  async redirects() {
    return [
      { source: "/about", destination: "/ko/blog/why-no-color", permanent: true },
      {
        source: "/:locale(ko|en)/about",
        destination: "/:locale/blog/why-no-color",
        permanent: true,
      },
    ];
  },
};

export default config;
