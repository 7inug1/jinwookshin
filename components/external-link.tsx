/**
 * 사이트 밖으로 나가는 링크. 새 탭에서 열고 화살표를 붙인다.
 * rel의 noopener는 새 창이 원래 창을 조작하지 못하게 막는다.
 */
export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children} ↗
    </a>
  );
}
