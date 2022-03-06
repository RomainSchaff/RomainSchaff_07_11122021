import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import { getPostImg } from "../../../services/axios";

function PostImg({ postId }) {
  const [postImg, setPostImg] = useState();

  useEffect(() => {
    async function fetchPostImg() {
      getPostImg(postId).then((res) => {
        if (res.data[0]) {
          setPostImg(res.data[0].image_url);
        }
      });
    }
    fetchPostImg();
  }, []);

  return (
    <>
      {postImg ? (
        <CardMedia component="img" image={postImg} alt="PostImage" />
      ) : null}
    </>
  );
}

export default PostImg;
