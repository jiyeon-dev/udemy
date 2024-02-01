import Header from "./components/Header.jsx";
import RefLogin from "./components/Login.jsx";
import StateLogin from "./components/StateLogin.jsx";
import Signup from "./components/Signup.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* <RefLogin /> */}
        <StateLogin />
        {/* <Signup /> */}
      </main>
    </>
  );
}

export default App;
