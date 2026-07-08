# 작업 가이드 (CLAUDE.md)

㈜임화금속(LIMHWA METAL) 홈페이지 — Vite + React 19 + TS + Tailwind 4.
**응답은 한국어로 합니다.**

## 배포
- 운영 사이트: https://limhwa-new.vercel.app/ — Vercel이 **`master` 브랜치를 자동 배포**합니다. master에 머지되면 곧 라이브에 반영됩니다.
- GitHub: https://github.com/Geonho-Cho/limhwa-new

## 브랜치 작업 규칙 ⚠️ (가장 중요)
**master에 직접 커밋·푸시**합니다. (2026-07-08부터 "PR+승인 1명" 강제 규칙을 없앴습니다.)
믿는 사람끼리의 소규모 사이트라, 승인 왕복 대신 master → Vercel 자동 배포로 바로 반영합니다.

### 작업 시작 전 반드시 "최신 master"로 맞춘다
남이 먼저 올린 변경이 빠진 오래된 로컬에서 작업하면 덮어쓰기·충돌의 원인이 됩니다. 작업을 시작하기 전에 항상 최신 상태로 맞추세요.

```bash
git checkout master
git pull origin master          # 남이 올린 변경까지 모두 반영된 최신 상태
```

- ❌ pull 하지 않은 오래된 로컬 상태에서 작업 시작 금지

### 작업 → 배포 흐름
1. 위처럼 최신 master로 맞춘 뒤 → 작업 → 커밋
2. `git push origin master` → **곧바로 Vercel 자동 배포**
3. push가 거부되면(그새 원격이 더 최신), 먼저 `git pull origin master`로 최신화한 뒤 다시 push

- 남은 안전장치: master **삭제 금지** · **강제덮어쓰기(force push) 금지** (그대로 유지)
- 되돌리기: 잘못 올라가도 Vercel 배포기록에서 이전 버전으로 **1클릭 롤백**
- PR은 선택 사항: 큰 변경을 미리보기로 먼저 확인하고 싶을 때만 `feature/<작업명>` 브랜치+PR을 써도 됩니다(강제 아님).

## 진행 방식
- 페이지 단위로 작업하고, 각 페이지를 로컬 미리보기에서 사용자가 확인한 뒤 다음으로 넘어갑니다.
- 개발 서버: `npm run dev` (Vite, 포트 5173) — 미리보기 http://localhost:5173

## 회사 정보 (실제 데이터)
- ㈜임화금속 / 경기도 화성시 만세구 남양읍 무하로 51번길 5
- TEL 031-366-8585 · FAX 031-366-8686 · sales@limhwa.com
- 설립 1998 · 임직원 40명+ · 월 생산능력 400ton
- 인증: 현대·기아 SQ / ISO 9001 / ISO 14001
- 실제 회사 데이터는 `src/data/company.json`, 제품 데이터는 `src/data/products.json`
