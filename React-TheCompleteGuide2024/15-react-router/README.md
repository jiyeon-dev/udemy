# React Router

Learn how to use react-router-dom [[Docs](https://reactrouter.com/en/main)]

---

# Router 정의 방법

### 방법1

```jsx
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path='/' element={<HomePage />} />
    <Route path='/products' element={<ProductsPage />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
```

### 방법2

```jsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";

const router = createBrowserRouter([
  { path: "", element: <HomePage /> }, // main page
  { path: "/products", element: <ProductsPage /> },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
```

# 레이아웃 설정 방법

- children : 자식 페이지
- element: 보여줄 컴포넌트 페이지
- path : 경로
  - 앞에 `/` 가 있는 경우 절대경로 | `/`가 없는 경우 상대경로
  - 상대경로: 현재 경로에 path를 추가함.
  - 따라서 부모 path가 / 가 아닌 경우, children의 path는 상대경로로 적어야 함.
  ```jsx
  {
    path: "/root",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },  // url => /root
      { path: "products", element: <ProductsPage /> },  // url => /root/products
      { path: "products/:id", element: <ProductDetailPage /> },  // url => /root/products/:id
    ],
  }
  ```
- index(boolean): 부모 라우트가 활성화된 경우 로딩되어야 하는 기본 라우트 설정. 꼭 사용해야하는 건 아님

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> }, // main page
      { path: "/products", element: <ProductsPage /> }, // 절대 경로로 선언
    ],
    errorElement: <ErrorPage />, // 에러 페이지(ef 404)
  },
]);
```

# Link

- relative (default: route) : 연관된 경로로 이동
  - Link to 가 절대 경로인 경우엔 상관 없음.
  - Link to 가 상대 경로인 경우 (예. ..)
    - route: 부모 라우트로 이동
    - path: 형제 라우트로 이동

```jsx
<Link to='/'>Home</Link>

// 이전 경로로 이동
<Link to='..'>Back</Link>  {/* 상대경로인 경우 형제가 아닌 부모 라우트로 돌아감. */}
<Link to='..' relative='path'>Back</Link> {/* 상대경로인 경우 바로 이전 path로 돌아감.  */}
```

# NavLink

[[Docs](https://reactrouter.com/en/main/components/nav-link)]
Link 컴포넌트와는 다르게 className, style 프로퍼티를 추가하면 문자열을 받지 않고 함수를 받는 프로퍼티가 됨.  
이 함수는 자동적으로 isActive, isPending 등 값을 받고 `<a>`태그에 추가되어야 하는 클래스 이름을 리턴함.

- end: 현재 URL path가 to에 입력된 값으로 끝나는 경우에만 활성으로 간주함 - [참고](https://reactrouter.com/en/main/components/nav-link#end)
  하지만 "/"의 경우 루트 경로이기 때문에 예외적으로 루트 경로에 있을 때만 활성화됨.

```jsx
<NavLink
  to='/'
  className={({ isActive }) => (isActive ? classes.active : undefined)}
  end
>
  Home
</NavLink>
<NavLink
  to='/products'
  className={({ isActive }) => (isActive ? classes.active : undefined)}
>
  Products
</NavLink>
```

# Navigation

프로그래밍 적으로 (강제로) 다른 페이지로 이동

```jsx
import { Link, useNavigate } from "react-router-dom";

const navigate = useNavigate();
const navigateHandler = () => {
  navigate("/products");
};
```

# 동적 라우팅

역동적으로 세크먼트 추가 → `:식별자`

```jsx
{ path: "/products/:productId", element: <ProductDetailPage /> },
```

컴포넌트에서 parameter 를 받기 위해서는 `useParams()`훅 사용.

- `useParams()` : 라우트 정의에서 프로퍼티로 정의한 모든 역동적 경로 세그먼트가 담긴 JS객체
- `params.[식별자]`

```jsx
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const params = useParams();
  console.log(params); // { productId: 123 }

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p> {/* 123 */}
    </>
  );
}
```
