import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // Auth 상태를 listen -> log in 여부 판단
      if (user) {
        setUserObj(user); // user 정보를 userObj 에 담음
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> // userObj를 props로 router 에 전달
      ) : (
        "Initializing..."
      )}
      <footer> &copy; {new Date().getFullYear()} MaxTwitter </footer>
    </>
  );
}

export default App;
