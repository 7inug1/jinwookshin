# 결정 기록

되돌릴 수 있게 이유를 남긴다. 새 결정은 아래에 덧붙인다.

## D1. React 단독이 아니라 Next.js

`Accept: text/markdown` 콘텐츠 협상과 `/llms.txt`는 서버 층 없이 못 만든다.
SPA로 가면 에이전트 표면이 통째로 사라진다. OG 태그는 부수 효과다.

## D2. shadcn을 쓰되 접근성만

shadcn은 디자인 시스템이 아니라 코드 생성기다. 받은 코드는 그 순간 내 것이 된다.
사이트를 똑같아 보이게 만드는 건 기본값을 그대로 두는 습관이다.
Popover와 Collapsible의 포커스 트랩·ARIA만 가져오고 스타일은 전부 다시 쓴다.

## D3. 잉크는 순검정이 아니다

SSENSE 실측에서 `#333333`이 720회(텍스트 368, 보더 352), `#000000`은 164회뿐이고
상품 셀과 주 내비게이션에만 쓴다. 순검정을 본문에 깔면 화면에서 딱딱하게 튄다.

출처: [shadcn.io/design/ssense](https://www.shadcn.io/design/ssense)

## D4. 전면 모노스페이스를 버림

처음에는 터미널 질감을 노려 모노 하나로 가려 했다.
확인해 보니 SSENSE도 gwern도 세리프 디스플레이 + 그로테스크 UI 구조다.
모노는 수치와 코드에만 남긴다.

## D5. 커스터마이즈 컨트롤을 붙이지 않는다

폰트 크기 조절, 테마 선택, 레이아웃 토글을 만들지 않는다.
SSENSE 앱 팀도 고객이 요구한 '추천 지우기'를 큐레이션 값과 어긋난다는 이유로 만들지 않았다.
조판은 정한 값으로 읽힌다.

출처: [Designing With Ambiguity II](https://medium.com/ssense-tech/designing-with-ambiguity-part-ii-design-doing-not-thinking-4065c07e7373), Jane Wong

## D6. 문서를 짧게 다시 씀

README와 CLAUDE.md가 표와 볼드로 부풀어 있었다.
어휘를 고치는 대신 구조를 바꿨다. 소개는 README, 규칙은 CLAUDE.md, 이유는 이 파일로 나눴다.

나눈 기준은 문서의 종류다. 참조 문서는 목록으로 두고,
산문은 서론과 요약을 빼고 핵심어를 이어받아 쓴다.
두 규칙을 CLAUDE.md에 적어 두고 산문 초안을 다시 짜는 `/restructure` 명령을 만들었다.

출처: [AI가 쓴 글에서 AI 냄새를 빼려면](https://www.threads.com/@wordseed.kr/post/DcgBDA9GRhp), wordseed.kr
