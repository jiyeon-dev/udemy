# Task Bud App

react-query 활용 프로젝트  
기존 [groceryBud-app](<https://github.com/jiyeon-dev/udemy/tree/main/React%2018%20Tutorial%20and%20Projects%20Course%20(2023)/groceryBud-app>)에서는 useState 를 이용한 로컬 데이터로 이용했다면, 이 프로젝트는 Server 로 부터 데이터를 불러와서 사용하는 방식.

## Before front-end Start...

server 폴더에 있는 node.js 로 구현된 서버를 실행해 주어야 한다.

```bash
$ npm install
$ npm start
```

기본적으로 포트는 `5000`번으로 되어 있다. URL 접속 시 "Hello From Server..."가 화면에 표시되면 정상적으로 서버가 실행된 것이다.

```
http://localhost:5000
```

만약 오유가 발생한다면, 포트 번호를 다른 포트(예, 5001)로 바꿔서 실행하면 된다.

```javascript
// server.js 파일 내 63번째 줄 5001 포트로 변경
const port = 5001;
```

그 후 frontend 폴더에 있는 react 를 실행해 주면 된다.

```bash
$ npm install
$ npm run dev
```
