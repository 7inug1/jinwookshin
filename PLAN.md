# 기획

포트폴리오 웹사이트 하나. 여기서 다 정하고, 굳은 것만 나중에 파일로 뺀다.

지금은 이 파일과 자리표시자 README 둘뿐이다.

---

## 뭘 만드나

jinwookshin.vercel.app. 나중에 도메인 살 수도.

읽는 사람은 채용 담당자, 그리고 그들이 쓰는 AI. 목표 반응은 "만들 줄 알고, 판단을 남긴다".
이력서 1차 피드백에서 Digestube가 한 줄로 비어 있는 게 [필수] 항목으로 잡혔다.
그 상세를 이력서보다 여기서 먼저 쓰고 역수출하는 게 이 사이트의 실용적 목적이다.

## 왜 이렇게 생겼나

브루탈리즘을 외형이 아니라 원리로 가져온다. 재료의 정직, 구조의 노출.
건축에서 날 콘크리트를 감추지 않듯, 웹의 재료인 텍스트와 HTML을 감추지 않는다.

- 시맨틱 HTML이 곧 레이아웃
- 색은 작업물만 갖는다
- JS 없이도 전문이 읽힌다
- 표층은 짧게, 근거는 펼쳐서
- 사람과 에이전트 둘 다 읽는다

neo-brutalism(두꺼운 테두리, 하드 섀도우, 형광색)은 아니다. 그게 조악해 보이는 쪽이다.

## 레퍼런스와 도출

준 링크 순서대로. 각 항목은 그 링크에서 실제로 뭘 정했는지까지 적는다.

### 1. [ssense.com](https://www.ssense.com) — 전체 방향

- 크롬은 무채색, 색은 작업물만. 브랜드 컬러 CTA 없음
- 11px 대문자 라벨과 거대 이미지. 중간 크기가 없다
- 최상위 내비게이션 4~6개, 좌측 정렬 고정 그리드
- 홈은 목록이 아니라 관점으로 연다
- 여백을 신뢰의 신호로 쓴다

베끼면 패션 사이트가 된다. 가져올 건 절제의 규율이고 재료는 아래 2번에서.

### 2. [junha.xyz](https://junha.xyz/) — 계보와 기능 하나

- 대괄호 링크, 시스템 폰트, 흑백 고대비. 취향이 아니라 20년짜리 계보가 있다
- Copy as Markdown은 장식이 아니라 포지셔닝. AI 엔지니어 지원자 사이트가
  LLM이 읽기 좋게 만들어져 있다는 것 자체가 직무 증거다 → 에이전트 표면으로 채택
- 다만 미니멀이 아니라 조약하다고 판단했다. 제약을 일관되게 안 걸면 이렇게 된다

### 3. [gwern.net](https://gwern.net/) — 구조의 원본

셋 중 유일하게 가독성이 좋다고 본 사이트. 이유가 [design](https://gwern.net/design)에 직접 적혀 있다.

- 네 원칙: 미니멀리즘 · 접근성/점진적 향상 · 속도 · semantic zoom
- 팔레트를 회색조로 묶어 두고 "이 제약으로 읽을 만한가"를 실험한다고 명시
- 조악해 보이지 않는 이유는 제약이 일관되고 조판이 정밀하기 때문이다
- **빙산 구조** 채택: 초록 → [사이드노트](https://gwern.net/sidenote) → 각주 → 접이식 → 부록.
  이력서 피드백의 "첫 화면은 가벼워야 하는데 밀도는 있어야 한다"를 그대로 푼다

### 4. [노마드 코더, 구글이 웹사이트를 AI용으로 바꾸기 시작했다](https://www.youtube.com/watch?v=tfrDp6FnhZc) — 에이전트 표면

자막을 못 가져와 제목과 시점으로 추론한 배경이다. 2026년 이 주제의 축은 셋.

- **OKF**(Open Knowledge Format, 2026.06 Google): YAML frontmatter Markdown 번들.
  콘텐츠가 MDX면 생성이 거의 공짜
- **콘텐츠 협상**: `Accept: text/markdown` 보낸 클라이언트에만 Markdown. 크롤러는 HTML
- **llms.txt**: 루트 사이트 지도. 단 Google은 Search에 불필요하다고 공식 입장을 냈다
- WebMCP(W3C 제안)는 실험 항목으로만

→ **Next.js를 고른 결정적 이유.** 협상과 라우트 발행에 서버 층이 필요하다

### 5. [Designing With Ambiguity II](https://medium.com/ssense-tech/designing-with-ambiguity-part-ii-design-doing-not-thinking-4065c07e7373) — 일하는 방식

Jane Wong, 2019. Cloudflare가 막아 원문을 붙여받았다.

- 낮은 충실도로 자주 만들고 라이브로 내보낸다. 베타 앱을 실제로 출시해 검증했다
- 가설에 충실도를 맞춘다. 종이 / Figma 클릭스루 / Principle 애니메이션
- **connect the dots, but not all of them.** 모든 배움이 인사이트가 아니고
  모든 인사이트가 실행 가능하지 않다. 잇지 않을 점을 고르는 게 일이다
- 고객이 요구한 '추천 지우기'를 큐레이션 값과 어긋난다는 이유로 만들지 않았다.
  user experience as brand experience

→ **커스터마이즈 컨트롤을 안 만드는 근거.** 이력서의 "답해도 되는 선은 만드는 사람의 몫"과 같은 주장이라 about에서 남의 사례로 쓸 수 있다

### 6. [SSENSE DESIGN.md](https://www.shadcn.io/design/ssense) — 실측값

추정이 아니라 사이트에서 뽑은 수치. 여기서 색과 서체가 뒤집혔다.

- `#333333` 720회(텍스트 368, 보더 352). `#000000`은 164회로 상품 셀·주 내비게이션 한정
- 회색 7개로 수렴. 브랜드 컬러 CTA 없음
- 세리프 디스플레이(JHA Times Now) + 그로테스크 라벨(Favorit), 라벨 전부 대문자
- 세리프는 페이지당 한 번. "the single editorial moment per page"
- radius 0(아바타 칩만 10px), 간격 20/30/40/64/80/120

→ **잉크를 순검정에서 내렸고, 전면 모노를 폐기했다.** 미니멀과 조악함이 갈리는 지점이 여기다

### 7. [SSENSE Favorit Montreal — Dinamo](https://abcdinamo.com/custom/typeface-ssense-favorit-montreal) — 누가 만들었나

- 2017 브랜드 전환 디자인 디렉션: **Eric Hu**(당시 Director of Design) · **Matthew Tsang**
- 전용 서체는 Dinamo(Johannes Breyer, Fabian Harb / 마스터링 Chi-Long Trieu). Favorit 기반 2웨이트 + 이탤릭
- Eric Hu는 rebrand가 아니라 **brand transition**이라 불렀다.
  "어떤 디자이너는 맥락과 자신을 분리하고 미학에만 집중한다. 나는 한 번도 그런 적 없다"

→ 미니멀리즘은 스타일이 아니라 맥락에서 나온 결론이다. 베끼지 말고 같은 방식으로 내 맥락에서 결론을 낸다

### 8. [AI가 쓴 글에서 AI 냄새를 빼려면](https://www.threads.com/@wordseed.kr/post/DcgBDA9GRhp) — 글쓰기

wordseed.kr, 2026-08-26. 이것도 막혀서 원문을 붙여받았다.

- AI 냄새는 어휘가 아니라 **구조**에서 난다. 지시가 구체적이지 않으면 학습 데이터 평균 문체로 돌아간다
- 주제의 중요성을 설명하는 서론을 삭제한다. 이 글에서만 할 수 있는 판단이나 사례로 연다
- 시작점은 종류를 따른다. 주장은 판단부터, 경험은 장면부터, 분석은 사례부터
- 앞 문단의 핵심어를 다음 문단이 이어받는다. '또한, 한편, 따라서'로 관계를 설명하지 않는다
- 마지막에 요약이나 교훈을 붙이지 않는다

→ **about 페이지와 블로그 글에 적용.** 참조 문서(이 파일)는 예외로 목록을 쓴다.
스캐폴드할 때 `/restructure` 명령으로 되살린다

## 정한 것

1. **Next.js.** React 단독 탈락. `Accept: text/markdown` 협상과 `/llms.txt`에 서버 층이 필요하다
2. **shadcn은 쓰되 접근성만.** Popover·Dialog·Collapsible·Tooltip. 기본 테마는 전부 걷어낸다
3. **잉크는 순검정이 아니다.** `#333` 계열, 순검정은 아껴 쓴다
4. **전면 모노 폐기.** 시스템 세리프(디스플레이) + Pretendard(본문) + IBM Plex Mono(데이터)
5. **커스터마이즈 컨트롤 없음.** 폰트 크기·테마·레이아웃 토글 안 만든다
6. **문서는 최소로.** 굳기 전에는 이 파일 하나

스택: Next.js(App Router, TS) · Tailwind v4 `@theme` · MDX · Radix · Biome · Vercel
예산: 페이지 100KB · LCP 1.5s · CLS 0 · 런타임 의존성 10개

## 아직 안 정한 것

- 색 값. 회색 5~7개를 실제 hex로
- 타입 스케일. 몇 단계로 할지
- 사이트맵. `/` `/work` `/work/digestube` `/about` `/writing` 이 맞나
- about 페이지에 철학을 어떻게 쓸지. 산문 다섯 줄
- 에이전트 표면 어디까지. llms.txt는 쉽고 MCP 서버는 크다
- 도메인 살지

## 다음

1. 색과 타입 스케일 확정
2. 사이트맵 확정
3. Next 스캐폴드
4. Digestube 상세 작성
5. 배포하고 예산 측정

## 나중에 뺄 파일

여기서 굳으면 옮긴다. 지금은 만들지 않는다.

- `CLAUDE.md` — 토큰, 금지 목록, 커밋 규칙(Conventional Commits). 스캐폴드 시작할 때
- `.claude/commands/restructure.md` — 8번의 프롬프트. 산문을 쓰기 시작할 때
- `docs/decisions.md` — 정한 것의 근거를 길게. 결정이 열 개 넘으면
- `README.md` — 목차·스택·구조. 사이트가 배포된 뒤
