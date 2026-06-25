# 작업 가이드 (CLAUDE.md)

㈜임화금속(LIMHWA METAL) 홈페이지 — Vite + React 19 + TS + Tailwind 4.
**응답은 한국어로 합니다.**

## 배포
- 운영 사이트: https://limhwa-new.vercel.app/ — Vercel이 **`master` 브랜치를 자동 배포**합니다. master에 머지되면 곧 라이브에 반영됩니다.
- GitHub: https://github.com/Geonho-Cho/limhwa-new

## 브랜치 작업 규칙 ⚠️ (가장 중요)
"작업 1건 = 브랜치 1개 = PR 1개" 로 진행합니다.

### 새 작업은 항상 "최신 master"에서 새 브랜치를 뜬다
이전 브랜치나 pull 하지 않은 오래된 로컬 상태에서 분기하면, **이미 머지된 작업이 빠진 채로** 시작되어 충돌·덮어쓰기·혼란의 원인이 됩니다. 반드시 아래처럼 최신 master에서 새로 분기하세요.

```bash
git checkout master
git pull origin master          # 이전 PR들이 모두 반영된 최신 상태
git checkout -b feature/<작업명>
```

- ❌ 이전 feature 브랜치 위에서 새 작업 시작 금지
- ❌ pull 하지 않은 오래된 master/로컬 상태에서 분기 금지

### 작업 → 배포 흐름
1. 위 방식으로 최신 master에서 분기 → 작업 → 커밋
2. `git push origin feature/<작업명>` → PR 생성 (base: `master`)
3. **머지 전 반드시** 브랜치를 최신 master로 갱신하고 충돌·덮어쓰기 여부를 검사:
   ```bash
   git fetch origin
   git merge-tree --write-tree master feature/<작업명>   # exit 0 = 충돌 없음
   git merge origin/master                               # 브랜치 최신화
   ```
4. 충돌·덮어쓰기 없음을 확인한 뒤 PR 머지 → Vercel 자동 배포

## 진행 방식
- 페이지 단위로 작업하고, 각 페이지를 로컬 미리보기에서 사용자가 확인한 뒤 다음으로 넘어갑니다.
- 개발 서버: `npm run dev` (Vite, 포트 5173) — 미리보기 http://localhost:5173

## 회사 정보 (실제 데이터)
- ㈜임화금속 / 경기도 화성시 만세구 남양읍 무하로 51번길 5
- TEL 031-366-8585 · FAX 031-366-8686 · sales@limhwa.com
- 설립 1998 · 임직원 40명+ · 월 생산능력 400ton
- 인증: 현대·기아 SQ / ISO 9001 / ISO 14001
- 실제 회사 데이터는 `src/data/company.json`, 제품 데이터는 `src/data/products.json`
