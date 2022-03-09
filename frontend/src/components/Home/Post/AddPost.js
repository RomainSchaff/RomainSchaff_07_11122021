import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { UserData } from "../../Routes/AppContext";
import { setDateFormat } from "../../utils/date";
import styled from "styled-components";
import { addPost, getPosts } from "../../../services/axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SetAvatar from "./Avatar";
import Moment from "react-moment";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";

const FormPost = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  aligh-items: center;
  background-color: lightblue;
  border-radius: 5px;
  @media (max-width: 650px) {
    width: 280px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ButtonDiv = styled.div`
  height: 33px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: lightblue;
  border-radius: 5px;
`;

const StyledTextArea = styled.textarea`
  background-color: #bbbbbb;
  color: black;
  padding: 1em;
  border-radius: 5px;
  border: 2px solid #999999;
  outline: none;
  font-size: 17px;
  font-weight: bold;
  line-height: 1.4;
  width: 562px;
  height: 100px;
  transition: background-color 0.5s, border-color 0.5s;
  resize: none;
  :hover {
    cursor: pointer;
    background-color: #dddddd;
    border-color: black;
  }
  :focus {
    cursor: text;
    background-color: white;
    color: #333333;
    border-color: black;
  }
  @media (max-width: 650px) {
    width: 242px;
  }
`;

function AddPost({ setPostsDatas }) {
  const [post, setPost] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState("");
  const [video, setVideo] = useState("");
  const { userData } = useContext(UserData);

  const handlePost = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("user_id", userData.user_id);
    data.append("message", post);
    data.append("date_creation", setDateFormat());
    if (file) {
      data.append("post_image", file);
    }

    async function uploadPost() {
      addPost(data).then(() => {
        getPosts().then((res) => {
          setPostsDatas(res.data);
        });
      });
    }
    if (file || post || video) {
      uploadPost();
      setPost("");
    }
  };

  const handlePicture = (e) => {
    setFile(e.target.value[0]);
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setVideo("");
  };

  const cancelPost = () => {
    setPost("");
    setPostPicture("");
    setFile("");
    setVideo("");
  };

  useEffect(() => {
    const handleVideo = () => {
      let findLink = post.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://youtube") ||
          findLink[i].includes("https://www.youtube")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [post, video]);

  return (
    <FormPost>
      <label htmlFor="textareapost">
        <StyledTextArea
          id="textareapost"
          value={post}
          placeholder={`Quoi de neuf ${userData.user_firstname} ?`}
          onChange={(e) => setPost(e.target.value)}
        />

        {post || file || video ? (
          <Card>
            <CardHeader
              avatar={<SetAvatar postUserId={userData.user_id}></SetAvatar>}
              title={userData.user_firstname + " " + userData.user_lastname}
              subheader={<Moment fromNow></Moment>}
              sx={{ height: 50, p: 0 }}
            />
            {postPicture ? (
              <CardMedia
                component="img"
                image={postPicture}
                alt=""
                sx={{ maxHeight: 350 }}
              />
            ) : null}
            {video ? (
              <iframe
                src={video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video}
                width="100%"
                height="300px"
              ></iframe>
            ) : null}
            <CardContent sx={{ p: 0 }}>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontSize: 16, fontWeight: "bold", p: 1 }}
              >
                {post}
              </Typography>
            </CardContent>
          </Card>
        ) : null}
        <ButtonDiv>
          {post || postPicture || video ? (
            <Button
              onClick={cancelPost}
              startIcon={<SendIcon />}
              variant="contained"
              color="error"
              size="small"
            >
              Annuler
            </Button>
          ) : null}
          <label htmlFor="icon-button-file">
            <FileInput
              type="file"
              id="icon-button-file"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={handlePicture}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera fontSize="medium" alt="IconeCamera" />
            </IconButton>
          </label>
          <Button
            onClick={handlePost}
            startIcon={<SendIcon />}
            variant="contained"
            size="small"
          >
            Envoyer
          </Button>
        </ButtonDiv>
      </label>
    </FormPost>
  );
}

export default AddPost;
