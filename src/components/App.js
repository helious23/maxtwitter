import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // Auth 상태를 listen -> log in 여부 판단
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user); // user 정보를 userObj 에 담음
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> // userObj를 props로 router 에 전달
      ) : (
        "Initializing..."
      )}
      <footer> &copy; {new Date().getFullYear()} MaxTwitter </footer>
    </>
  );
}

export default App;
