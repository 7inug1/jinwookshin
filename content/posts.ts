import type { L } from "./i18n";

export type Block =
  | { type: "p"; text: L }
  | { type: "aside"; lines: L[] }
  | { type: "rule" };

export type Post = {
  slug: string;
  title: L;
  date: string;
  summary: L;
  body: Block[];
};

const p = (ko: string, en: string): Block => ({ type: "p", text: { ko, en } });
const aside = (lines: [string, string][]): Block => ({
  type: "aside",
  lines: lines.map(([ko, en]) => ({ ko, en })),
});
const rule: Block = { type: "rule" };

export const posts: Post[] = [
  {
    slug: "bi-encoder-chunk-rank",
    title: {
      ko: "bi-encoder에서 정답 청크는 항상 검색 순위 최상위권에 들까?",
      en: "Does the right chunk always rank at the top with a bi-encoder?",
    },
    date: "2026-09-05",
    summary: {
      ko: "정답이 4등과 17등에 있었다. 17등 청크에서 정답 부분만 떼어 다시 재니 0.486이 0.774가 됐다.",
      en: "The answer sat at rank 4 and rank 17. Splitting the answer out of the rank-17 chunk moved its score from 0.486 to 0.774.",
    },
    body: [
      p(
        "bi-encoder를 사용해도 모종의 이유로 원하는 결과를 못찾아올 수 있을 것 같았다. 실습을 진행했을 때에도 질문에 맞지 않은 답을 받은 경우가 있었기 때문이다.",
        "I suspected a bi-encoder could still fail to retrieve what I wanted. During the exercise I had already seen answers that did not match the question.",
      ),
      p(
        "그래서 질문과 청크들이 주어진 실습 중에, 클로드 코드를 활용하여 정답 청크를 찾지 못하는 경우를 만들어보려고 했다.",
        "So while working through an exercise with a set of questions and chunks, I used Claude Code to try to construct a case where retrieval misses the right chunk.",
      ),
      p(
        "실습 과제는 한 우주 관련 유튜버가 일반인들을 위해 쉽게 설명하는 영상의 내용이었다.",
        "The material was a transcript from a space YouTuber explaining things for a general audience.",
      ),
      aside([
        ["예시 1)", "Example 1"],
        ['질문: "별이 죽으면 어떻게 돼?"', 'Question: "What happens when a star dies?"'],
        [
          "답변(검색 순위 1등, 유사도 0.740): 자 오늘도 별 보러 오셨군요. {유튜버 이름}입니다. 오늘은 별의 일생을 따라가 봅니다. 별은 성운에서 태어나요... 자 여기서 포인트 무거운 별일수록 빨리 죽어요",
          "Retrieved (rank 1, score 0.740): Here to look at stars again? This is {channel}. Today we follow the life of a star. Stars are born in nebulae... and here is the point: the heavier the star, the faster it dies.",
        ],
      ]),
      aside([
        ["예시 2)", "Example 2"],
        [
          '질문: "망원경 살 때 배율 높은 게 좋아?"',
          'Question: "When buying a telescope, is higher magnification better?"',
        ],
        [
          "답변(검색 순위 1등, 유사도: 0.823): 자 별친구들 {유튜버 이름}입니다. 오늘은 망원경 고르는 법이에요. 쉽게 말하면요 망원경에서 제일 중요한건 배율이 아니라 구경이에요... 쓸모있는 최대 배율은 구경 밀리미터의 약 2배에요.",
          "Retrieved (rank 1, score 0.823): Hello star friends, this is {channel}. Today, how to choose a telescope. Put simply, what matters most is not magnification but aperture... useful maximum magnification is about twice the aperture in millimetres.",
        ],
      ]),
      aside([
        ["예시 3)", "Example 3"],
        ['질문: "달 뒷면은 항상 깜깜해?"', 'Question: "Is the far side of the Moon always dark?"'],
        [
          "답변(검색 순위 2등, 유사도: 0.688): 지구에서 안 보일 뿐이지 햇빛은 똑같이 받습니다. 달의 어두운 면은 잘못된 표현이죠... 달의 위상은 한 바퀴 도는 데 29.5일이 걸려요.",
          "Retrieved (rank 2, score 0.688): It just is not visible from Earth; it receives the same sunlight. \"Dark side of the Moon\" is a misnomer... the lunar phases take 29.5 days to come round.",
        ],
      ]),
      aside([
        [
          '질문: "태양이 블랙홀로 변하면 지구도 빨려들어가?"',
          'Question: "If the Sun turned into a black hole, would Earth get pulled in?"',
        ],
        [
          '1등 (0.741): "거성이 됩니다. 태양도 약 50억년 뒤엔 적색 거성이 되어 수성과 금성을 삼킬거에요... 무거운 별은 초신성으로 폭발합니다. 그리고 중성자 별이나 블랙홀을 남겨요..."',
          'Rank 1 (0.741): "It becomes a giant. In about five billion years the Sun will swell into a red giant and swallow Mercury and Venus... heavy stars explode as supernovae, leaving neutron stars or black holes..."',
        ],
        [
          '2등 (0.734): "우리 은하 중심에도 블랙홀이 있어요. 이름은 궁수자리 에이스타. 질량이 태양의 약 430만 배나 됩니다. 초대 질량 블랙홀이죠. 블랙홀은 완전히 검기만 할까요 아니에요. 빨려 들어가는 물질이 원반을 이루면서 마찰로 엄청나게 뜨거워져 x선을 냅니다..."',
          'Rank 2 (0.734): "There is a black hole at the centre of our galaxy too, Sagittarius A*, about 4.3 million solar masses. A supermassive one. Is a black hole entirely black? No. Infalling matter forms a disc and friction heats it enough to emit X-rays..."',
        ],
        [
          '3등 (0.732): "나옵니다. 탈출 속도가 빛의 속도보다 커지거든요. 블랙홀은 질량이 클수록 사건의 지평선도 커져요. 태양과 같은 질량의 블랙홀이라면 지평선 반지름이 약 3km랍니다. 블랙홀은 어떻게 생길까요 아주 무거운 별이 수명을 다하면 중심이 스스로의 중력을 못 이기고 붕괴합니다..."',
          'Rank 3 (0.732): "...because the escape velocity exceeds the speed of light. The more massive the black hole, the larger its event horizon. For one with the mass of the Sun the radius is about 3 km. How do they form? When a very heavy star ends its life, its core collapses under its own gravity..."',
        ],
        [
          '✅4등 (0.719): "자 오늘도 별 보러 오셨군요. {유튜버 이름}입니다. 오늘은 우주에서 제일 오해받는 친구 블랙홀 이야기에요. 쉽게 말하면요 블랙홀은 청소기가 아니에요. 멀리 떨어져 있으면 그냥 무거운 별처럼 서로 공전할 뿐이죠. 자 여기서 포인트. 사건의 지평선이라는 경계가 있어요. 이 안으로 들어가면 빛조차 못 빠져나옵니다..."',
          '✅ Rank 4 (0.719): "Here to look at stars again? This is {channel}. Today, the most misunderstood object in space: the black hole. Put simply, a black hole is not a vacuum cleaner. From far away it just orbits like any heavy star would. Here is the point: there is a boundary called the event horizon. Past it, not even light escapes..."',
        ],
        ["…", "…"],
        [
          '✅17등 (0.486): "가장 큰 적은 광공해입니다. 도시에서는 별이 수십 개 보이지만 어두운 곳에서는 수천 개가 보입니다... 11. 초보자용 관측 대상 (달·목성·토성 고리·오리온 대성운·안드로메다 은하...) 12. 자주 나오는 오해: 블랙홀이 주변의 모든 것을 빨아들인다는 말은 틀렸습니다. 충분히 멀리 있으면 같은 질량의 별과 똑같이 공전할 뿐입니다. 태양이 갑자기 블랙홀이 되어도 지구 궤도는 변하지 않습니다."',
          '✅ Rank 17 (0.486): "The biggest enemy is light pollution. In a city you see dozens of stars; in a dark place, thousands... 11. Targets for beginners (Moon, Jupiter, Saturn\'s rings, the Orion Nebula, Andromeda...) 12. A common misconception: it is wrong to say a black hole sucks in everything around it. Far enough away it simply orbits like a star of the same mass. If the Sun suddenly became a black hole, Earth\'s orbit would not change."',
        ],
      ]),
      p(
        "예시 1~3)은 bi-encoder를 사용했을 때 정답이 되는 청크가 검색 순위 1~2등 내에 포함됐다. 하지만 예시 4)의 경우엔 답변 순위 4등과 17등에 정답이 위치했다.",
        "In examples 1 to 3 the correct chunk landed in the top two. In example 4 the correct chunks sat at rank 4 and rank 17.",
      ),
      p(
        "첫째로, 왜 1~3등에 정답과 관련없는 청크가 포진하게 되었을까? bi-encoder는 임베딩을 통해 질문과 청크 간 의미 벡터 비교를 진행한다. 의미 벡터에 단어 정보가 녹아져있는데, 표면적으로 단어가 겹치는 게 유사도에 영향을 주는 걸로 보인다. 그래서 직접적인 답이 되지는 않지만 표면적으로 단어가 겹치는 청크들이 1~3등에 위치하게 된 듯 싶다.",
        "First, why did unrelated chunks take ranks 1 to 3? A bi-encoder compares meaning vectors between the question and each chunk. Word information is baked into those vectors, and surface word overlap appears to move the score. Chunks that share words without answering the question seem to have taken the top three places for that reason.",
      ),
      p(
        "둘째로, 단어 매칭은 없지만 질문에 대한 답이 되는 청크가 4등에 위치했다. ‘빨려들어가?’라는 질문과 ‘서로 공전할 뿐이죠’라는 청크 간 단어 매칭은 없지만 의미적으로 답이 되기에 4등에 들게 된 듯 싶다.",
        "Second, a chunk that answers the question without sharing its words landed at rank 4. \"Get pulled in?\" and \"it just orbits\" share no vocabulary, yet the chunk answers the question, and it seems that is why it placed fourth.",
      ),
      p(
        "아쉽게도 위의 한계가 존재하는 이유는 bi-encoder가 분명 의미를 비교한다 하더라도, 그 ‘의미’라는 게 결국 문장 속 단어를 먼저 살펴보는 것부터 시작하기에 질문을 벡터로 바꿀 때 단어가 벡터에 큰 영향을 주는 듯 하다.",
        "The limitation seems to come from this: a bi-encoder does compare meaning, but that meaning starts from the words in the sentence, so the words weigh heavily when the question is turned into a vector.",
      ),
      p(
        "셋째로, 17등에 든 청크의 경우 청크 앞 부분보다 뒷 부분에 진짜 정답을 포함하고 있다. 하나의 청크에 여러 주제가 섞여있기 때문에, 정답과 무관한 앞 부분 때문에 내용이 희석되었다. 그렇게 유사도가 낮아지게 되었다.",
        "Third, the rank-17 chunk carries the real answer in its second half rather than its first. Several topics are mixed into one chunk, and the unrelated opening diluted it. That is what pulled the score down.",
      ),
      rule,
      p("예시 4)를 통해 두 가지 한계를 느꼈다.", "Example 4 showed me two limits."),
      p(
        "1. 만약 top_k가 15였다면, 정답이 되는 17등 청크가 누락되었을 것이다",
        "1. If top_k had been 15, the correct rank-17 chunk would have been dropped.",
      ),
      p(
        "⇒ 그럼 top_k를 더 크게 늘리는 게 답일까? 그렇지 않다.",
        "⇒ So is raising top_k the answer? No.",
      ),
      p(
        "top_k를 늘리면 bi-encoder를 통한 검색 결과의 수가 늘어난다. 그렇게 cross-encoder 단계에서 비교할 질문-청크 쌍의 양이 많아져 느려지고 비용이 더 들게 된다. 즉 top_k를 늘리면 recall(정답이 후보에 포함되는 비율)은 늘어나지만, 속도가 느려진다.",
        "Raising top_k returns more candidates from the bi-encoder, which means more question-chunk pairs for the cross-encoder to score, which costs more time and money. Recall goes up; speed goes down.",
      ),
      p(
        "근데 예시 4)에서 top_k를 늘리기 이전에 청킹을 개선했다면, top_k 조정 없이도 유사도를 올릴 수 있었을 것이다.",
        "But in example 4, fixing the chunking before touching top_k would have raised the score without changing top_k at all.",
      ),
      p(
        "2. 만약 17등 청크가 뒷 부분(정답)만을 포함하는 청크였다면, 유사도가 높아져 순위가 훨씬 높아졌을 것이다.",
        "2. If the rank-17 chunk had contained only its second half — the answer — the score would have been higher and so would the rank.",
      ),
      p(
        "⇒ 예시 4)에선 고정 크기 방식이 적용되었기 때문에 정답 아닌 문장과 정답인 문장이 17등 청크에 섞이게 되어 정답이 희석됐다. 이게 의미/구조 기반으로 청킹되었다면 정답만 분리되어 순위가 올랐을 것이다.",
        "⇒ Example 4 used fixed-size chunking, so answer and non-answer sentences ended up in the same chunk and the answer was diluted. Semantic or structural chunking would have separated it out and lifted the rank.",
      ),
      p(
        "정답만 분리된 새로운 청크(`\"블랙홀이 주변의 모든 것을 빨아들인다는 말은 틀렸습니다. 충분히 멀리 있으면 같은 질량의 별과 똑같이 공전할 뿐입니다. 태양이 갑자기 블랙홀이 되어도 지구 궤도는 변하지 않습니다.\"`)로 유사도를 다시 재보니 0.774였다.",
        "I rescored a new chunk holding only the answer (`\"It is wrong to say a black hole sucks in everything around it. Far enough away it simply orbits like a star of the same mass. If the Sun suddenly became a black hole, Earth's orbit would not change.\"`) and got 0.774.",
      ),
      p(
        "단순히 17등 청크만 가지고 실험을 한 거라 전체를 새로 청킹해서 시도하는 것과 비교해 한계가 있긴 하겠지만, 청킹을 어떻게 하냐에 따라 순위가 바뀔 수 있다는 걸 알 수 있었다.",
        "This was only the rank-17 chunk, so it is weaker than rechunking the whole transcript, but it showed that how you chunk can change the ranking.",
      ),
      rule,
      p("결론)", "Conclusion"),
      p(
        "Q. bi-encoder에서 정답 청크는 항상 검색 순위 최상위권에 들까?",
        "Q. With a bi-encoder, does the correct chunk always rank near the top?",
      ),
      p("A. 그렇지 않다.", "A. It does not."),
      p(
        "첫째로, 어떤 방식으로 청킹됐냐에 따라 청크가 정답을 갖고 있는 정도가 달라질 수 있다. 이것이 정답 청크를 희석시켜 유사도를 낮추고, 검색 순위 하단에 위치하게 될 수도 있다.",
        "First, chunking decides how much of the answer a chunk actually holds. Dilution lowers the score and pushes the chunk down the ranking.",
      ),
      p(
        "둘째로, top_k에 따라 검색 순위 하단에 위치한 정답 청크가 누락될 수도 있다. 만약 top_k를 늘린다면 recall은 올라가지만, 속도가 느려지고 API 비용이 올라간다.",
        "Second, top_k can cut off a correct chunk sitting low in the ranking. Raising it improves recall but costs speed and API spend.",
      ),
      p(
        "셋째로, bi-encoder는 단어 겹침 영향이 커서 순위가 틀릴 수 있다. 이를 보완하는 게 다음 단계인 리랭킹(cross-encoder)이다.",
        "Third, a bi-encoder leans on word overlap, so the ranking can be wrong. The next stage, reranking with a cross-encoder, is what covers for that.",
      ),
    ],
  },
];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);
