import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import SetAvatar from "./Avatar";
import Expand from "./Expand";
import PostImg from "./PostImg.js";
import ModifyPost from "./ModifyPost";
import Moment from "react-moment";
import "moment/locale/fr";
import { styled } from "@mui/material/styles";
import PostVideo from "./PostVideo";

const CardResponsive = styled(Card)(`
  width: 600px;
  margin: 16px;
  border: 2px solid lightblue;
  @media (max-width: 650px) {
    width: 280px;
    margin: 10px;
  }
`);

function DisplayPosts({ postsDatas, setPostsDatas, count }) {
  return postsDatas.slice(0, count).map((post) => {
    return (
      <CardResponsive key={post.user_id + post.date_creation}>
        <CardHeader
          avatar={<SetAvatar postUserId={post.user_id}></SetAvatar>}
          title={post.user_firstname + " " + post.user_lastname}
          subheader={
            <Moment fromNow locale="fr">
              {post.date_creation}
            </Moment>
          }
          sx={{ height: 50, p: 0 }}
        />
        <PostVideo message={post.message} />
        <PostImg postId={post.post_id} />
        <ModifyPost
          userId={post.user_id}
          postId={post.post_id}
          message={post.message}
          setPostsDatas={setPostsDatas}
        />
        <Expand postId={post.post_id} />
      </CardResponsive>
    );
  });
}

export default DisplayPosts;
