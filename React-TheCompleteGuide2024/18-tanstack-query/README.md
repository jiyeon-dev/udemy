# TanStack Query

[[Docs](https://tanstack.com/query/latest)]

> Sending HTTP Requests With Ease

- What is Tanstack Query & Why Would You Use It?
- Fetching & Mutating Data
- Configuring Tanstack Query
- Advanced Concepts: Cache Invalidation, Optimistic Updating & More!

# Tanstack Query

## 장점

1. 화면이 활성화되면 데이터를 다시 불러옴.

- 예) vscode에서 웹 사이트로 오면 새로운 데이터가 불러와짐.

2. 데이터 캐싱

   tanstack는 요청을 통해 얻은 응답 데이터를 캐시 처리하고 나중에 동일한 쿼리 키를 가진 다른 useQuery가 실행되면 이 데이터를 재사용함. 이와 동시에 내부적으로 이 요청을 다시 전송해서 업데이트된 데이터가 있는지 확인하고 업데이트된 데이터로 캐시에 저장된 데이터를 자체적으로 교체함. 데이터를 갖고오는데 몇 초 또는 더 오랜 시간이 걸릴 수도 있지만 화면에는 업데이트된 데이터가 표시됨.

- 예) 상세 페이지 갔다가 목록으로 돌아오면 목록 데이터를 다시 서버에서 불러오는 것이 아닌 캐시에 저장되어 있는 데이터가 불러와짐.

## Provider 설정

```jsx
// App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

> Error: No QueryClient set, use QueryClientProvider to set one

## useQuery

[[Docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery)]
자체적으로 작동해서 HTTP 요청을 전송하고 데이터를 갖고오고 로딩에 대한 상태 정보도 제공함.

[전달 데이터 - 객체]

- **queryFn**: HTTP요청에 전송할 실제 코드
  - tanstack은 HTTP요청을 전송하는 로직이 내장되어 있지 않음. 대신 요청 관련 데이터 및 발생 가능한 오류 추적등 요청을 관리하는 로직을 제공함.
  - 그래서 직접 요청 전송 코드를 직접 작성해야함.
  - axios(서드 파티 라이브러리), fetch 와 같은 걸로 요청 전송 가능.
  - 그런데 useQuery는 `Promise를 반환하는 함수가 필요한 것`이기 때문에 꼭 요청을 전송할 필요는 없음.
  - QueryFunctionContext 매개변수를 받음
    - meta: query에 대한 추가 정보 메모 (string)
    - queryKey
    - signal: AbortSignal 을 의미 (네트워크 요청을 중간에 중단시킬 수 있는 장치). GET요청 시 signal옵션을 넣어주면 컴포넌트 unmount시 자동으로 네트워크 취소됨
      > 모든 GET요청에 Abort Signal을 넣으면 작업부하를 올릴뿐 바람직하지 않음. 동영상 다운로드같은 대용량 fetching이 아닌이상 대부분의 GET요청을 빠르게 완료 및 캐싱되기 때문에 성능에 유의미한 영향을 끼치지 못하기 때문.
- **queryKey**: 쿼리 키(배열)
  - useQuery사용할 때 모든 쿼리를 전송하는 모든 GET HTTP요청에는 쿼리 키가 있음.
  - tanstack 쿼리는 내부에서 이 쿼리 키를 이용해 요청으로 `생성된 데이터를 캐시 처리`함. 그래서 나중에 동일한 요청을 전송하면 이전 요청의 응답을 재사용 가능.
  - 배열이기 때문에 여러개 키 입력 가능. 문자열 뿐만 아니라 중첩 배열, 객체 등 키 가능.
- **staleTime**: 캐시에 데이터가 있을 때 업데이트된 데이터를 가져오기 위한 추가 요청을 전송하기 전 기다릴 시간 설정(단위 : ms)
  - 기본 값 : 0
  - 예) 5000으로 설정한 경우 → 데이터 캐싱된 후 5초 지난 다음 추가 요청 전송
    페이지 로딩 된 후 5초 이내에 페이지를 재 렌더링하는 경우 staleTime이 5초로 되어 있기 때문에 쿼리 재요청X, 하지만 캐싱된지 5초가 지난 후 페이지 재 렌더링하면 재요청함.
- **gcTime**: 가비지 컬렉션 시간 설정(단위 : ms)
  - 기본 값 : 5분
  - 설정 시간 만큼만 캐시에 데이터를 저장한 후 폐기함.
- **enabled**(boolean): false인 경우 쿼리가 비활성화되어 요청이 전송되지 않음.
  - 기본 값 : true
  - 쿼리가 비활성화되면 tanstack쿼리가 상태를 대기중으로 처리했기 때문에 isPending값이 true가 됨 (데이터가 없으니 데이터가 오기를 (활성화되기를) 기다리고 있기 때문에 대기중인 상태로 표시되는 것임.)

[응답 데이터 - 객체]

- data: 실제 응답 데이터 값
- isPending(boolean): 데이터 요청 중인지 체크
  - 쿼리가 비활성화(enabled = false)되면 true로 표시됨.
- isLoading(boolean): 데이터 요청 중인지 체크
  - isPending과는 다르게 쿼리가 비활성화되었다고 해서 true로 표시되지 않음.
- isError(boolean): 오류 응답 받았는지 체크
- error: 발생한 오류에 대한 정보 (message, name, stack)
- refetch(function): 동일한 쿼리 수동으로 호출

```jsx
import { useQuery } from "@tanstack/react-query";

const { data, isPending, isError, error } = useQuery({
  queryKey: ["events"],
  queryFn: fetchEvents,
  // staleTime: 5000,  // 5초
  // gcTime: 1000, // 1초
});
```
