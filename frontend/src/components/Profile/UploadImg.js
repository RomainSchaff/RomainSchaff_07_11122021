import { useContext, useState } from "react";
import { UserData, UserPicture } from "../Routes/AppContext";
import styled from "styled-components";
import { getProfilImg, putProfilImg } from "../../services/axios";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";

const UploadForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px;
  background-color: lightblue;
`;

const FileInput = styled.input`
  display: none;
`;

const Input = styled.input`
  cursor: pointer;
  padding: 7px;
  color: white;
  background-color: #008000;
  border: none;
  border-radius: 10px;
  :hover {
    background-color: #006600;
  }
`;

function UploadImg() {
  const { userData } = useContext(UserData);
  const [file, setFile] = useState();
  const { setProfileImg } = useContext(UserPicture);

  const handleImg = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user_firstname", userData.user_firstname);
    data.append("user_lastname", userData.user_lastname);
    data.append("user_bio", userData.user_bio);
    data.append("profil_image", file);

    async function uploadImg() {
      putProfilImg(userData.user_id, data).then((res) => {
        console.log(res);
        getProfilImg(userData.user_id).then((res) => {
          console.log(res);
          setProfileImg(res.data[0]);
        });
      });
    }
    uploadImg();
  };

  return (
    <UploadForm action="" onSubmit={handleImg}>
      <label htmlFor="icon-button-file">
        <FileInput
          type="file"
          id="icon-button-file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          size="large"
        >
          <PhotoCamera fontSize="large" />
        </IconButton>
      </label>
      <Input type="submit" value="Changer le profil" />
    </UploadForm>
  );
}

export default UploadImg;
