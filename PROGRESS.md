# 임화 홈페이지 — 작업 인수인계서

> 최종 업데이트: 2026-07-10

㈜임화금속(LIMHWA METAL) 홈페이지. 초기 템플릿 골격 위에 **템플릿 placeholder를 실제 회사 데이터/사진으로 페이지 단위 교체**하는 작업을 진행 중입니다. 이 문서 하나로 다음 작업자가 이어받을 수 있도록 정리했습니다.

- **운영 사이트**: https://limhwa-new.vercel.app/  (Vercel이 `master` 브랜치를 자동 배포)
- **GitHub**: https://github.com/Geonho-Cho/limhwa-new
- **기술 스택**: Vite + React 19 + TypeScript + Tailwind CSS 4 + react-router-dom 7 + react-i18next (한/영)
- **작업 규칙 요약**: 항상 최신 master에서 시작 → 작업 → `master`에 직접 커밋·푸시 → Vercel 자동 배포. 상세는 repo 루트 `CLAUDE.md`.

---

## 🚀 다음 세션 시작하는 법 (이것부터)

```bash
git checkout master
git pull origin master        # 남이 올린 최신 변경까지 반영 (필수)
npm install                   # 처음이거나 의존성 바뀐 경우만
npm run dev                   # 미리보기: http://localhost:5173
```

작업 흐름: 페이지 수정 → `http://localhost:5173`에서 사용자가 확인 → `npx tsc --noEmit`로 타입 체크 → `git add`/`commit`/`push origin master`. **페이지 단위로 작업하고 각 페이지를 사용자가 미리보기로 확인한 뒤 다음으로 넘어갑니다.**

---

## 🆕 2026-07-10 세션 변경 요약 — 커스텀 도메인 마무리 + 검색엔진 등록 (인프라)

이날은 페이지 콘텐츠가 아니라 **도메인 연결 마무리 + 검색 노출** 작업. 코드 변경은 sitemap/robots/인증 태그뿐, 나머지는 외부 서비스(후이즈·가비아·서치콘솔 등) 설정.

1. **www 도메인 완료** — `www.limhwa.com` → `limhwa.com` 308 영구 리다이렉트 확인(apex는 이전에 완료). 이제 www로 들어와도 대표주소로 넘어감.
2. **옛 사이트 `imhwametal.com` 폐기** — 대표(조수민) 명의로 부하직원이 외주 제작한 **미완성 워드프레스**(Astra "Sierra Industry" 템플릿, Lorem ipsum 더미). 후이즈에서 **네임서버 dnszi→후이즈로 변경**해 연결 차단 → 주요 DNS(구글·클플·KT)에서 사망 확인. 워드프레스 서버(`118.34.223.219`, KT 회선=외주 자체서버 추정)는 아직 켜져있어 DNS 캐시 남은 기기만 접속됨(최장 하루~48h 내 자연사). 구글 "오래된 콘텐츠 삭제" 도구로 옛 페이지 3개(홈·제품·오시는길) 삭제요청 접수.
3. **검색엔진 3사 등록** — `public/sitemap.xml`·`public/robots.txt` 신규 생성·배포(홈+9페이지, canonical `https://limhwa.com`).
   - **구글 서치콘솔**: 도메인 속성(가비아 DNS TXT 인증) + sitemap 제출(10페이지 발견) + 홈 색인요청.
   - **네이버 서치어드바이저**: `index.html`에 `naver-site-verification` 메타태그 인증 + sitemap(`https://limhwa.com/sitemap.xml` — www없이 전체URL 필수) + 홈 수집요청.
   - **다음 웹마스터도구**: `robots.txt`에 `#DaumWebMasterTool` 코드 인증 + sitemap + 홈 문서등록.
   - 검색 반영은 며칠~2주. 회사명이 고유해 반영되면 잘 뜰 것.

**새/변경 파일**: `public/sitemap.xml`(신규), `public/robots.txt`(신규 — 다음 인증코드+sitemap 위치 포함), `index.html`(네이버 메타태그 1줄 추가).

**남은 일(선택·나중)**: 구글 비즈니스 프로필(검색 우측 회사명함) 소유권 주장 — 소유는 **대표/회사 공용 계정**으로, 사용자는 관리자로(회사 자산이라 개인계정 지양). 계정 정하고 나중에.

---

## 🆕 2026-07-09 세션 변경 요약

이날 한 작업(커밋 순서대로):

1. **메인 제품 섹션 정리** (`Home.tsx`) — 카테고리를 실제 라인업(볼트/스크류/리벳/단조품)으로, 대표 이미지 경로 교정(`former-1.jpg`, `standard-1.png`), 카테고리 링크를 `/products#lineup`으로 통일.
2. **회사소개 인증현황** — 인증서 이미지 **클릭 확대(라이트박스) 기능 제거**. 이제 클릭해도 확대창이 뜨지 않음(정적 이미지).
3. **품질관리 비전 설비 사진** — 세로 길이 축소(그리드 폭 `max-w-5xl`→`max-w-3xl`). 잘림 없이 사진 전체 유지.
4. **R&D CENTER를 한 페이지로 통합** ⭐ — `/rnd` 한 페이지에 **R&D센터 → 제조설비 → 품질관리**가 앵커 섹션으로 이어짐(회사소개 방식). 드롭다운 = `/rnd`, `/rnd#equipment`, `/rnd#quality`. 기존 `/equipment`·`/quality`는 `/rnd#…`로 **리다이렉트**.
5. **채용안내 배경사진 추가** — 회사소개처럼 옅은 배경사진 2장(임직원 단합행사 실사)을 깔고, 여러 차례 미세조정(블러/투명도/크기/여백).
6. **메인 히어로 슬라이드 3장 배경 교체** — 실제 공장 사진으로 교체 + slide3 부제 문구 정리.

---

## 📊 페이지별 진행 현황

| 페이지 | 경로 | 상태 |
|--------|------|------|
| 회사소개 About | `/about` | ✅ 완료 (실제 정보·인증서, 인증현황 탭 / 확대기능은 제거됨) |
| 제품소개 Products | `/products` | ✅ 완료 (일반품/특수품 사진 + 적용 분야) |
| **R&D CENTER** | `/rnd` | ✅ 완료 — **R&D·제조설비·품질관리 통합 한 페이지** |
| ESG | `/esg` | ✅ 완료 (3열 카드) |
| **메인 Home** | `/` | 🟨 **대부분 완료** — 히어로 3장 실사 교체·제품 섹션 정리 완료 / 아래 "남은 일" 참고 |
| **채용안내 Careers** | `/careers` | 🟨 **진행 중** — 배경사진 반영 완료 / 채용공고·복리후생 실제 내용·이메일 확인 남음 |
| **견적문의 Quote** | `/quote` | ⚠️ **백엔드 없음** (아래 "알려진 이슈" 참고) |

> 참고: `제조설비`·`품질관리`는 더 이상 독립 페이지가 아니라 **`/rnd` 안의 섹션**입니다(`/equipment`·`/quality`로 접속하면 `/rnd#…`로 자동 이동).

---

## ✅ 완료된 작업 상세 (파일 위치 포함)

각 페이지는 보통 **`src/pages/<Page>.tsx` (화면) + `src/data/<page>.json` (내용) + `public/images/<page>/` (사진)** 세트로 구성됩니다.

### 회사소개 (`src/pages/About.tsx` · `src/data/company.json`)
- 회사 개요 지표(설립/임직원/월 생산능력/인증 수), 인사말, 연혁(타임라인), **인증현황**(실제 인증서 3장, 섹션 `id="certifications"`), 오시는 길(약도+주소).
- 상단 회사소개 드롭다운: 인사말 · 연혁 · **인증현황** · 오시는 길.
- 인증서 이미지: `public/images/cert/` (hyundai-kia-sq / iso9001 / iso14001).
- **2026-07-09**: 인증서 **클릭 확대 라이트박스 제거** — 이제 정적 이미지(클릭 비활성). `zoomImage` state·`useState` import도 삭제.

### 제품소개 (`src/pages/Products.tsx` · `src/data/products.json`)
- 인트로, 3대 차별점(competencies), **제품 라인업**(일반품=규격칩 M2~M24·L5~160 + 사진 4종 볼트/스크류/스크류/리벳, 특수품=사진 4종 동/알루미늄/이형제품), **주요 적용 분야**(5개: 전기차&모빌리티·5G/6G통신·반도체&로봇 + 자동차부품·전자부품).
- 사진: `public/images/products/standard-1~4.png`, `special-1~4.png`. 공용 `PhotoCard` 컴포넌트.

### R&D CENTER (`src/pages/RnD.tsx` — 제조설비·품질관리 섹션 통합) ⭐ 2026-07-09 개편
- **`/rnd` 한 페이지**에 3개 섹션이 이어짐: **R&D센터**(`id="rnd"`, 핵심기술 2종) → **제조설비**(`id="equipment"`) → **품질관리**(`id="quality"`). 각 섹션에 회사소개식 헤더(영문 키커 + 국문 타이틀).
- 드롭다운(`Layout.tsx`): `R&D센터`=`/rnd`, `제조설비`=`/rnd#equipment`, `품질관리`=`/rnd#quality`.
- `Equipment.tsx`/`Quality.tsx`는 **배너 없는 섹션 컴포넌트** `EquipmentSection`/`QualitySection`을 named export(더 이상 독립 페이지 아님). `RnD.tsx`가 이를 조합.
- `App.tsx`: `/equipment`·`/quality` 라우트는 `<Navigate replace>`로 `/rnd#…`에 리다이렉트(외부 링크 호환).
- **R&D센터 내용**: 핵심 기술 2종(냉간단조 공법, 금형 설계 기술) 실제 설비 사진 카드. 사진 `public/images/rnd/cold-forging.jpg`, `die-design.png`.
- **제조설비 내용**: 3개 공정 카드 FORMER(11대)/HEADING(37대)/ROLLING(32대) — 다크 헤더 + 최대규격 칩 + 규격별 보유대수(수량 비례 막대). 공정별 실제 사진 2장씩. 데이터 `equipment.json`의 `processes` 배열. (ROLLING 최대규격 = M12)
  - 사진: `public/images/equipment/former-1~2.jpg`, `heading-1~2.jpg`, `rolling-1~2.jpg`.
- **품질관리 내용**(데이터는 `Quality.tsx` 인라인): 품질방침 → 프로세스(입고/공정/출하) → **검사설비 8종**(실물 사진+모델명) → **비전 설비**(사진 2장).
  - 검사설비: 형상측정기 Mitutoyo C-3000 / 비커스경도기 HM-200 / 로크웰경도기 HR-530 / 금속현미경 OLYMPUS PME3 / 도금두께 iEDX-150T / 확대경 SOMETECH VISION / 비디오미터 VMS-1510 / 광학측정기 Keyence LMX-X100T.
  - 사진: `public/images/quality/inspection-1~8.jpg`, `vision-1~2.jpg`. **2026-07-09**: 비전 설비 사진 그리드 폭 `max-w-3xl`로 축소(세로 길이 감소).

### ESG (`src/pages/ESG.tsx` · `src/data/esg.json`)
- 3열 카드: 환경경영(초록)/안전보건(파랑)/윤리경영(보라). 색상 그라데이션 헤더 + 라인 아이콘(새싹/방패/저울) + 주요 활동 체크리스트(초록 통일).

### 메인 Home (`src/pages/Home.tsx` + `src/components/HeroSlider.tsx`) — 2026-07-09 작업
- **히어로 슬라이더**(`HeroSlider.tsx`): 전체화면 3장 자동 슬라이드(5초). 배경을 실제 공장 사진으로 교체.
  - slide1 = `hero/slide1.png` (작업장 통로), slide2 = `hero/slide2.png` (녹색 권선기), slide3 = `hero/slide3.jpg` (공구/금형 보관대).
  - slide3 부제 = "최고 품질의 냉간단조 부품".
  - ⚠️ slide1·slide2 원본은 **저해상도 세로(약 483×543)** → 큰 화면에서 다소 소프트. slide3만 가로 고해상도(2000×1500). 히어로 **슬라이드 제목/부제는 국문 하드코딩**(영문 전환 미적용).
- **제품(OUR PRODUCT) 섹션**: 카테고리 볼트/스크류/리벳/단조품, 대표 이미지 `former-1.jpg`·`standard-1.png`, 카테고리 링크 `/products#lineup`.
- **About us / 신뢰지표 / Support(CTA)** 섹션: 회사 실제 데이터(설립년도·업력·임직원·월 생산능력·인증 수)를 `company.json`에서 계산해 표시.

### 채용안내 (`src/pages/Careers.tsx` · `src/data/careers.json`) — 2026-07-09 배경 작업
- 회사소개처럼 **옅은 배경사진**을 깔았음(임직원 단합행사 실사).
  - **복리후생 + 채용공고**(두 칸)에 녹색 팀 사진 `public/images/careers-team-2.jpg`를 하나의 배경으로.
  - **입사 문의**(마지막 칸)에 파란 팀 사진 `public/images/careers-team-1.jpg`.
  - 배경 레이어 스타일(현재 값): `bg-[length:70%_auto] bg-no-repeat bg-center opacity-[0.16] blur-[1.5px]` — 화면 끝까지 채우지 않고 **여백**을 두고, **인물을 작게**, 아주 **살짝만 흐리게**. (사용자 요청으로 여러 번 미세조정한 최종값)
  - 구조: 풀-블리드 `<section>` 구성(복리후생/채용공고/입사문의). 배경 레이어는 `absolute inset-0 … aria-hidden`.
- ⬜ 아직 채용공고/복리후생 **텍스트 내용**은 템플릿 성격. 실제 내용 반영 필요.

### 공통/인프라
- **네비게이션 해시 앵커 스크롤** (`src/App.tsx`의 `ScrollToTop`): 드롭다운의 `#greeting`·`#equipment`·`#quality` 등 앵커 클릭 시 해당 섹션으로 스크롤(고정 헤더 80px 보정). 헤더/드롭다운은 `src/components/Layout.tsx`.
- 미사용 스톡/placeholder 이미지 정리(옛 hero jpg·slide png 등 교체 시 함께 제거).

---

## ⬜ 다음에 할 일 (남은 페이지·항목)

1. **메인 (Home / HeroSlider)**
   - 히어로 **slide1·slide2 저해상도 세로 사진** → 가로 고해상도 원본으로 교체하면 더 선명(현재는 소프트).
   - 히어로 **슬라이드 제목/부제 영문 번역**(i18n) 추가 — 지금은 언어 토글해도 국문 고정(버튼만 영문 전환).
2. **채용안내 (Careers)** — 복리후생/채용공고 **실제 내용** 반영. 입사문의 **이메일 확인**(아래 이슈).
3. **견적문의 (Quote)** — 백엔드 이슈 해결 필요(아래).

---

## ⚠️ 알려진 이슈 / 주의

- **견적문의 폼이 운영에서 동작하지 않음**: `Quote.tsx`가 `http://localhost:3001/api/quote`로 전송하는데 **이 repo에는 백엔드가 없습니다**(별도 서버 필요). 운영 배포본에서는 전송 실패. 해결 방향(택1): ① Vercel 서버리스 함수로 이메일 발송 구현, ② Formspree/EmailJS 같은 폼 서비스 연동, ③ 임시로 `mailto:` 방식. (참고: 채용 지원 `CareerApply.tsx`·견적 폼은 FormSubmit 방식 개편 이력 있음 — 실제 수신 동작 재확인 권장)
- **채용안내 입사문의 이메일 불일치**: `Careers.tsx`의 입사문의가 `team@limhwa.com`인데, 사이트 다른 곳은 `sales@limhwa.com`으로 통일돼 있음. 의도 여부 확인 후 통일 필요.
- **히어로 slide1·slide2 저해상도**: 세로·저해상도 원본이라 대형 모니터에서 흐릿하게 보일 수 있음. 가로 고해상도 사진으로 교체 권장.
- **미사용 옛 이미지**: `public/images/products/bolt-001.jpg`, `gear-001.jpg`, `nut-001.jpg` 등 구 템플릿 잔재 정리 대상.

---

## 🛠️ 기술 참고

### 폴더 구조 (실제)
```
limhwa-new/
├── index.html
├── src/
│   ├── App.tsx              # 라우팅 + ScrollToTop(해시 앵커 스크롤) + /equipment·/quality → /rnd# 리다이렉트
│   ├── main.tsx
│   ├── components/
│   │   ├── Layout.tsx        # 헤더(네비/드롭다운)·푸터
│   │   ├── PageBanner.tsx    # 각 페이지 상단 배너(제목/영문/breadcrumb)
│   │   └── HeroSlider.tsx    # 메인 히어로(전체화면 3장 자동 슬라이드)
│   ├── pages/                # 화면 (About/Products/RnD/Equipment/Quality/ESG/Home/Careers/CareerApply/Quote)
│   │                         #  ※ Equipment/Quality는 이제 'RnD.tsx가 조합하는 섹션 컴포넌트'
│   ├── data/                 # 페이지별 내용 JSON (company/products/rnd/equipment/esg/careers)
│   └── i18n/                 # 한/영 번역 (locales/ko, locales/en)
├── public/images/            # 사진 (cert/, products/, rnd/, equipment/, quality/, hero/ + careers-team-1~2.jpg ...)
├── CLAUDE.md                 # 작업 가이드·브랜치 규칙
├── PROGRESS.md               # 이 문서
└── vercel.json               # SPA 라우팅 설정
```
※ 예전 문서의 `packages/client`·`packages/server`·포트 5174/3001 구조는 **현재와 다릅니다**(단일 Vite 앱, 포트 5173).

### 규칙/컨벤션
- **한/영(i18n)**: 텍스트는 `{ ko, en }` 객체로 두고 `lang`으로 선택. 헤더에서 Korean/English 전환.
- **페이지 공통 틀**: `PageBanner` + `max-w-7xl mx-auto px-6` 컨테이너 + `section-subtitle`/`hover-card`/`rounded-2xl` 카드 스타일. 회사소개/채용안내처럼 **풀-블리드 섹션**은 `<section className="py-20 …">` + 내부 `max-w-*` 컨테이너.
- **옅은 배경사진 패턴**(회사소개·채용안내 공통): 섹션에 `relative overflow-hidden`, 그 안에 `absolute inset-0 bg-cover(또는 bg-[length:…]) opacity-[…] … aria-hidden`, 콘텐츠는 `relative`로 위에.
- **데이터 위치**: 대부분 `src/data/*.json` (품질관리만 `Quality.tsx` 인라인).
- **커밋 메시지**: 기능=`feat:`, 버그수정=`fix:`, 문서=`docs:`.

### 📷 사진 넣는 법 (중요 — 반복 작업)
사용자가 사진을 붙여넣으면 이미지 캐시에 저장됩니다. 처리 순서:
1. 캐시 파일을 `public/images/<페이지>/` 로 복사(의미 있는 이름으로: 예 `heading-1.jpg`, `hero/slide1.png`).
2. **웹 최적화**: 이 환경엔 sharp/ImageMagick/Python이 없으므로, 스크래치패드에 `@napi-rs/canvas`를 임시 설치해 리사이즈/JPG 변환(긴 변 ~1000–1200px, 품질 85). 큰 PNG 사진은 JPG로 변환하면 용량이 크게 줄어듭니다(예 3MB→200KB). 배경/히어로용은 **가로 고해상도**가 가장 잘 어울림.
3. 데이터(JSON) 또는 컴포넌트에서 `/images/<페이지>/<파일>` 경로로 참조. (히어로는 `HeroSlider.tsx`의 `slides` 배열)

### 🔎 미리보기/스크린샷 팁
- 이 환경엔 Chrome이 설치돼 있어, 스크래치패드에 `puppeteer-core`를 설치하고 기존 Chrome(`C:/Program Files/Google/Chrome/Application/chrome.exe`)을 `executablePath`로 붙여 헤드리스 스크린샷을 찍어 확인했습니다. 히어로는 하단 인디케이터 버튼(`aria-label^="Go to slide"`)을 클릭해 원하는 슬라이드를 캡처.

---

## 🏢 회사 실제 데이터 (기준값)
- ㈜임화금속 / 경기도 화성시 만세구 남양읍 무하로 51번길 5
- TEL 031-366-8585 · FAX 031-366-8686 · sales@limhwa.com
- 설립 1998 · 임직원 40명+ · 월 생산능력 400ton
- 인증: 현대·기아 SQ / ISO 9001 / ISO 14001
- 원본 데이터: `src/data/company.json`, `src/data/products.json` 등
