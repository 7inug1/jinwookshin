/** 소문자·숫자·하이픈만. 하이픈으로 시작하거나 끝나지 않는다 */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * 주소는 한 번 정하면 바꾸지 않는다. 제목이 바뀌어도 그대로 둔다.
 * 형식이 틀리거나 겹치면 빌드가 여기서 멈춘다.
 */
export function assertSlugs(kind: string, slugs: string[]) {
  const seen = new Set<string>();

  for (const slug of slugs) {
    if (!SLUG.test(slug)) {
      throw new Error(`${kind} 슬러그 형식 오류: "${slug}" — 소문자·숫자·하이픈만 쓴다`);
    }
    if (seen.has(slug)) {
      throw new Error(`${kind} 슬러그 중복: "${slug}"`);
    }
    seen.add(slug);
  }
}
