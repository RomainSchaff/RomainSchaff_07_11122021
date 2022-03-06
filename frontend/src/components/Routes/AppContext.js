import { createContext, useState } from "react";

export const UserData = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  return (
    <UserData.Provider value={{ userData, setUserData }}>
      {children}
    </UserData.Provider>
  );
};

export const UserPicture = createContext();

export const UserPictureProvider = ({ children }) => {
  const [profileImg, setProfileImg] = useState();
  return (
    <UserPicture.Provider value={{ profileImg, setProfileImg }}>
      {children}
    </UserPicture.Provider>
  );
};
