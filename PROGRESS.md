# 임화 홈페이지 — 작업 인수인계서

> 최종 업데이트: 2026-07-08

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

## 📊 페이지별 진행 현황

| 페이지 | 경로 | 상태 |
|--------|------|------|
| 회사소개 About | `/about` | ✅ 완료 (실제 정보·인증서, 인증현황 탭 추가) |
| 제품소개 Products | `/products` | ✅ 완료 (일반품/특수품 사진 + 적용 분야) |
| R&D | `/rnd` | ✅ 완료 (핵심기술 2종 실제 사진) |
| 제조설비 Equipment | `/equipment` | ✅ 완료 (설비 보유현황 3공정 + 실제 사진) |
| 품질관리 Quality | `/quality` | ✅ 완료 (검사설비 8종 + 비전 설비) |
| ESG | `/esg` | ✅ 완료 (3열 카드) |
| **메인 Home** | `/` | ⬜ **미완료** — 아직 템플릿 상태, 실제 데이터 검토 필요 |
| **채용안내 Careers** | `/careers` | ⬜ **미완료** — 템플릿 상태 |
| **견적문의 Quote** | `/quote` | ⚠️ **백엔드 없음** (아래 "알려진 이슈" 참고) |

---

## ✅ 완료된 작업 상세 (파일 위치 포함)

각 페이지는 보통 **`src/pages/<Page>.tsx` (화면) + `src/data/<page>.json` (내용) + `public/images/<page>/` (사진)** 세트로 구성됩니다.

### 회사소개 (`src/pages/About.tsx` · `src/data/company.json`)
- 회사 개요 지표(설립/임직원/월 생산능력/인증 수), 인사말, 연혁(타임라인), **인증현황**(실제 인증서 3장 + 클릭 시 확대 라이트박스, 섹션 `id="certifications"`), 오시는 길(약도+주소).
- 상단 회사소개 드롭다운: 인사말 · 연혁 · **인증현황** · 오시는 길.
- 인증서 이미지: `public/images/cert/` (hyundai-kia-sq / iso9001 / iso14001).

### 제품소개 (`src/pages/Products.tsx` · `src/data/products.json`)
- 인트로, 3대 차별점(competencies), **제품 라인업**(일반품=규격칩 M2~M24·L5~160 + 사진 4종 볼트/스크류/스크류/리벳, 특수품=사진 4종 동/알루미늄/이형제품), **주요 적용 분야**(5개: 전기차&모빌리티·5G/6G통신·반도체&로봇 + 자동차부품·전자부품).
- 사진: `public/images/products/standard-1~4.png`, `special-1~4.png`. 공용 `PhotoCard` 컴포넌트.

### R&D (`src/pages/RnD.tsx` · `src/data/rnd.json`)
- 핵심 기술 2종(냉간단조 공법, 금형 설계 기술)을 **실제 설비 사진 카드**로. 사진은 카드 안 85% 크기(매트 액자).
- 사진: `public/images/rnd/cold-forging.jpg`, `die-design.png`. (기존 가짜 특허·중복 인증 섹션은 삭제)

### 제조설비 (`src/pages/Equipment.tsx` · `src/data/equipment.json`)
- **설비 보유 현황**: 3개 공정 카드 FORMER(11대)/HEADING(37대)/ROLLING(32대) — 다크 헤더 + 최대규격 칩 + 규격별 보유대수(수량 비례 막대). 공정별 실제 사진 2장씩.
- 사진: `public/images/equipment/former-1~2.jpg`, `heading-1~2.jpg`, `rolling-1~2.jpg`. (ROLLING 최대규격 = M12)
- 데이터 구조: `equipment.json`의 `processes` 배열(각 no/key/title/short/subtitle/maxSpec/photos[]/items[{spec,qty}]).

### 품질관리 (`src/pages/Quality.tsx` — 데이터는 컴포넌트 내부 인라인)
- 품질방침 → 품질관리 프로세스(입고/공정/출하) → **검사설비 현황 8종**(실물 사진+모델명 카드) → **비전 설비 보유**(사진 2장).
- 검사설비: 형상측정기 Mitutoyo C-3000 / 비커스경도기 HM-200 / 로크웰경도기 HR-530 / 금속현미경 OLYMPUS PME3 / 도금두께 iEDX-150T / 확대경 SOMETECH VISION / 비디오미터 VMS-1510 / 광학측정기 Keyence LMX-X100T.
- 사진: `public/images/quality/inspection-1~8.jpg`, `vision-1~2.jpg`. (기존 품질 인증 섹션은 중복이라 삭제)

### ESG (`src/pages/ESG.tsx` · `src/data/esg.json`)
- 3열 카드: 환경경영(초록)/안전보건(파랑)/윤리경영(보라). 색상 그라데이션 헤더 + 라인 아이콘(새싹/방패/저울) + 주요 활동 체크리스트(초록 통일).

### 공통/인프라
- **네비게이션 해시 앵커 스크롤 수정** (`src/App.tsx`의 `ScrollToTop`): 드롭다운의 `#greeting` 등 앵커 클릭 시 해당 섹션으로 스크롤(고정 헤더 80px 보정). 헤더/드롭다운은 `src/components/Layout.tsx`.
- 미사용 스톡/placeholder 이미지 정리.

---

## ⬜ 다음에 할 일 (남은 페이지)

1. **메인 (Home, `src/pages/Home.tsx`)** — 아직 템플릿 상태. Hero 배너/신뢰지표/주력제품/CTA 등을 실제 데이터·사진으로 교체 필요. (신뢰지표가 "업력 30년/직원 30명/월 100만개" 등 옛 placeholder일 수 있으니 실제값 설립 1998·40명+·400ton으로 점검)
2. **채용안내 (Careers, `src/pages/Careers.tsx` · `src/data/careers.json`, 지원 `CareerApply.tsx`)** — 복리후생/채용공고 실제 내용 반영.
3. **견적문의 (Quote, `src/pages/Quote.tsx`)** — 아래 이슈 해결 필요.

---

## ⚠️ 알려진 이슈 / 주의

- **견적문의 폼이 운영에서 동작하지 않음**: `Quote.tsx`가 `http://localhost:3001/api/quote`로 전송하는데 **이 repo에는 백엔드가 없습니다**(별도 서버 필요). 운영 배포본에서는 전송 실패. 해결 방향(택1): ① Vercel 서버리스 함수로 이메일 발송 구현, ② Formspree/EmailJS 같은 폼 서비스 연동, ③ 임시로 `mailto:` 방식. 이메일 수신 설정 예시는 `.env.example` 참고(SMTP_USER/SMTP_PASS/QUOTE_RECIPIENT).
- **미사용 옛 이미지**: `public/images/products/bolt-001.jpg`, `gear-001.jpg`, `nut-001.jpg` 등 구 템플릿 잔재. 정리 대상.

---

## 🛠️ 기술 참고

### 폴더 구조 (실제)
```
limhwa-new/
├── index.html
├── src/
│   ├── App.tsx              # 라우팅 + ScrollToTop(해시 앵커 스크롤)
│   ├── main.tsx
│   ├── components/
│   │   ├── Layout.tsx        # 헤더(네비/드롭다운)·푸터
│   │   └── PageBanner.tsx    # 각 페이지 상단 배너(제목/영문/breadcrumb)
│   ├── pages/                # 페이지별 화면 (About/Products/RnD/Equipment/Quality/ESG/Home/Careers/CareerApply/Quote)
│   ├── data/                 # 페이지별 내용 JSON (company/products/rnd/equipment/esg/careers)
│   └── i18n/                 # 한/영 번역 (locales/ko, locales/en)
├── public/images/            # 사진 (cert/, products/, rnd/, equipment/, quality/, hero/ ...)
├── CLAUDE.md                 # 작업 가이드·브랜치 규칙
├── PROGRESS.md               # 이 문서
└── vercel.json               # SPA 라우팅 설정
```
※ 예전 문서의 `packages/client`·`packages/server`·포트 5174/3001 구조는 **현재와 다릅니다**(단일 Vite 앱, 포트 5173).

### 규칙/컨벤션
- **한/영(i18n)**: 텍스트는 `{ ko, en }` 객체로 두고 `lang`으로 선택. 헤더에서 Korean/English 전환.
- **페이지 공통 틀**: `PageBanner` + `max-w-7xl mx-auto px-6 py-16` 컨테이너 + `section-subtitle`/`hover-card`/`rounded-2xl` 카드 스타일.
- **데이터 위치**: 대부분 `src/data/*.json` (품질관리만 `Quality.tsx` 인라인).
- **커밋 메시지**: 기능=`feat:`, 버그수정=`fix:`, 문서=`docs:`.

### 📷 사진 넣는 법 (중요 — 반복 작업)
사용자가 사진을 붙여넣으면 이미지 캐시에 저장됩니다. 처리 순서:
1. 캐시 파일을 `public/images/<페이지>/` 로 복사(의미 있는 이름으로: 예 `heading-1.jpg`).
2. **웹 최적화**: 이 환경엔 sharp/ImageMagick/Python이 없으므로, 스크래치패드에 `@napi-rs/canvas`를 임시 설치해 리사이즈/JPG 변환(긴 변 ~1000–1200px, 품질 85). 큰 PNG 사진은 JPG로 변환하면 용량이 크게 줄어듭니다(예 3MB→200KB).
3. 데이터(JSON) 또는 컴포넌트에서 `/images/<페이지>/<파일>` 경로로 참조.

---

## 🏢 회사 실제 데이터 (기준값)
- ㈜임화금속 / 경기도 화성시 만세구 남양읍 무하로 51번길 5
- TEL 031-366-8585 · FAX 031-366-8686 · sales@limhwa.com
- 설립 1998 · 임직원 40명+ · 월 생산능력 400ton
- 인증: 현대·기아 SQ / ISO 9001 / ISO 14001
- 원본 데이터: `src/data/company.json`, `src/data/products.json` 등
