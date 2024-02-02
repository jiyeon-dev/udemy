# React Test

Learn How to Test the react app

- [테스팅개요](https://ko.legacy.reactjs.org/docs/testing.html)
- [테스팅방안](https://ko.legacy.reactjs.org/docs/testing-recipes.html)

# 파일 설명

setupTests.js

- 테스트 설정 작업 해주는 파일

[컴포넌트명].test.js

- 테스트 코드를 포함하는 파일
- App 컴포넌트를 테스트하기 위해 있는 파일
- 테스트 하려는 파일에 `test`만 붙이는 것이 관례

# 테스트

## test 함수

- 인자1 : 테스트에 대한 설명 ( 테스트 식별자 )
- 인자2 : 실행 함수(익명 함수)

- exact

  - true: 정확히 일치(대소문자 확인) - 기본값
  - false: 부분 일치(대소문자 확인X)

- Queries
  - https://testing-library.com/docs/queries/about/#types-of-queries
  - getBy : 엘리먼트가 있는 경우에만 찾을 수 있음. ( 엘리먼트 없으면 오류 발생 )
  - queryBy : 쿼리로 조회. 엘리먼트 없으면 null 반환
  - findBy : promise 방식 조회. 엘리먼트 없으면 rejected 됨.
    - HTTP 요청 관련 async 때 사용.
    - 과정이 성공할 때 까지 여러 차례 screen 재평가함.
    - 값, exact데이터, 타임아웃값(기본값 1초)
      ```jsx
      screen.findAllByRole("listitem", { exact: true }, { timeout: 1000 });
      ```
- expect
  - https://jestjs.io/docs/expect

```jsx
test("renders Hello World as a text", () => {
  // Arrange - 준비
  render(<Greeting />);

  // Act

  // Assert - 단언
  const helloWorldElement = screen.getByText("Hello World!", { exact: true });
  expect(helloWorldElement).toBeInTheDocument();
});
```

## describe

- 테스트들을 `그룹화`함 (하나의 suite에 몰아 넣음)
- 인자1 : 테스트에 대한 설명
- 인자2 : 익명 함수안에 테스트(test)들을 넣음.

```jsx
describe("Greeting component", () => {
  test("renders Hello World as a text", () => {
    // Arrange - 준비
    render(<Greeting />);

    // Act

    // Assert - 단언
    const helloWorldElement = screen.getByText("Hello World!", { exact: true });
    expect(helloWorldElement).toBeInTheDocument();
  });
});
```

## 유저 이벤트 테스트

```shell
$ npm install @testing-library/user-event
```

실제 화면에서 사용자 이벤트를 작동시키도록 돕는 객체 (click, dblClick, hover...)

```jsx
test("does not render 'good to see you' if the button was clicked", () => {
  render(<Greeting />);

  // Act
  const buttonElement = screen.getByRole("button");
  userEvent.click(buttonElement);

  // Assert
  /**
   * 없는 엘리먼트 검사할 땐 queryByText 를 이용. 엘리먼트 없으면 null 반환함.
   * 반면, getByText는 엘리먼트 없으면 오류 반환함.
   */
  const outputElement = screen.queryByText("good to see you");

  /**
   * 어쩌피 엘리먼트가 없어서 outputElement가 null이니깐 toBeNull로 검사해도 됨.
   * expect(outputElement).not.toBeInTheDocument();
   */
  expect(outputElement).toBeNull();
});
```

## 비동기 코드 테스트

- 요소를 찾을 떄는 find 쿼리를 이용해야 함.

```jsx
describe("Async Component", () => {
  test("renders posts if request succeeds", async () => {
    render(<Async />);

    /**
     * - Available HTML Roles : https://www.w3.org/TR/html-aria/#docconformance
     * - getByRole은 한 개 초과시 오류 발생
     * - get 쿼리는 즉시 screen에서 요소를 찾음.
     * - find 쿼리는 프로미스를 반환함.
     */
    const listItemElements = await screen.findAllByRole("listitem", {}, {});
    expect(listItemElements).not.toHaveLength(0);
  });
});
```

### 위 테스트 코드의 문제점

HTTP 요청을 보내고 있다.
테스트할때 일반적으로 서버에 HTTP요청을 전송하지 않는다. 그 이유는

1. 많은 네트워크 트래픽을 일으켜 서버가 요청들로 인해 과부하될 것이기 때문.
2. 서버로 POST요청을 한다면 테스트로 인해 데이터베이스에 데이터가 삽입되거나 내용이 변경될 수 있음.

그래서 테스트 작성할 때 보통 진짜 요청을 전송하지 않거나 테스트 서버로 요청을 전송함.

### 서버로 요청을 하지 않는 방식

jest mock 데이터 사용

- jest는 몇가지 유틸리티 메소드를 갖음
- fn: 더미(mock) 함수를 만듬
- mockResolvedValueOnce(): fetch 함수가 호출되었을 때 결정되어야 하는 값을 설정할 수 있게 해줌. 코드에서 사용된 무언가로 결정되어야 함.

```jsx
describe("Async Component", () => {
  test("renders posts if request succeeds", async () => {
    window.fetch = jest.fn(); // 내장 fetch 함수를 더미 함수로 덮어씌움
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First Post" }],
    }); // Async 컴포넌트에서 fetch 시 json()을 Promise로 반환하기 때문에 async 사용함.
    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem", {}, {});
    expect(listItemElements).not.toHaveLength(0);
  });
});
```

### hook 테스트

- react-hooks-testing-library 사용하여 리액트 훅, 커스텀 훅 테스트를 간단하게 할 수 있음.
