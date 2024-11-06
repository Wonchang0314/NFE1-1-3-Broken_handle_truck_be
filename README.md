# 프로그래머스 데브코스 웹프론트엔드-1-3차 team-10팀 Backend
## 핸들이 고장난 푸드트럭 Backend Repo

### 프로젝트 개요
길거리에서 만날 수 있는 붕어빵, 호떡 등과 같은 노점들은 우리의 일상에 소소한 즐거움을 더해주지만, 이들이 언제 어디에서 열리는지 알기 어려운 경우가 많습니다. 특히 좋아하는 푸드트럭이나 노점의 일정이 단속 때문에 급하게 시간이나 장소를 변경하는 경우, 이를 매번 확인할 수 있는 방법이 부족하다는 점에서 불편함을 느꼈습니다.

이러한 상황에서 **사장님들이 직접 자신의 영업 정보를 편리하게 공유할 수 있는 플랫폼**이 있으면 어떨까 하는 생각에서 이 웹 애플리케이션을 기획하게 되었습니다.

### 기술 스택
- **Frontend**: React, Typescript
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose 사용)
- **Authentication**: JWT, OAuth (카카오 로그인 지원)
- **Real-time Update**: WebSocket (푸드트럭 위치나 시간 변경 알림)

### API 문서
API 엔드포인트 및 사용 예시는 아래의 Swagger 링크에서 확인할 수 있습니다:
- [API 문서 보기](https://port-0-nfe1-1-3-broken-handle-truck-be-m2sh5v6z733a6e47.sel4.cloudtype.app/api-docs/)

### 배운 점
이 프로젝트를 통해 다음과 같은 백엔드 개발 지식을 학습했습니다:
- **Express를 통한 백엔드 개발 기초**
- **JWT 토큰을 통한 인증 방식**
- **OAuth 연동을 통한 외부 서비스 로그인**
- **WebSocket을 활용한 실시간 데이터 업데이트**

---

## 환경변수

- `RUNNING_PORT`: 서버가 실행될 포트 (기본값: 8080)
- `MONGO_DB_URI`: MongoDB 연결 URI (기본값: mongodb://localhost:27017/Broken_handle)
- `JWT_ACCESS_SECRET`: Access 토큰을 위한 비밀 키
- `JWT_REFRESH_SECRET`: Refresh 토큰을 위한 비밀 키
- `FRONT_BASE_URL`: 프론트엔드 기본 URL (기본값: http://localhost:5173)
- `NODE_ENV`: 실행 환경 설정 (기본값: null, 배포 시: "product")
- `KAKAO_REST_API_KEY`: 카카오 로그인 REST API 키 (필수)
- `KAKAO_REDIRECT_URI`: 카카오 인증 코드 응답을 받을 백엔드 엔드포인트

## 실행 스크립트

- `npm run dev`: 개발 환경에서 서버 실행
- `npm run build`: 프로젝트 빌드
- `npm run start`: 빌드된 서버 실행

