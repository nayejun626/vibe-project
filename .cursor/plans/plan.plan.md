---
name: 나만의 일기장 개발 계획
overview: spec.md와 api-spec.md를 기반으로 0단계(프로젝트 셋업) → 1단계(목업, mock 데이터) → 2단계(Supabase 실제 연동) 순서로 개발한다. 1단계 완료 전 2단계 진입 금지.
todos:
  - id: step-0
    content: "0단계: 프로젝트 초기 셋업 (Next.js + Tailwind + 폴더구조 + types + mockData + layout)"
    status: completed
  - id: step-1a
    content: "1단계 섹션A: 인증 화면 목업 (로그인, 회원가입, 루트 리다이렉트)"
    status: completed
  - id: step-1b
    content: "1단계 섹션B: 일기 목록 (헤더, DiaryCard, 목록 페이지, 빈 상태 UI)"
    status: completed
  - id: step-1c
    content: "1단계 섹션C: 일기 작성 (MoodSelector, DiaryForm, 작성 페이지)"
    status: completed
  - id: step-1d
    content: "1단계 섹션D: 일기 상세 보기 (상세 페이지, 수정/삭제 버튼)"
    status: completed
  - id: step-1e
    content: "1단계 섹션E: 일기 수정 (수정 페이지, 취소 버튼)"
    status: completed
  - id: step-1f
    content: "1단계 섹션F: 로그아웃 + 전체 플로우 확인"
    status: completed
  - id: step-2g
    content: "2단계 섹션G: Supabase DB 설정 (diaries 테이블, 트리거, RLS)"
    status: completed
  - id: step-2h
    content: "2단계 섹션H: Supabase 클라이언트 설정 (client/server, middleware)"
    status: completed
  - id: step-2i
    content: "2단계 섹션I: 인증 실제 연동 (signup, login, logout, callback)"
    status: completed
  - id: step-2j
    content: "2단계 섹션J: 일기 CRUD 실제 연동 (mockData → Supabase 교체)"
    status: completed
  - id: step-2k
    content: "2단계 섹션K: 마무리 (mockData 삭제, loading/error UI, E2E 테스트)"
    status: in_progress
isProject: true
---

# 나만의 일기장 — 개발 계획

> **규칙: 1단계가 완전히 끝나기 전에는 절대 2단계로 넘어가지 않는다.**
> 각 섹션 완성 후 반드시 멈추고 다음 진행 여부를 사용자에게 확인한다.

참조: [spec.md](/spec.md) | [api-spec.md](/api-spec.md)

---

## 0단계 — 프로젝트 초기 셋업

- **0-1.** `frontend/` 폴더에 Next.js 프로젝트 생성 (`npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"`)
- **0-2.** 불필요한 보일러플레이트 정리 (기본 페이지 내용, 글로벌 CSS 초기화)
- **0-3.** 폴더 구조 생성 — spec.md §4 페이지 구조 + api-spec.md §4 lib 구조에 맞춰 빈 디렉터리 준비

```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── diaries/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── new/page.tsx
│       └── [id]/
│           ├── page.tsx
│           └── edit/page.tsx
├── components/
│   ├── DiaryCard.tsx
│   ├── DiaryForm.tsx
│   └── MoodSelector.tsx
└── lib/
    ├── types.ts
    └── mockData.ts
```

- **0-4.** `lib/types.ts` 작성 — `Diary` 인터페이스 정의 (api-spec.md §3 기준)

```typescript
export interface Diary {
  id: string;
  user_id: string;
  title: string;
  content: string;
  mood: string;
  written_at: string;
  created_at: string;
  updated_at: string;
}
```

- **0-5.** `lib/mockData.ts` 작성 — `Diary[]` 하드코딩 샘플 3~5건 (다양한 mood 포함)
- **0-6.** `app/layout.tsx` 공통 레이아웃 작성 — 폰트, Tailwind 글로벌 스타일, 앱 타이틀
- **0-7.** 개발 서버 실행 확인 (`npm run dev`)

> **0단계 완료 후 사용자에게 확인**

---

## 1단계 — 목업 (Supabase 연동 없음, mockData만 사용)

### 섹션 A: 인증 화면 (목업)

- **1-A-1.** 로그인 페이지 UI (`app/login/page.tsx`)
  - 이메일/비밀번호 입력 폼
  - 로그인 버튼
  - 회원가입 페이지 링크
- **1-A-2.** 회원가입 페이지 UI (`app/signup/page.tsx`)
  - 이메일/비밀번호/비밀번호 확인 입력 폼
  - 가입 버튼
  - 로그인 페이지 링크
- **1-A-3.** 폼 제출 시 mock 동작
  - 로그인 버튼 클릭 → `/diaries`로 이동 (실제 인증 없음)
  - 가입 버튼 클릭 → `/diaries`로 이동 (실제 인증 없음)
- **1-A-4.** 루트 페이지 (`app/page.tsx`) — `/login`으로 리다이렉트

> **섹션 A 완료 후 사용자에게 확인**

### 섹션 B: 일기 목록

- **1-B-1.** `diaries/layout.tsx` — 상단 헤더 (앱 이름, 로그아웃 버튼)
- **1-B-2.** 일기 카드 컴포넌트 (`components/DiaryCard.tsx`)
  - 감정 이모지 표시
  - 제목
  - 날짜 (written_at)
  - 본문 미리보기 (첫 2줄 정도)
- **1-B-3.** 일기 목록 페이지 (`app/diaries/page.tsx`)
  - mockData를 최신순(written_at 기준) 정렬
  - DiaryCard 리스트 렌더링
- **1-B-4.** 빈 상태 UI — 일기가 없을 때 안내 메시지 + 작성 버튼
- **1-B-5.** 새 일기 작성 버튼 → `/diaries/new`로 이동
- **1-B-6.** 카드 클릭 시 `/diaries/[id]`로 이동

> **섹션 B 완료 후 사용자에게 확인**

### 섹션 C: 일기 작성

- **1-C-1.** 감정 이모지 선택 컴포넌트 (`components/MoodSelector.tsx`)
  - 5~6개 이모지 선택지 (예: 😊 😢 😡 😴 🥰 😐)
  - 선택된 이모지 하이라이트
- **1-C-2.** 일기 폼 컴포넌트 (`components/DiaryForm.tsx`)
  - 제목 (text input)
  - 본문 (textarea)
  - 날짜 (date input, 기본값: 오늘)
  - 감정 선택 (MoodSelector)
  - 저장 버튼
  - 작성/수정 모드 공용 (initialData prop으로 구분)
- **1-C-3.** 일기 작성 페이지 (`app/diaries/new/page.tsx`)
  - DiaryForm 렌더링
  - 제출 시 `/diaries`로 이동 (mock)

> **섹션 C 완료 후 사용자에게 확인**

### 섹션 D: 일기 상세 보기

- **1-D-1.** 일기 상세 페이지 (`app/diaries/[id]/page.tsx`)
  - mockData에서 id로 일기 조회
  - 감정 이모지, 제목, 날짜, 본문 전체 표시
- **1-D-2.** 수정 버튼 → `/diaries/[id]/edit`로 이동
- **1-D-3.** 삭제 버튼 + 확인 다이얼로그
  - "정말 삭제하시겠습니까?" 확인
  - 확인 시 `/diaries`로 이동 (mock)
- **1-D-4.** 목록으로 돌아가기 링크 → `/diaries`

> **섹션 D 완료 후 사용자에게 확인**

### 섹션 E: 일기 수정

- **1-E-1.** 일기 수정 페이지 (`app/diaries/[id]/edit/page.tsx`)
  - mockData에서 기존 데이터 불러오기
  - DiaryForm에 initialData로 전달
- **1-E-2.** 수정 제출 시 `/diaries/[id]`로 이동 (mock)
- **1-E-3.** 취소 버튼 → `/diaries/[id]` 상세 페이지로 돌아가기

> **섹션 E 완료 후 사용자에게 확인**

### 섹션 F: 로그아웃 + 전체 플로우 확인

- **1-F-1.** 로그아웃 버튼 클릭 시 `/login`으로 이동 (mock)
- **1-F-2.** 전체 플로우 점검
  1. 로그인 → 목록
  2. 목록 → 새 일기 작성 → 목록
  3. 목록 → 상세 보기
  4. 상세 → 수정 → 상세
  5. 상세 → 삭제 → 목록
  6. 로그아웃 → 로그인

> **1단계 전체 완료 확인 — 사용자가 승인해야만 2단계 진행**

---

## 2단계 — 실제 구현 (Supabase 연동)

### 섹션 G: Supabase 프로젝트 및 DB 설정

- **2-G-1.** Supabase MCP로 `vibe-tutorial` 프로젝트 확인
- **2-G-2.** `diaries` 테이블 생성 (spec.md §3 스키마 기준, Supabase MCP 사용)
  - id: uuid PK default gen_random_uuid()
  - user_id: uuid FK → auth.users(id) NOT NULL
  - title: text NOT NULL
  - content: text NOT NULL
  - mood: text NOT NULL
  - written_at: date NOT NULL
  - created_at: timestamptz NOT NULL default now()
  - updated_at: timestamptz NOT NULL default now()
- **2-G-3.** `updated_at` 자동 갱신 트리거 설정 (`moddatetime` 확장)
- **2-G-4.** RLS 활성화 + 정책 설정
  - SELECT: `auth.uid() = user_id`
  - INSERT: `auth.uid() = user_id`
  - UPDATE: `auth.uid() = user_id`
  - DELETE: `auth.uid() = user_id`

> **섹션 G 완료 후 사용자에게 확인**

### 섹션 H: Supabase 클라이언트 설정

- **2-H-1.** `@supabase/supabase-js`, `@supabase/ssr` 설치
- **2-H-2.** `.env.local` 파일 생성

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

- **2-H-3.** `lib/supabase/client.ts` — 브라우저용 Supabase 클라이언트
- **2-H-4.** `lib/supabase/server.ts` — 서버용 Supabase 클라이언트
- **2-H-5.** `middleware.ts` — Supabase 세션 갱신 + 미인증 시 `/login` 리다이렉트

> **섹션 H 완료 후 사용자에게 확인**

### 섹션 I: 인증 실제 연동

- **2-I-1.** `lib/actions/auth.ts` — `signup` Server Action
  - `supabase.auth.signUp({ email, password })`
  - 성공 시 `/diaries` 리다이렉트
- **2-I-2.** `lib/actions/auth.ts` — `login` Server Action
  - `supabase.auth.signInWithPassword({ email, password })`
  - 성공 시 `/diaries` 리다이렉트
- **2-I-3.** `lib/actions/auth.ts` — `logout` Server Action
  - `supabase.auth.signOut()`
  - `/login` 리다이렉트
- **2-I-4.** `app/auth/callback/route.ts` — Auth 콜백 Route Handler
- **2-I-5.** 로그인/회원가입 페이지 — mock 동작을 실제 Server Action 호출로 교체
- **2-I-6.** 에러 처리 UI (잘못된 이메일/비밀번호, 중복 가입 등)

> **섹션 I 완료 후 사용자에게 확인**

### 섹션 J: 일기 CRUD 실제 연동

- **2-J-1.** `lib/actions/diary.ts` — `getDiaries` (api-spec.md §2-1)
- **2-J-2.** `lib/actions/diary.ts` — `getDiary(id)` (api-spec.md §2-2)
- **2-J-3.** `lib/actions/diary.ts` — `createDiary` Server Action (api-spec.md §2-3)
- **2-J-4.** `lib/actions/diary.ts` — `updateDiary` Server Action (api-spec.md §2-4)
- **2-J-5.** `lib/actions/diary.ts` — `deleteDiary` Server Action (api-spec.md §2-5)
- **2-J-6.** 일기 목록 페이지 — mockData 제거 → `getDiaries` 호출로 교체
- **2-J-7.** 일기 상세 페이지 — mockData 제거 → `getDiary` 호출로 교체
- **2-J-8.** 일기 작성 페이지 — mock 제출 → `createDiary` 호출로 교체
- **2-J-9.** 일기 수정 페이지 — mock 제출 → `updateDiary` 호출로 교체
- **2-J-10.** 일기 삭제 — mock 동작 → `deleteDiary` 호출로 교체

> **섹션 J 완료 후 사용자에게 확인**

### 섹션 K: 마무리

- **2-K-1.** `mockData.ts` 파일 삭제
- **2-K-2.** 로딩 UI (`loading.tsx`) 추가
- **2-K-3.** 에러 UI (`error.tsx`) 추가
- **2-K-4.** 전체 E2E 플로우 테스트
  1. 가입 → 로그인
  2. 일기 작성 → 목록 확인
  3. 상세 보기 → 수정 → 확인
  4. 삭제 → 목록 확인
  5. 로그아웃

> **2단계 전체 완료 확인**

