import { useContext, useEffect, useState } from "react";
import { UserData } from "../components/Routes/AppContext";
import DisplayPosts from "../components/Home/Post/Posts";
import styled from "styled-components";
import Form from "../components/Log/Form";
import AddPost from "../components/Home/Post/AddPost";
import { Triangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { getPosts } from "../services/axios";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button } from "@mui/material";
import DisplayUsers from "../components/Home/Users/users";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import IconButton from "@mui/material/IconButton";

const HomeDiv = styled.div`
  padding: 20px 0px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eeeeee;
  min-height: 75vh;
  border-left: 1px solid black;
  border-right: 1px solid black;
  @media (max-width: 650px) {
    width: 300px;
    border: none;
  }
`;

function Home() {
  const { userData } = useContext(UserData);
  const [postsDatas, setPostsDatas] = useState([]);
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(3);

  const handleloadMore = (e) => {
    e.preventDefault();
    setCount(count + 3);
  };

  useEffect(() => {
    if (loadPost && userData) {
      getPosts().then((res) => {
        setPostsDatas(res.data);
        setLoadPost(false);
      });
    }
  }, [loadPost, userData]);

  return (
    <HomeDiv>
      {userData ? (
        <>
          {loadPost === false ? (
            <>
              <DisplayUsers />
              <AddPost setPostsDatas={setPostsDatas} />
              <br />
              <h3>Les dernières publications:</h3>
              <DisplayPosts
                postsDatas={postsDatas}
                setPostsDatas={setPostsDatas}
                count={count}
              />
              <Button
                variant="contained"
                endIcon={<ArrowDropDownIcon />}
                onClick={handleloadMore}
                size="small"
              >
                Afficher plus
              </Button>
              <IconButton
                color="success"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                sx={{
                  position: "fixed",
                  bottom: "80px",
                  right: "50px",
                  color: "#1a2dba",
                  fontSize: 14,
                }}
              >
                Revenir en haut
                <ArrowCircleUpIcon fontSize="large" sx={{ opacity: 0.8 }} />
              </IconButton>
            </>
          ) : (
            <Triangle
              height="100"
              width="100"
              color="blue"
              ariaLabel="loading"
            />
          )}
        </>
      ) : (
        <Form />
      )}
    </HomeDiv>
  );
}

export default Home;
