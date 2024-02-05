# Redux

크로스 컴포넌트 상태 또는 앱 와이드 상태를 위한 상태 관리 시스템.

## react-context를 쓰면 prop 체인이나 prop drilling을 하지 않고 상태 관리가 가능한데 redux를 사용하는 이유?

둘 중 하나만 사용하는 것이 아닌 둘 다 사용해도 문제 없음. (선택해야하는 것이 아님)

- 앱 와이드에서는 하나만 사용하게 될 것이지만, 혼합 가능.

### contextAPI의 잠재적인 단점 존재

> 잠재적인 이유? 우리가 구축하는 앱에서는 중요하지 않을 수 있기 때문에 `잠재적`이라는 단어를 사용함.

1. 설정이 복잡해질 수 있고, 상태관리 또한 상당히 복잡해질 수 있음. (Complex Setup/Management)
   복잡성은 구축하는 애플리케이션의 종류에 따라 달라질 순 있음. 소/중형 애플리케이션은 문제가 되지 않겠지만, 엔터프라이즈 수준의 애플리케이션 같은 대형 애플리케이션을 구축하면 아주 다양한 컨텍스트를 사용하게 되므로 ContextProvider의 중첩이 많아지게 됨.

```jsx
<AuthContextProvider>
  <ThemeContextProvider>
    <UIInteractContextProvider>
      <MultiSetupFormContextProvider>
         ...
```

만약, 큰 컨텍스트 하나에 모든 상태를 관리하게 되면 하나의 컨텍스트에서 모든 것을 관리하기 때문에 그것 자체를 유지하고 관리하기 어려워짐.

2. 성능
   리액트 팀원이 2018년 말 올린 공식 언급에 따르면...
   > 저빈도 업데이트(테마 변경, 인증 등)는 아주 좋지만, 고빈도 변경(자주,빈번히 일어나는 변경)에는 적합하지 않다.
   > 그리고 새 컨텍스트는 유동적인 상태 확산을 대체할 수 없다. ( 리덕스는 유동적인 상태 관리 라이브러리임. )

## 리덕스 작동 방식

> 애플리케이션 내 **하나**의 중앙 데이터 저장소(Central Data(State) Store)

이 하나의 저장소에 모든 정보를 저장.
이 곳에 모든지 저장하다보니 관리가 어려울 것 같지만 우린 그 저장소 전체를 항상 관리할 필요가 없음.

> 컴포넌트에서는 저장소를 subscription(구독)을 설정 → 데이터가 변경될 때마다 저장소가 컴포넌트에 알려줌 → 컴포넌트는 필요한 데이터를 받음

**중요 규칙**

- 컴포넌트는 절대로 저장된 데이터를 **직접 조작하지 않음**.
- **데이터는 절대 반대 방향으로 흐르지 않음.**
  그대신 `리듀서`함수라는 것을 이용해서 저장소의 데이터를 업데이트 함. (useReducer훅을 말하는 것이 아님. 함수를 입력받아서 그 입력을 변환하고 줄이는 reducer라는 개념을 이용한 것임.)

### 전체적인 작동 방식

만약, 버튼을 누르면 데이터를 변경하도록 하고 싶다면?

> 버튼을 클릭(액션)하면 데이터 변경을 트리거하게 된다. → 컴포넌트가 액션(action)을 발송(dispatch)함. → 액션을 리듀서로 전달 → 액션이 원하는 걸 리듀서가 실행 → 리듀서에서 새로운 상태 생성 → 구독(subscription) 중인 컴포넌트가 알림을 받음 → UI 업데이트

## Reducer Function

표준 자바스크립트 함수. 리덕스 라이브러리에 의해 호출됨.

1. 두개의 인자를 항상 받으며, 항상 출력을 리턴해야만 함.

- 첫번째 인자: **기존의 상태**(old state)
- 두번째 인자: **발송된 액션**(Dispatched action)
- 리턴 값: **새로운 상태 객체**(new state object)
  - 이론적으로는 숫자, 문자열 등 가능하지만 실제로는 대부분 개게인 경우가 많음.

2. 함수 안에서는 **부수적인 효과가 없어야 함**.

- HTTP요청 전송, 로컬 저장소에서 데이터를 갖고오거나 기록 등

## 리덕스 예제

```js
const redux = require("redux");

// 리듀서 함수
// 저장소가 초기화될 때 리덕스가 리듀서 함수를 실행함. 그래서 state 값이 없어 오류가 발생하기 때문에 값을 0으로 초기화 해줌.
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
  return state; // default state
};

// 저장소 생성
const store = redux.createStore(counterReducer);

// 구독 - 상태가 변경될 때마다 트리거됨.
const counterSubscriber = () => {
  const latestState = store.getState(); // 업데이트된 후에 최신 상태 스냅샷 제공
  console.log(latestState);
};
store.subscribe(counterSubscriber); // 리덕스가 이 구독 함수를 인식하고 상태가 변경될 때마다 이 함수를 실행하라고 선언

// dispatch - 무조건 type 속성이 정의된 action을 전달해야 함. (Actions may not have an undefined "type" property.)
store.dispatch({ type: "increment" }); // { counter: 1 }
store.dispatch({ type: "decrement" }); // { counter: 0 }
store.dispatch({ type: "decrement" }); // { counter: -1 }
store.dispatch({ type: "" }); // { counter: -1 }
```

## 리덕스 설치

리덕스는 리액트에서만 사용하는 것이 아님. 자바스크립트 프로젝트에도 사용 가능함.  
그리고 리덕스는 리액트에 관해 알지도 못하고 리액트에 관심도 없음.  
그래서 리액트에서 리덕스를 쉽게 작업하기 위해서는 두 개의 패키지를 설치해야함.

```npm
$ npm install redux react-redux
```

- react-redux
  - 리액트 앱과 리덕스 스토어, 리듀서에 간단히 접속함.

## 리액트에 Provider 설정

```jsx
// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

```jsx

```

## 저장소에 있는 데이터 접근 방법

```jsx
import { useSelector } from "react-redux";
import classes from "./Counter.module.css";

export default function Counter() {
  const counter = useSelector((state) => state.counter);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
}
```

- useStore 훅 : 저장소에 직접 접근
- useSelector 훅 : 이게 useStore보다 더 편리함. 저장소가 관리하는 상태 부분을 선택 가능
  ```jsx
  /**
   * 상태 전체중 일부분(state.counter)만 잘라내서 받음.
   * useSelector 안의 함수는 react-redux가 실행함.
   * 실행될 때 리덕스 상태(관리된 데이터)를 useSelector안의 함수에 넣고 코드를 실행해서 컴포넌트에서 필요하는 상태 부분을 받음.
   */
  const counter = useSelector((state) => state.counter);
  ```

useSelector를 사용할 때 react-redux는 이 컴포넌트를 위해 리덕스 저장소에 자동으로 `구독`설정을 함.(중요!) 그래서 리덕스 저장소 안 데이터 값이 변경되면 컴포넌트를 재실행함.  
만약 컴포넌트를 제거하거나 DOM이 제거되면 react-redux도 자동으로 구독을 해지함. (배후에서 구독을 관리해줌)

## 액션 실행 방법 - dispatch

dispatch 훅을 이용하면 실행할 수 있는 디스패치 함수를 반환함.

```jsx
import { useSelector, useDispatch } from "react-redux";
const dispatch = useDispatch();

const incrementHandler = () => {
  dispatch({ type: "increment" });
};
const decrementHandler = () => {
  dispatch({ type: "decrement" });
};
```

```jsx
import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";

export default function Counter() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };
  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>increment</button>
        <button onClick={decrementHandler}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
}
```

## 여러개 상태값 관리하기

토글 같은 경우 이 컴포넌트에서만 사용하기 때문에 useState를 사용하는 것이 맞으나, 여러개의 상태값을 다루는 예제를 위해 redux에 추가함.

```js
import { createStore } from "redux";

const initialState = { counter: 0, showCounter: true };
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }

  if (action.type === "increase") {
    return {
      ...state,
      counter: state.counter + action.amount,
    };
  }

  if (action.type === "decrement") {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }

  if (action.type === "toggle") {
    return {
      ...state,
      showCounter: !state.showCounter,
    };
  }

  return state; // default state
};

const store = createStore(counterReducer);

export default store;
```

```jsx
import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";

export default function Counter() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };
  const increaseHandler = (num) => {
    dispatch({ type: "increase", amount: num });
  };
  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {
    dispatch({ type: "toggle" });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>increment</button>
        <button onClick={() => increaseHandler(5)}>increment by 5</button>
        <button onClick={decrementHandler}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
}
```

## 리듀서에서 state 올바르게 사용하기

### 무조건 새 state를 반환해야하는 이유.

1. 만약, 모든 상태값을 반환하지 않은 경우, 반환되지 않은 상태는 undefined되어 버림.

```js
const initialState = { counter: 0, showCounter: true };
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return { counter: 0 }; // showCounter는 false가 됨
  }
  return state;
};
```

2. 아래와 같이 기존 state를 변경하고 그것을 반환하면 안될까?

```js
const initialState = { counter: 0, showCounter: true };
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    state.counter++;
    return state;
  }
  if (action.type === "decrement") {
    state.counter++;
    return { counter: state.counter, showCounter: state.showCounter };
  }
  return state;
};
```

물론 작동은 되지만 둘다 잘못된 것임. `state.counter++;`를 하면 안됨. **redux로 작업할 때 절대로 해서는 안됨.!**
**절대로 기존의 state를 변경해서는 안됨! 대신에 새로운 state객체를 반환하여 항상 재정의해야함.**
또한 객체와 배열은 자바스크립트에서 참조 값이기 때문에 뜻하지 않게 기존의 state를 재정의하거나 변경하기 쉬움.
이로 인해 예측 불가능한 동작이 발생할 수도 있고 프로그램을 디버깅하는 것도 어려워지고, 예기치 않은 부작용이 생길 수 있음.
[참고](https://academind.com/tutorials/reference-vs-primitive-values)

따라서 중첩된 객체를 복사하거나 삭제할 때는 항상 새로운 객체를 반환해야함. "항상 새 값을 생성"해야함.
