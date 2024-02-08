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

## 설치

```bash
$ npm i @tanstack/react-query
$ npm i @tanstack/react-query-devtools
```

## Provider, DevTools 설정

**[DevTools]**

- DevTools는 개발 시(dev)에만 보임
- QueryClientProvider 안에 ReactQueryDevtools 컴포넌트 추가.
- initialIsOpen(boolean): true 인 경우 처음부터 devtools가 열려있음.
  - 기본값: false

```jsx
// App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient(); // 앱 내에서 동일한 queryClient 사용을 위해.

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

> Error: No QueryClient set, use QueryClientProvider to set one

## useQuery

[[Docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery)]
자체적으로 작동해서 HTTP 요청을 전송하고 **데이터를 갖고**오고 로딩에 대한 상태 정보도 제공함.

### [전달 데이터 - 객체]

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
- initialData: 초기 데이터 설정
  - 함수도 가능. (쿼리가 초기화될 때 한 번만 실행되어 귀중한 메모리 및/또는 CPU를 절약)
  - 앱에서 사용 가능한 초기 데이터가 있으면 설정 가능. 이 값이 캐시에 저장되어 초기 로딩 상태를 건너 뜀. 따라서, staleTime값이 설정되어 있는 경우 그 시간이 지나기 전까지 응답받은 데이터로 변경되지 않음.
  - staleTime 값과 함께 설정하고 싶은 경우 "initialDataUpdatedAt"을 이용.
- initialDataUpdatedAt: 초기 데이터 마지막 업데이트된 기간 설정
- PlaceholderData: initialData와 같이 초기 데이터를 설정하지만 캐시에 저장하진 않음

### [응답 데이터 - 객체]

- data: 실제 응답 데이터 값
- isPending(boolean): 데이터 요청 중인지 체크
  - 쿼리가 비활성화(enabled = false)되면 true로 표시됨.
- isLoading(boolean): 데이터 요청 중인지 체크
  - isPending과는 다르게 쿼리가 비활성화되었다고 해서 true로 표시되지 않음.
- isError(boolean): 오류 응답 받았는지 체크
- error: 발생한 오류에 대한 정보 (message, name, stack)
- refetch(function): 동일한 쿼리 수동으로 호출

### [예제]

```jsx
import { useQuery } from "@tanstack/react-query";

const { data, isPending, isError, error } = useQuery({
  queryKey: ["events"],
  queryFn: fetchEvents,
  // staleTime: 5000,  // 5초
  // gcTime: 1000, // 1초
});

// example)
const [searchTerm, setSearchTerm] = useState(undefined);
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["events", { search: searchTerm }],
  queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
  enabled: searchTerm !== undefined,
});
```

## useMutation

[[Docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation)]
HTTP 요청을 전송하고 **데이터를 변경**하는 쿼리에 최적화.

- 컴포넌트가 렌더링될 때 useQuery와는 달리 요청 즉시 전송되지 않도록 가능. handleSubmit 함수에서 전송하는 등과 같은 **필요할 때만 전송되도록** 가능
- useQuery로도 POST 전송 가능하긴 함.

### [전달 데이터 - 객체]

- **mutationFn**:
  - POST로 전달할 데이터가 필요하지만, 이곳에 익명함수로 데이터를 전달할 필요 없음. 그냥 함수 값만 전달
- mutationKey: 반드시 필요하진 않음. (응답 데이터는 캐시처리 하지 않기 때문에)
- **onSuccess**(function): 데이터 전송 후 변경에 성공하면 실행.

### [응답 데이터 - 객체]

- data: 전송된 요청의 응답 데이터
- **mutate**(function): 쿼리 호출하는 함수.
  - 인자1: 데이터(variable)
  - 인자2: 옵션(option)
- isPending
- isError
- error
- isSuccess

### [예제]

```jsx
import { useMutation } from "@tanstack/react-query";

const { mutate, isPending, isError, error } = useMutation({
  mutationFn: createNewEvent,
});
function handleSubmit(formData) {
  mutate({ event: formData });
}
```

## QueryClient

- invalidateQueries: 쿼리 무효화 [[Docs](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation#query-matching-with-invalidatequeries)]

  - 특정 쿼리로 가져왔던 데이터가 오래되었으니 **만료시키고 _즉시_ 다시 가져오기를 트리거**해야한다고 tanstack쿼리에게 알려줌.
  - queryKey: 트리거할 쿼리의 쿼리키
    - 이 키 값이 포함된 모든 쿼리를 무효화함. 완전히 일치하지 않아도 됨.
    - 만약 ['events', 'image']를 키값으로 갖는 쿼리가 있고, invalidateQueries({ queryKey: ['events']}) 를 하면 이 쿼리도 무효화됨
  - exact: queryKey가 완전히 일치하는 경우에만 무효화함.
  - refetchType [[참고](https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientinvalidatequeries)]
    - 기본 값 : active
    - none: 기존 쿼리가 즉시 자동으로 트리거되지 않도록 함. 기존 쿼리는 무효화되지만 다음번 요청(예, 리렌더링)될 때 다시 실행됨.

  ```jsx
  queryClient.invalidateQueries({ queryKey: [키 값] });  // 키 값 포함하는 모든 쿼리 무효화
  queryClient.invalidateQueries({ queryKey: [키 값], exact });  // queryKey가 완전히 일치하는 쿼리만 무효화
  queryClient.invalidateQueries({ queryKey: [키 값], refetchType: 'none' });  // 즉시 트리거되지 않도록 설정
  ```
