# AGENTS.md — AI 코딩 어시스턴트용 프로젝트 규칙

이 문서는 이 저장소에서 코드를 작성·수정할 때 **반드시 지킬 규칙**과 **피해야 할 패턴**을 정리한 것이다. 사용자가 매번 같은 설명을 반복하지 않아도 되도록, AI는 작업 전에 이 파일을 기준으로 판단한다.

---

## 기술 스택 (고정)

| 영역 | 선택 |
|------|------|
| 프레임워크 | **Next.js** — **App Router**만 사용 (`app/` 디렉터리) |
| 언어 | **TypeScript** (`.ts`, `.tsx`) |
| 스타일 | **Tailwind CSS** |
| 데이터베이스·백엔드(BaaS) | **Supabase** (클라이언트·서버 연동, 인증·DB 등) |

---

## 해야 할 것 (DO)

### Next.js · App Router

- 라우트·레이아웃·로딩·에러 UI는 `app/` 아래에 구성한다 (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` 등).
- 서버/클라이언트 경계를 명확히 한다. 브라우저 전용 API(`window`, `localStorage` 등)나 훅이 필요하면 파일 상단에 `"use client"`를 두고, 그렇지 않으면 기본적으로 서버 컴포넌트로 둔다.
- 데이터 페칭이 서버에서 가능하면 **서버 컴포넌트**나 **Route Handler**(`app/api/.../route.ts`), **Server Actions**를 우선 고려한다.
- `next/image`, `next/link`, `next/font` 등 Next.js 권장 API를 사용한다.

### TypeScript

- 새 파일은 **`.ts` / `.tsx`**로 작성하고, `any` 남용을 피한다. 불가피할 때만 좁은 범위로 사용하고 이유를 남긴다.
- props·API 응답·DB 행 등 공개 경계에는 **명시적 타입**을 둔다.
- `tsconfig.json`의 `strict` 설정을 존중한다.

### Tailwind CSS

- 스타일은 **유틸리티 클래스**로 작성한다. 재사용이 많은 패턴만 `@apply` 또는 작은 컴포넌트로 추출한다.
- 반응형·다크 모드 등은 Tailwind 브레이크포인트·`dark:` 등 **Tailwind 관례**를 따른다.

### Supabase

- DB 접근·인증·스토리지는 **Supabase 공식 클라이언트 패턴**을 따른다 (서버에서는 서비스 역할 키 노출에 주의).
- 환경 변수는 `.env.local` 등에 두고, **시크릿을 코드나 커밋에 넣지 않는다**. 예: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, 서버 전용 키는 `NEXT_PUBLIC` 접두사 없이 사용.
- RLS(Row Level Security) 정책을 전제로 한 쿼리·권한 모델을 존중한다.

### 공통

- 기존 프로젝트의 **폴더 구조·네이밍·포맷터(ESLint/Prettier)**가 있으면 맞춘다.
- 사용자가 요청한 범위 안에서만 수정하고, 필요한 경우에만 의존성을 추가한다.

---

## 하면 안 되는 것 (DON'T)

### Next.js

- **`pages/` 라우터만으로 새 기능을 만들지 않는다.** (레거시가 없다면 App Router만 사용.)
- App Router와 Pages Router를 **같은 목적의 라우트에 혼용**하지 않는다.
- 서버 컴포넌트 파일에서 **불필요한 `"use client"`**를 넣어 전체 트리를 클라이언트로 만들지 않는다.

### 언어·스타일

- 새 앱/페이지 로직을 **순수 JavaScript(`.js`/`.jsx`)로 추가하지 않는다.** (기존 JS 파일이 있어도 새 코드는 TypeScript로.)
- **인라인 `style={{ ... }}`나 별도 CSS 파일로 레이아웃을 대량 작성**하지 않는다. (Tailwind로 통일. 예외: 서드파티 컴포넌트가 요구하는 최소 스타일 등.)

### Supabase·보안

- **서비스 롤 키**를 클라이언트 번들·`NEXT_PUBLIC_*`·브라우저 노출 코드에 넣지 않는다.
- 사용자 입력을 **검증·이스케이프 없이** 그대로 쿼리에 넣는 패턴을 쓰지 않는다.

### AI 작업 습관

- 요청과 무관한 **대규모 리팩터·파일 이동·문서 대량 추가**를 하지 않는다.
- **환경 변수 실제 값**이나 **실제 API 키**를 코드나 채팅에 쓰지 않는다. 플레이스홀더만 사용한다.

---

## 한 줄 요약

**Next.js App Router + TypeScript + Tailwind + Supabase**로만 새 기능을 만들고, 서버/클라이언트·시크릿·RLS를 구분해 안전하게 작성한다.
