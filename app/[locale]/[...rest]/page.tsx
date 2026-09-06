import { notFound } from "next/navigation";

/**
 * 어떤 경로에도 맞지 않으면 여기로 온다.
 * Next는 notFound()를 부른 자리에서 가장 가까운 not-found를 그리므로,
 * 이 파일이 있어야 404도 사이트 머리글과 바닥글 안에서 보인다.
 */
export default function CatchAll(): never {
  notFound();
}
