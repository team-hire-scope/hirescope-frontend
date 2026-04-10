# React Boilerplate

React + TypeScript + Vite 기반 프론트엔드 보일러플레이트입니다.

## 🛠 Tech Stack

### Core & Build

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### State Management & Data Fetching

![Zustand](https://img.shields.io/badge/Zustand_5-orange?style=for-the-badge)
![React Query](https://img.shields.io/badge/React_Query_5-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Styling

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![clsx](https://img.shields.io/badge/clsx-000000?style=for-the-badge)
![tailwind--merge](https://img.shields.io/badge/tailwind--merge-38B2AC?style=for-the-badge)

### Routing & Forms

![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form_7-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

### Testing

![Vitest](https://img.shields.io/badge/Vitest_4-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![MSW](https://img.shields.io/badge/MSW_2-FF6B6B?style=for-the-badge&logo=msw&logoColor=white)

### DX & Linting

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Husky](https://img.shields.io/badge/Husky-brown?style=for-the-badge&logo=npm&logoColor=white)
![lint-staged](https://img.shields.io/badge/lint--staged-4B32C3?style=for-the-badge)

## 📦 Scripts

| 명령어               | 설명                 |
| :------------------- | :------------------- |
| `npm run dev`        | 개발 서버 실행       |
| `npm run build`      | 프로덕션 빌드        |
| `npm run preview`    | 빌드 결과물 미리보기 |
| `npm run lint`       | ESLint 실행          |
| `npm run test`       | Vitest 테스트 실행   |
| `npm run test:watch` | Vitest watch 모드    |
| `npm run test:ui`    | Vitest UI 모드       |

---

## 📋 프로젝트별 설정

아래 규칙은 **프로젝트마다 팀/레포지토리 상황에 맞게 수정**해서 사용하세요.

### PR 규칙

<!-- 프로젝트에서 적용할 PR 규칙을 작성하세요 -->

- [ ] PR 제목은 커밋 컨벤션과 동일하게 작성
- [ ] 설명에 변경 목적, 관련 이슈(있다면) 기재
- [ ] 필요한 경우 스크린샷/동작 방식 첨부
- [ ] 리뷰어 지정 후 승인 후 머지

### 커밋 컨벤션

<!-- 프로젝트에서 적용할 커밋 메시지 규칙을 작성하세요 -->

| 타입       | 설명                              | 예시                          |
| :--------- | :-------------------------------- | :---------------------------- |
| `feat`     | 새 기능                           | `feat: 로그인 API 연동`       |
| `fix`      | 버그 수정                         | `fix: 모달 닫힘 오류 수정`    |
| `docs`     | 문서 수정                         | `docs: README 설치 방법 보완` |
| `style`    | 코드 포맷/스타일 (동작 변경 없음) | `style: Prettier 적용`        |
| `refactor` | 리팩터링                          | `refactor: AuthContext 분리`  |
| `test`     | 테스트 추가/수정                  | `test: LoginForm 테스트 추가` |
| `chore`    | 빌드/설정/패키지 등               | `chore: eslint 규칙 추가`     |

- 본문은 선택 사항, 필요 시 상세 설명 작성
- 제목은 50자 이내, 명령형 사용 권장

### 브랜치 네이밍 규칙

<!-- 프로젝트에서 적용할 브랜치 이름 규칙을 작성하세요 -->

| 종류      | 규칙                                           | 예시                                     |
| :-------- | :--------------------------------------------- | :--------------------------------------- |
| 메인      | `main`                                         | `main`                                   |
| 개발      | `develop`                                      | `develop`                                |
| 기능      | `feature/이슈번호-간단설명` 또는 `feat/기능명` | `feature/123-login`, `feat/user-profile` |
| 버그 수정 | `fix/이슈번호-설명` 또는 `bugfix/설명`         | `fix/456-modal-close`                    |
| 핫픽스    | `hotfix/설명`                                  | `hotfix/login-redirect`                  |

---

## 📝 Naming Convention (네이밍 규칙)

| 분류           | 규칙              | 예시                                | 비고                             |
| :------------- | :---------------- | :---------------------------------- | :------------------------------- |
| **변수/함수**  | `camelCase`       | `const userInfo`, `getUserData()`   | 동사로 시작 권장                 |
| **컴포넌트**   | `PascalCase`      | `LoginModal.tsx`, `UserProfile.tsx` | 파일명과 컴포넌트명 일치         |
| **상수**       | `SCREAMING_SNAKE` | `MAX_COUNT`, `API_URL`              | `const`로 선언된 고정값          |
| **폴더**       | `kebab-case`      | `user-profile`, `login-page`        | (또는 소문자 사용)               |
| **인터페이스** | `PascalCase`      | `IProps`, `UserType`                | `I` 접두사 사용 여부 팀에서 결정 |

---

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173) 으로 접속합니다.

## 📁 프로젝트 구조

```
src/
├── components/    # 공통/재사용 컴포넌트
├── contexts/      # React Context
├── hooks/         # 커스텀 훅
├── mocks/         # MSW 핸들러 등
├── pages/         # 페이지 컴포넌트
├── utils/         # 유틸 함수, test-utils 등
├── App.tsx
└── main.tsx
```
