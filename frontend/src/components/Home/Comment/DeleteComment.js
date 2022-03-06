import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { UserData } from "../../Routes/AppContext";
import { deleteOneComment, getComments } from "../../../services/axios";
import Moment from "react-moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const TypographyFlex = styled(Typography)(`
  display: flex;
  justify-content: space-between;
  align-items: center;
`);

const CancelIconStyled = styled(CancelIcon)(`
  &:hover{
    color: red;
    transform: scale(1.15);
    transition: transform 0.3s, color 0.3s;
  }
`);

function DeleteComment({ commentData, setComments }) {
  const { userData } = useContext(UserData);

  const submit = (e) => {
    confirmAlert({
      title: "Confirmation",
      message: "Etes-vous sûr de vouloir supprimer ce commentaire ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteComment(e),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleDeleteComment = (e) => {
    e.preventDefault();

    async function deleteComment() {
      deleteOneComment(commentData.comment_id).then(() => {
        getComments(commentData.post_id).then((res) => {
          setComments(res.data);
        });
      });
    }
    deleteComment();
  };

  return (
    <TypographyFlex
      key={commentData.comment_id + commentData.date_creation}
      sx={{ fontStyle: "italic", fontSize: 12, textAlign: "right" }}
    >
      {<Moment fromNow>{commentData.date_creation}</Moment>}
      {commentData.user_id === userData.user_id || userData.user_id === 1 ? (
        <CancelIconStyled onClick={submit} />
      ) : null}
    </TypographyFlex>
  );
}

export default DeleteComment;
