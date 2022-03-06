import { getProfilImg } from "../../../services/axios";
import styled from "styled-components";
import DefaultProfile from "../../../images/profile.png";
import { useEffect, useState } from "react";

const ProfilePictureStyled = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 25px;
  object-fit: cover;
  margin: 0px 2px;
`;

function ProfilePicture({ userId }) {
  const [profileImg, setProfileImg] = useState();

  useEffect(() => {
    getProfilImg(userId).then((res) => {
      if (res.data[0]) {
        setProfileImg(res.data[0].image_url);
      }
    });
  }, []);

  return (
    <>
      {profileImg ? (
        <ProfilePictureStyled src={profileImg} />
      ) : (
        <ProfilePictureStyled src={DefaultProfile} />
      )}
    </>
  );
}

export default ProfilePicture;
