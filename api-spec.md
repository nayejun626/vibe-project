# 나만의 일기장 — API 스펙

Phase 1에서 사용하는 Server Actions 및 Route Handler 정의.
인증은 Supabase Auth, 데이터 접근은 Supabase Client를 사용한다.

---

## 1. 인증 (Supabase Auth)

| 동작 | 방식 | 함수 / 경로 | 설명 |
|------|------|-------------|------|
| 회원가입 | Server Action | `signup` | `supabase.auth.signUp({ email, password })` |
| 로그인 | Server Action | `login` | `supabase.auth.signInWithPassword({ email, password })` |
| 로그아웃 | Server Action | `logout` | `supabase.auth.signOut()` → `/login` 리다이렉트 |
| Auth 콜백 | Route Handler | `GET /auth/callback` | 이메일 확인 후 세션 교환 처리 |

### 요청 / 응답

**signup, login**

```
요청: { email: string, password: string }
성공: /diaries로 리다이렉트
실패: 에러 메시지 반환
```

**logout**

```
요청: 없음
성공: /login으로 리다이렉트
```

---

## 2. 일기 CRUD (Server Actions)

모든 액션은 서버에서 `supabase.auth.getUser()`로 인증을 확인한다.
인증 실패 시 `/login`으로 리다이렉트한다.

### 2-1. 일기 목록 조회

| 항목 | 내용 |
|------|------|
| 함수 | `getDiaries` |
| 방식 | 서버 컴포넌트에서 직접 호출 |
| 쿼리 | `supabase.from('diaries').select('*').eq('user_id', user.id).order('written_at', { ascending: false })` |

**응답**

```
Diary[] — 최신순 정렬된 일기 배열
```

### 2-2. 일기 상세 조회

| 항목 | 내용 |
|------|------|
| 함수 | `getDiary(id)` |
| 방식 | 서버 컴포넌트에서 직접 호출 |
| 쿼리 | `supabase.from('diaries').select('*').eq('id', id).eq('user_id', user.id).single()` |

**응답**

```
Diary | null
```

### 2-3. 일기 작성

| 항목 | 내용 |
|------|------|
| 함수 | `createDiary` |
| 방식 | Server Action |

**요청**

```
{
  title:      string
  content:    string
  mood:       string    // 감정 이모지
  written_at: string    // "YYYY-MM-DD"
}
```

**처리**

```
supabase.from('diaries').insert({ user_id, title, content, mood, written_at })
성공: /diaries로 리다이렉트
실패: 에러 메시지 반환
```

### 2-4. 일기 수정

| 항목 | 내용 |
|------|------|
| 함수 | `updateDiary` |
| 방식 | Server Action |

**요청**

```
{
  id:         string
  title:      string
  content:    string
  mood:       string
  written_at: string
}
```

**처리**

```
supabase.from('diaries').update({ title, content, mood, written_at }).eq('id', id).eq('user_id', user.id)
성공: /diaries/:id로 리다이렉트
실패: 에러 메시지 반환
```

### 2-5. 일기 삭제

| 항목 | 내용 |
|------|------|
| 함수 | `deleteDiary` |
| 방식 | Server Action |

**요청**

```
{ id: string }
```

**처리**

```
supabase.from('diaries').delete().eq('id', id).eq('user_id', user.id)
성공: /diaries로 리다이렉트
실패: 에러 메시지 반환
```

---

## 3. TypeScript 타입

```typescript
interface Diary {
  id:         string;
  user_id:    string;
  title:      string;
  content:    string;
  mood:       string;
  written_at: string;
  created_at: string;
  updated_at: string;
}
```

---

## 4. 파일 구조 (예상)

```
lib/
├── supabase/
│   ├── client.ts           # 브라우저용 Supabase 클라이언트
│   └── server.ts           # 서버용 Supabase 클라이언트
├── types.ts                # Diary 타입 정의
└── actions/
    ├── auth.ts             # signup, login, logout
    └── diary.ts            # createDiary, updateDiary, deleteDiary
```
