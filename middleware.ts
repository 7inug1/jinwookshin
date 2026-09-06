import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/content/i18n";
import { projects } from "@/content/projects";
import { posts } from "@/content/posts";

/** 실제로 존재하는 경로. 여기 없으면 404다 */
const knownPaths = new Set(
  locales.flatMap((locale) => [
    `/${locale}`,
    `/${locale}/projects`,
    `/${locale}/blog`,
    `/${locale}/feed.xml`,
    `/${locale}/opengraph-image`,
    ...projects.map((project) => `/${locale}/projects/${project.slug}`),
    ...posts.map((post) => `/${locale}/blog/${post.slug}`),
  ]),
);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  /* 캐치올이 화면을 그리되 상태 코드는 404로 내보낸다 */
  if (!knownPaths.has(pathname)) {
    return NextResponse.rewrite(request.nextUrl, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|icon.svg|robots.txt|sitemap.xml|.*\\.(?:jpg|png|svg|ico)).*)"],
};
