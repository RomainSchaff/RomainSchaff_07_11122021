import { useState, useEffect } from "react";
import Router from "./components/Routes/Routes";
import { UserData, UserPictureProvider } from "./components/Routes/AppContext";
import { useContext } from "react";
import { getUserData } from "./services/axios";

function App() {
  const [loading, setLoading] = useState(true);
  const userDataStorage = JSON.parse(localStorage.getItem("userData"));
  const { setUserData } = useContext(UserData);

  useEffect(() => {
    if (userDataStorage && loading) {
      getUserData(userDataStorage.user_id).then((res) => {
        setUserData(res.data[0]);
        console.log("User Datas Ok");
      });
    }
    setLoading(false);
  }, []);

  return (
    <UserPictureProvider>
      <Router />
    </UserPictureProvider>
  );
}

export default App;
