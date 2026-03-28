# 나만의 일기장 — 프로젝트 스펙

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 이름 | 나만의 일기장 |
| 목적 | 개인 일기를 작성·관리하는 웹 앱 |
| 프레임워크 | Next.js (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS |
| 백엔드/DB | Supabase |

---

## 2. 기능 목록 (Phase 1)

| # | 기능 | 설명 |
|---|------|------|
| 1 | 회원가입 / 로그인 | Supabase Auth 이메일+비밀번호 인증 |
| 2 | 로그아웃 | 세션 종료 후 로그인 페이지로 이동 |
| 3 | 일기 작성 | 제목, 본문, 날짜, 감정 이모지 선택 |
| 4 | 일기 목록 | 본인 일기를 최신순으로 정렬하여 표시 |
| 5 | 일기 상세 보기 | 선택한 일기의 전체 내용 확인 |
| 6 | 일기 수정 | 기존 일기의 제목·본문·날짜·감정 수정 |
| 7 | 일기 삭제 | 일기 영구 삭제 (확인 후 처리) |

---

## 3. Supabase 테이블 스키마

### `diaries`

| 컬럼 | 타입 | 제약 조건 |
|------|------|-----------|
| `id` | `uuid` | PK, `gen_random_uuid()` |
| `user_id` | `uuid` | FK → `auth.users(id)`, NOT NULL |
| `title` | `text` | NOT NULL |
| `content` | `text` | NOT NULL |
| `mood` | `text` | NOT NULL |
| `written_at` | `date` | NOT NULL, 사용자가 선택한 일기 날짜 |
| `created_at` | `timestamptz` | NOT NULL, `now()` |
| `updated_at` | `timestamptz` | NOT NULL, `now()` |

---

## 4. 페이지 구조

```
app/
├── layout.tsx              # 공통 레이아웃 (폰트, 글로벌 스타일)
├── page.tsx                # / → 로그인 페이지 (또는 /diaries로 리다이렉트)
├── signup/
│   └── page.tsx            # /signup → 회원가입
├── login/
│   └── page.tsx            # /login → 로그인
└── diaries/
    ├── layout.tsx          # 인증 가드 레이아웃
    ├── page.tsx            # /diaries → 일기 목록
    ├── new/
    │   └── page.tsx        # /diaries/new → 일기 작성
    └── [id]/
        ├── page.tsx        # /diaries/:id → 일기 상세
        └── edit/
            └── page.tsx    # /diaries/:id/edit → 일기 수정
```

---

## 5. 주요 라이브러리

| 패키지 | 용도 |
|--------|------|
| `next` | App Router 기반 프레임워크 |
| `react` / `react-dom` | UI 렌더링 |
| `typescript` | 정적 타입 |
| `tailwindcss` | 유틸리티 기반 스타일링 |
| `@supabase/supabase-js` | Supabase 클라이언트 |
| `@supabase/ssr` | Next.js 서버/클라이언트 쿠키 기반 세션 관리 |
