import Typography from "@mui/material/Typography";
import styled from "styled-components";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";
import { Triangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ProfilePicture from "../Users/ProfilePicture";

const CommentContainer = styled.div`
  margin: 5px 0px;
  padding: 0px 5px;
  background-color: lightBlue;
  border: 1px solid black;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
`;

function Comments({ postId, comments, setComments, loading }) {
  return (
    <>
      <AddComment
        postId={postId}
        comments={comments}
        setComments={setComments}
      />
      {loading === false ? (
        comments.map((comment) => {
          return (
            <CommentContainer key={comment.date_creation + comment.comment_id}>
              <HeaderDiv>
                <ProfilePicture userId={comment.user_id} />
                <Typography
                  key={comment.date_creation}
                  sx={{ fontWeight: "bold" }}
                >
                  {comment.user_firstname} {comment.user_lastname}
                </Typography>
              </HeaderDiv>
              <Typography
                key={comment.comment_id}
                sx={{ py: 0.5, fontSize: 15 }}
              >
                {comment.comment}
              </Typography>
              <DeleteComment commentData={comment} setComments={setComments} />
            </CommentContainer>
          );
        })
      ) : (
        <Triangle height="100" width="100" color="blue" ariaLabel="loading" />
      )}
    </>
  );
}

export default Comments;
