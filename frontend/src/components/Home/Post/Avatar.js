import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { getProfilImg } from "../../../services/axios";

function SetAvatar({ postUserId }) {
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    async function fetchAvatar() {
      getProfilImg(postUserId).then((res) => {
        if (res.data[0]) {
          setAvatar(res.data[0].image_url);
        }
      });
    }
    fetchAvatar();
  }, []);

  return (
    <>
      <Avatar
        src={avatar}
        sx={{ height: 43, width: 43, borderRadius: 1, ml: 0.5 }}
        alt={"AvatarUser" + postUserId}
      ></Avatar>
    </>
  );
}

export default SetAvatar;
