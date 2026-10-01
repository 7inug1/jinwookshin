import type { L } from "./i18n";
import { assertSlugs } from "./slug";

export type Project = {
  slug: string;
  title: string;
  /** 언어마다 표기가 다를 수 있다 (예: 현재 / Present) */
  year: L;
  summary: L;
  stack: string[];
  live?: string;
  repo?: string;
  image?: { src: string; alt: L; width: number; height: number };
  /** 화면 비율. 기본은 16:10, 세로가 긴 화면은 3:4 */
  imageAspect?: "16/10" | "3/4";
  /** 목록에서 스택을 세우는 방식. 이미지가 길면 세로로 세워 높이를 맞춘다 */
  stackLayout?: "inline" | "list";
  shot: "transcript" | "grid";
  decisions: { label: L; text: L }[];
  body: { text: L; note?: L }[];
};

export const projects: Project[] = [
  {
    slug: "digestube",
    title: "Digestube",
    year: { ko: "2026.08 - 현재", en: "2026.08 - Present" },
    summary: {
      ko: "유튜브 영상을 책처럼 읽는 서비스. 주소를 받아 전사하고 문단과 목차로 정리한 뒤, 질문과 뜻이 가까운 문단과 해당 영상 시점을 찾아 준다.",
      en: "Reads a YouTube video like a book. It transcribes a URL, organises the text into passages and a table of contents, and finds the passages, and the moments in the video, closest in meaning to a question.",
    },
    stack: ["PostgreSQL", "pgvector", "Supabase", "Gemini API", "KURE-v1", "TypeScript", "Next.js", "Vercel"],
    live: "https://digestube.vercel.app",
    repo: "https://github.com/7inug1/digestube",
    shot: "transcript",
    image: {
      src: "/shot-dg-1.jpg",
      width: 900,
      height: 5523,
      alt: {
        ko: "Digestube 화면. 왼쪽에 목차, 오른쪽에 타임스탬프가 붙은 전사문이 이어진다",
        en: "Digestube. A table of contents on the left, timestamped transcript on the right",
      },
    },
    decisions: [
      {
        label: {
          ko: "전사",
          en: "Transcription",
        },
        text: {
          ko: "배포 서버의 유튜브 접근 제약 때문에 URL을 직접 받는 Gemini API를 사용했다. 도입 당시 Gemini 3.5 Flash를 한국어 영상 6편에 적용해 실행·문장 끝·시간표시 파싱 등 6개 기준을 통과했다. 현재 기본 모델의 검증 결과와는 구분한다.",
          en: "YouTube access restrictions on the deployment server led me to Gemini, which accepts video URLs directly. At adoption, Gemini 3.5 Flash passed six checks, including execution, sentence endings and timestamp parsing, on six Korean videos. These are historical results, not validation of the current default model."
        },
      },
      {
        label: {
          ko: "문단",
          en: "Passages",
        },
        text: {
          ko: "고정 길이는 문장 중간을 잘랐고, 문장 경계 방식은 하나의 설명을 뜻과 무관한 길이에서 나눴다. 모델에는 화제가 시작되는 문장 번호만 고르게 하고, 원문은 코드가 그대로 보존한다. 실패하면 문장 경계 방식으로 되돌린다.",
          en: "Fixed-length splits cut sentences in half, and sentence-boundary splits still broke one explanation at arbitrary lengths. The model now only picks the sentence numbers where a topic starts, and the code keeps the original text intact. If that fails it falls back to sentence boundaries.",
        },
      },
      {
        label: {
          ko: "임베딩",
          en: "Embeddings",
        },
        text: {
          ko: "선정 당시 89문단·답이 있는 질문 8개·상위 3개라는 조건에서 KURE-v1과 BGE-M3를 비교했다. BGE-M3가 사전에 정한 교체 조건을 충족하지 못해 KURE-v1을 유지했다. 이후 문단 구성이 바뀌었으므로 이 결과를 현재 검색 성능으로 사용하지 않는다.",
          en: "At selection time, I compared KURE-v1 and BGE-M3 on 89 passages and eight answerable questions with top-3 retrieval. BGE-M3 did not meet the predefined replacement rule. Passage boundaries have since changed, so this historical comparison does not describe current retrieval performance."
        },
      },
      {
        label: {
          ko: "목차",
          en: "Contents",
        },
        text: {
          ko: "문단마다 제목을 붙이던 방식에서 전사문 전체의 주요 목차를 만드는 방식으로 바꿨다. 같은 전사문 4편에 두 방식을 다시 실행해 목차 합계 101→25개(약 75% 감소)를 확인했다. 이는 항목 수 비교이며 제목 품질의 개선율은 아니다. 제목의 근거 문장을 원문과 대조한다.",
          en: "I changed from one heading per passage to headings for the whole transcript. Rerunning both methods on the same four transcripts produced 101 versus 25 headings, about 75% fewer. This measures heading count, not a gain in title quality. Supporting quotes are checked against the source text."
        },
      },
      {
        label: {
          ko: "저장소",
          en: "Storage",
        },
        text: {
          ko: "문단 텍스트와 타임스탬프, 벡터를 한 행에 담으면 조회가 한 번에 끝난다. 그래서 Postgres와 pgvector를 골랐고, 서버와 같은 지역(서울)에 둘 수 있는 Supabase로 결정했다.",
          en: "Keeping passage text, timestamps, and the vector in one row means one query instead of two systems. So Postgres with pgvector, hosted on Supabase where it can sit in the same region (Seoul) as the server.",
        },
      },
      {
        label: {
          ko: "검색 순서",
          en: "Ranking",
        },
        text: {
          ko: "관련 문단이 후보에는 있지만 순위가 밀리는 문제를 확인하고 리랭커를 붙였다. 개발용 질문 8건의 필수 근거 17개 중 상위 3개에 든 근거가 6개에서 8개로 늘었다. 결과를 먼저 보여 주고, 5초 안에 재정렬이 끝나지 않으면 원래 순서를 유지한다.",
          en: "The right passages were among the candidates but ranked too low, so I added a reranker. On eight development questions, the required evidence in the top 3 rose from 6 to 8 of 17. Results appear first, and if reranking does not finish within five seconds the original order stays.",
        },
      },
      {
        label: {
          ko: "평가",
          en: "Evaluation",
        },
        text: {
          ko: "질문 30개를 직접 검수해, 고칠 때 쓰는 개발용 15개와 개선이 끝난 뒤 한 번만 푸는 검증용 15개로 나눴다. 검증용 15개 중 14개에서 영상 속 근거로 답할 수 있는 질문인지를 맞게 판단했고, 답이 없는 질문 4개에는 모두 답하지 않았다.",
          en: "I reviewed 30 questions by hand and split them into 15 for development and 15 held out until the work was done. On the held-out set, it judged correctly in 14 of 15 whether the videos could answer the question, and declined all four questions with no answer in the videos.",
        },
      },
      {
        label: {
          ko: "물어보기",
          en: "Answers",
        },
        text: {
          ko: "검증용 15개 중 11개를 맞게 처리했다(맞게 답함 7, 답이 없는 질문 거절 4). 일부만 맞은 3개는 모두 여러 영상에 걸친 질문에서 두 번째 영상을 찾지 못한 경우였다. 채점은 사람이 아닌 Claude가 했다.",
          en: "It handled 11 of the 15 held-out questions correctly: 7 correct answers and 4 correct refusals. The 3 partly correct answers were all multi-video questions where the second video was missed. Grading was done by Claude, not by a person.",
        },
      },
      {
        label: {
          ko: "쓰지 않은 방식",
          en: "Rejected approach",
        },
        text: {
          ko: "전사 비용을 줄이려고 영상 대신 음성만 Gemini에 넘겨 봤다. 비용은 약 24% 줄었지만(비교 가능한 5편 기준 추정), 6편 중 1편은 재생 시각이 밀리고 1편은 \"음\" 같은 군말을 더 많이 받아써 기존 자막과 맞춰 볼 수 있는 부분이 35%에 그쳐, 미리 정한 기준을 넘지 못해 쓰지 않았다.",
          en: "To cut transcription cost, I tried sending audio only instead of the video. Estimated cost fell about 24% on five comparable videos, but one of six videos drifted in timestamps and another transcribed many more filler words such as \"um,\" leaving only 35% comparable with the existing captions, so it missed the criteria I had set in advance and I did not adopt it.",
        },
      },
      {
        label: {
          ko: "운영 점검",
          en: "Operational check"
        },
        text: {
          ko: "운영 환경에서 138초 영상 1편을 신규 처리해 전사·문단·목차·임베딩 준비까지 53.215초를 기록했다. 브라우저 렌더링은 제외한 단일 실행이며 평균 처리 시간이 아니다. 이번 실행의 실제 비용은 측정하지 않았다.",
          en: "A single new 138-second video took 53.215 seconds to finish transcription, passage creation, headings and embeddings against the deployed service. This one run excludes browser rendering and is not an average. Its actual cost was not measured."
        }
      },
    ],
    body: [
      {
        text: {
          ko: "유튜브에 저장해 둔 영상을 끝까지 보지 않고도 필요한 대목을 읽고 다시 찾는 것이 목적이다. 흐름은 URL 입력 → Gemini 전사 → 문단·목차 생성 → 임베딩 저장 → 질문으로 관련 문단 검색이다.",
          en: "The goal is to read and revisit useful parts of saved videos without watching them end to end. The flow is URL → Gemini transcription → passages and headings → stored embeddings → passage retrieval for a question."
        }
      },
      {
        text: {
          ko: "유튜브 주소를 받아 Gemini API로 전사하고, 문단과 목차로 정리해 임베딩한 뒤, 질문과 뜻이 가까운 문단과 영상 시점을 찾아 주는 의미 검색 서비스다. 수집부터 화면과 배포까지 혼자 진행했다.",
          en: "Give it a YouTube URL and it transcribes through the Gemini API, organises the text into passages and a table of contents, embeds them, and finds the passages and video moments closest in meaning to a question. I built the whole path alone, from ingestion to interface to deploy.",
        },
      },
      {
        text: {
          ko: "검색은 글자 일치가 아니라 임베딩 유사도로 문단을 찾고 관련 문장을 강조해 보여 준다. 질문에 답할 때는 상위 문단 3개만 근거로 삼아 문장마다 근거 번호를 붙이고, 근거가 부족하면 지어내지 않고 \"찾지 못했어요\"로 답한다.",
          en: "Search finds passages by embedding similarity rather than string matching and highlights the related sentence. When it answers a question, it uses only the top three passages as evidence and cites them sentence by sentence; when the evidence is not enough, it says it could not find an answer instead of making one up.",
        },
      },
    ],
  },
  {
    slug: "vizuden",
    title: "VIZUDEN",
    year: { ko: "2026.03 - 2026.06 · 이후 신규 운영 중단", en: "2026.03 - 2026.06 · New operations stopped" },
    summary: {
      ko: "정체성 기반 스타일 진단 AI 서비스. 설문 응답을 Claude API로 분석해 남성 사용자에게 스타일 방향과 브랜드를 제안한다.",
      en: "An identity-based style diagnosis service. It analyses survey answers with the Claude API and proposes a direction and brands for men.",
    },
    stack: ["React", "Claude API", "Supabase", "Google OAuth", "Vercel"],
    live: "https://vizuden.com",
    repo: "https://github.com/7inug1/vizuden",
    shot: "grid",
    image: {
      src: "/shot-vz-1.jpg",
      width: 800,
      height: 6102,
      alt: {
        ko: "VIZUDEN 보고서 화면. 인물 사진과 스타일 진단 문단이 이어진다",
        en: "A VIZUDEN report. Portraits followed by the style diagnosis",
      },
    },
    imageAspect: "3/4",
    stackLayout: "list",
    decisions: [
      {
        label: {
          ko: "파싱",
          en: "Parsing",
        },
        text: {
          ko: "응답 형식이 어긋났을 때 보고서를 읽을 수 있도록, JSON 파싱 실패 시 본문에서 JSON 구간을 다시 추출하는 폴백을 구현했다. 이 처리는 형식 오류에 대한 대응이며 추천 내용의 정확성을 검증하지는 않는다.",
          en: "To handle malformed responses, I added a fallback that extracts and parses the JSON portion of the response body. This handles formatting failures; it does not validate the accuracy of the recommendations."
        },
      },
      {
        label: {
          ko: "스트리밍",
          en: "Streaming",
        },
        text: {
          ko: "로컬 완료 사례 6건에서 생성 완료까지 102~128초가 걸렸다. 완성 전에도 읽을 수 있게 도착한 내용을 순차 표시했다. 첫 화면 표시 시간이나 전체 생성 시간의 단축 효과는 측정하지 않았다.",
          en: "Six completed local cases took 102–128 seconds. Incoming content is displayed progressively so it can be read before completion. Time to first visible content and any reduction in total generation time were not measured."
        },
      },
      {
        label: {
          ko: "차트",
          en: "Charts",
        },
        text: {
          ko: "예산 배분 하나를 보여주려고 라이브러리를 들이지 않고 SVG 도넛 차트를 직접 그렸다.",
          en: "One budget breakdown did not justify a dependency, so I drew the donut chart in SVG.",
        },
      },
      {
        label: {
          ko: "로그인",
          en: "Sign-in",
        },
        text: {
          ko: "설문을 바로 시작할 수 있도록 로그인을 요구하지 않았다. 끝난 뒤 로그인하면 게스트 세션에 쌓인 응답·보고서·피드백을 계정으로 옮긴다. 인증은 Supabase 구글 OAuth를 썼고 베타 운영용 어드민 대시보드도 함께 만들었다.",
          en: "The survey starts without an account. If the user signs in afterwards, the answers, report, and feedback collected in the guest session are moved onto the account. Auth is Supabase with Google OAuth, and there is an admin dashboard for running the beta.",
        },
      },
      {
        label: {
          ko: "보고서 표시 일치 · 9월 유지보수",
          en: "Consistent reports · September maintenance"
        },
        text: {
          ko: "완료 직후와 새로고침 후 문장이 달라지는 문제를 발견했다. DB 저장 확인 뒤 완료를 알리고 화면을 최종 저장본으로 전환하도록 수정했다. Playwright로 로컬·배포 가상 사례 각 1건에서 화면 일치를 재확인했다.",
          en: "The report text differed immediately after completion and after reload. Completion now follows confirmed database storage, and the screen switches to the saved report. Playwright checks confirmed matching views for one local and one deployed synthetic case."
        }
      },
      {
        label: {
          ko: "품질 점검과 운영 판단",
          en: "Quality review and operating decision"
        },
        text: {
          ko: "세 가지 근거로 2026년 6월 중순 신규 운영을 중단했다. 옷을 즐기는 사람을 모으려던 방향이 실제 수요(속한 무리에 어울리기, 이성에게 돋보이기)와 달랐고, 직업·정체성과 브랜드를 잇는 지식 없이는 AI 추천이 일반론으로 흘렀으며, 첫 보고서 이후 계속 쓰게 할 이유를 만들기 어려웠다. 이후 9월 개발용 가상 사례 5건을 점검해 입력에 없는 심리 단정과 브랜드 정보 오류를 확인했다. 전문가 지식 구조화·사실 검증·사람 검수가 필요하다고 정리했다. 독립된 사용자 품질 평가는 아니다.",
          en: "I stopped new operations in mid-June 2026 for three reasons: the direction of gathering people who enjoy clothes did not match actual demand (fitting in with a group, standing out to others), AI recommendations drifted into generic advice without knowledge linking jobs and identities to brands, and there was no reason to keep using the service after the first report. A subsequent September review of five development scenarios found unsupported psychological inferences and brand errors. Structured expert knowledge, fact checking and human review would be needed. This was not an independent user-quality evaluation."
        }
      },
    ],
    body: [
      {
        text: {
          ko: "커피챗에서 확인한 패션 지식·옷 매칭·착용 상황의 고민을 바탕으로 기획했다. 설문을 스타일 방향·브랜드·상황별 코디·예산 계획으로 바꾸는 프롬프트와 보고서 형식을 설계하고 개발·배포·초기 운영을 혼자 진행했다.",
          en: "I planned the service around clothing knowledge, outfit matching and everyday situations discussed in coffee chats. I designed the prompts and report structure for style direction, brands, outfits and budget plans, and handled development, deployment and early operations myself."
        }
      },
      {
        text: {
          ko: "커뮤니티에서 베타 참여자를 모집해 보고서를 제공하고, 그중 4명과 오프라인 피팅을 진행했다. 4명은 피팅 참여자 수이며 전체 이용자 수가 아니다. 2026년 3월부터 6월 중순까지 기획·개발·운영한 뒤 신규 운영을 중단했고, 이후 유지보수와 9월 가상 사례 점검을 진행했다.",
          en: "I recruited beta participants through a community, provided reports and held offline fittings with four of them. Four is the fitting participant count, not total users. Planning, development and operations ran from March to mid-June 2026; after new operations stopped, the work focused on maintenance and a September synthetic-case review."
        }
      },
      {
        text: {
          ko: "처리 흐름은 설문 입력 → 검색 자료 수집 → Claude 보고서 생성·스트리밍 → 텍스트 윤문 → Supabase 저장 → 최종 보고서 표시다. 검색 자료와 프롬프트 규칙만으로 추천의 정확성을 보장할 수 없다는 점을 확인했다.",
          en: "The flow is survey → search context → Claude generation and streaming → text polishing → Supabase storage → final report display. Search context and prompt rules alone did not guarantee accurate recommendations."
        }
      }
    ],
  },
];

assertSlugs("프로젝트", projects.map((item) => item.slug));

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** 보관. 지금 작업과 성격이 달라 프로젝트 목록 밖에 둔다 */
export const archive = [
  {
    year: "2022",
    title: "7inug1.github.io",
    url: "https://7inug1.github.io",
    image: {
      src: "/shot-ar-1.jpg",
      width: 900,
      height: 1235,
      alt: {
        ko: "7inug1.github.io 화면. React · JavaScript · HTML/CSS로 나눈 목차와 프로젝트 목록",
        en: "7inug1.github.io. A contents list split into React, JavaScript, and HTML/CSS",
      },
    },
    note: {
      ko: "바닐라 코딩 부트캠프를 마치고 첫 구직을 준비하며 만든 포트폴리오. React·JavaScript·HTML/CSS로 만든 작업을 모아 뒀다.",
      en: "The portfolio I built while preparing for my first job search, right after the Vanilla Coding bootcamp. It collects the work I made in React, JavaScript, and HTML/CSS.",
    } satisfies L,
  },
];
