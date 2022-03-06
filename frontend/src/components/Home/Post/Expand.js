import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import Comments from "../Comment/Comments";
import { useEffect, useState } from "react";
import Likes from "./Like";
import { getComments } from "../../../services/axios";
import CommentIcon from "@mui/icons-material/Comment";
import { Button } from "@mui/material";

const CardContentNoPadding = styled(CardContent)(`
  padding: 0px 5px;
  &:last-child {
    padding-bottom: 0;
  }
`);

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Expand({ postId }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      getComments(postId).then((res) => {
        setComments(res.data);
        setLoading(false);
      });
    }
    fetchComments();
  }, []);

  return (
    <>
      <CardActions disableSpacing sx={{ py: 0 }}>
        <Likes postId={postId} />
        <Button
          endIcon={<CommentIcon />}
          onClick={handleExpandClick}
          variant="outlined"
          size="small"
          sx={{ ml: 2 }}
        >
          {comments.length}
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContentNoPadding>
          <Comments
            postId={postId}
            comments={comments}
            setComments={setComments}
            loading={loading}
          />
        </CardContentNoPadding>
      </Collapse>
    </>
  );
}

export default Expand;
