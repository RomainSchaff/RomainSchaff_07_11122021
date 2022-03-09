import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon from "../../images/icon.svg";
import { UserData, UserPicture } from "./AppContext";
import { getProfilImg } from "../../services/axios";
import DefaultProfileImg from "../../images/profile.png";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

const NavContainer = styled.nav`
  padding: 5px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #1a2dba;
  border-bottom: 1px solid black;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
`;

const HomeLogo = styled.img`
  height: 55px;
  border-radius: 25px;
`;

const StyledTitle = styled.h1`
  color: white;
  font-size: 30px;
  padding: 3px 0px;
  margin-left: 3px;
`;

const NavLinkBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ProfileImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: -15px;
  margin-left: 10px;
  object-fit: cover;
`;

export const StyledLink = styled(Link)`
  padding: 6px 10px;
  margin: 0px 10px;
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover,
  &:focus {
    box-shadow: 3px 3px 5px black;
  }
  &:active {
    color: blue;
  }
  ${(props) =>
    props.$isFullLink &&
    `
    color: black;
    background-color: white;`}
  ${(props) =>
    props.$isProfileLink &&
    `
    padding: 0px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;`}
`;

function Header() {
  const { profileImg, setProfileImg } = useContext(UserPicture);
  const { userData, setUserData } = useContext(UserData);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserData(null);
  }

  useEffect(() => {
    if (userData) {
      async function fetchProfileImg() {
        getProfilImg(userData.user_id).then((res) => {
          setProfileImg(res.data[0]);
        });
      }
      fetchProfileImg();
    } else {
      setProfileImg(null);
    }
  }, [setProfileImg, userData]);

  return (
    <NavContainer>
      <TitleDiv>
        <HomeLogo src={Icon} alt="GroupomaniaLogo" />
        <StyledTitle>Groupomania</StyledTitle>
      </TitleDiv>
      <NavLinkBar>
        <StyledLink to="/">
          <HomeIcon fontSize="large" />
          Accueil
        </StyledLink>
        {userData ? (
          <>
            <StyledLink to="/profile" $isProfileLink>
              {userData.user_firstname}
              {profileImg ? (
                <ProfileImg src={profileImg.image_url} alt="Profile" />
              ) : (
                <ProfileImg src={DefaultProfileImg} alt="Profile" />
              )}
            </StyledLink>
            <StyledLink to="/" onClick={handleLogout} $isFullLink>
              Logout
              <LogoutIcon fontSize="large" />
            </StyledLink>
          </>
        ) : (
          <>
            <StyledLink to="/profile">Profil</StyledLink>
          </>
        )}
      </NavLinkBar>
    </NavContainer>
  );
}

export default Header;
