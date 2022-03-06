import { useContext, useEffect, useState } from "react";
import UploadImg from "./UploadImg";
import DefaultPicture from "../../images/profile.png";
import DesactivateAccount from "./DesactivateAccount";
import { UserData, UserPicture } from "../Routes/AppContext";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { getProfilImg, getUserPosts, putBio } from "../../services/axios";
import Moment from "react-moment";
import DisplayPosts from "../Home/Post/Posts";

const ProfilePage = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
  height: 600px;
  width: 500px;
  min-width: 275px;
  background-color: lightblue;
  border: 2px solid black;
  border-radius: 25px;
`;

const ProfilePicture = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 15px;
  object-fit: cover;
`;

const Containers = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const PostsContainer = styled.div`
  @media (max-width: 650px) {
    width: 300px;
    border: none;
  }
`;

const BioContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ProfileUpdated() {
  const { userData } = useContext(UserData);
  const { profileImg, setProfileImg } = useContext(UserPicture);
  const [userPosts, setUserPosts] = useState([]);
  const [bio, setBio] = useState(userData.user_bio);
  const [updateForm, setUpdateForm] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      user_firstname: userData.user_firstname,
      user_lastname: userData.user_lastname,
      user_bio: bio,
    };

    async function uploadBio() {
      putBio(userData.user_id, data).then((res) => {
        console.log(res);
      });
    }
    let userDataUpdate = userData;
    if (userDataUpdate.user_bio !== bio) {
      userDataUpdate.user_bio = bio;
      localStorage.setItem("userData", JSON.stringify(userDataUpdate));
      uploadBio();
    }
    setUpdateForm(false);
  };

  useEffect(() => {
    if (userData) {
      async function fetchProfileImg() {
        getProfilImg(userData.user_id).then((res) => {
          setProfileImg(res.data[0]);
        });
      }
      async function fetchUserPosts() {
        getUserPosts(userData.user_id).then((res) => {
          setUserPosts(res.data);
        });
      }
      fetchProfileImg();
      fetchUserPosts();
    }
  }, [userData]);

  return (
    <ProfilePage>
      <ProfileContainer>
        <Containers>
          <h1>
            {userData.user_firstname} {userData.user_lastname}
          </h1>
          {profileImg ? (
            <ProfilePicture src={profileImg.image_url} alt="ProfilImage" />
          ) : (
            <>
              <ProfilePicture src={DefaultPicture} alt="ProfileImage" />
            </>
          )}
          <UploadImg />
        </Containers>
        <Containers>
          <BioContainer>
            <h3>Biographie:</h3>
            {updateForm === false ? (
              <>
                <TextField
                  id="filled-multiline-static"
                  multiline
                  rows={4}
                  sx={{ width: 280 }}
                  defaultValue={userData.user_bio}
                  onChange={(e) => setBio(e.target.value)}
                  onClick={() => setUpdateForm(!updateForm)}
                  variant="filled"
                  disabled
                />
                <Button
                  color="primary"
                  sx={{ width: 150 }}
                  onClick={() => setUpdateForm(!updateForm)}
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  Modifier
                </Button>
              </>
            ) : (
              <>
                <TextField
                  id="filled-multiline-static"
                  multiline
                  rows={4}
                  sx={{ width: 300 }}
                  defaultValue={userData.user_bio}
                  onChange={(e) => setBio(e.target.value)}
                  variant="filled"
                />
                <Button
                  color="success"
                  onClick={handleUpdate}
                  startIcon={<SendIcon />}
                  variant="contained"
                >
                  Valider
                </Button>
              </>
            )}
          </BioContainer>
          <p>
            Membre depuis le{" "}
            <Moment format="DD/MM/YYYY">{userData.date}</Moment>
          </p>
          <DesactivateAccount />
        </Containers>
      </ProfileContainer>
      <PostsContainer>
        <DisplayPosts postsDatas={userPosts} />
      </PostsContainer>
    </ProfilePage>
  );
}

export default ProfileUpdated;
