import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { setDateFormat } from "../../utils/date";
import { UserData } from "../../Routes/AppContext";
import { addComment, getComments } from "../../../services/axios";

function AddComment({ postId, comments, setComments }) {
  const { userData } = useContext(UserData);
  const [comment, setComment] = useState("");

  const handleComment = (e) => {
    e.preventDefault();

    const data = {
      user_id: userData.user_id,
      post_id: postId,
      comment: comment,
      date_creation: setDateFormat(),
    };

    async function uploadComment() {
      addComment(postId, data).then(() => {
        getComments(postId).then((res) => {
          setComments(res.data);
        });
      });
    }
    uploadComment();
    setComment("");
  };

  return (
    <form>
      <TextField
        id="filled-multiline-static"
        multiline
        rows={2}
        fullWidth
        value={comment}
        placeholder={`Donnez votre avis ${userData.user_firstname}`}
        onChange={(e) => setComment(e.target.value)}
        variant="filled"
      />
      <Button
        onClick={handleComment}
        startIcon={<SendIcon />}
        variant="outlined"
        size="small"
      >
        Commenter
      </Button>
    </form>
  );
}

export default AddComment;
