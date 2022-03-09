import { useEffect, useState } from "react";
import { getUsersDatas } from "../../../services/axios";
import styled from "styled-components";
import ProfilePicture from "./ProfilePicture";
import Moment from "react-moment";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const UsersDiv = styled.div`
  width: 200px;
  position: absolute;
  right: 60px;
  background: lightblue;
  border: 2px solid #3399ff;
  border-radius: 15px;
  padding: 5px 5px 5px 20px;
  @media (max-width: 1250px) {
    width: 180px;
    right: 10px;
  }
  @media (max-width: 1100px) {
    display: none;
  }
`;

const StyledDiv = styled.div`
  margin: 8px 0px;
  display: flex;
`;

const StyledDate = styled.div`
  font-size: 12px;
  font-style: oblique;
`;

const StyledTitle = styled.h2`
  font-size: 18px;
`;

function DisplayUsers() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(3);

  useEffect(() => {
    getUsersDatas().then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <UsersDiv>
      <StyledTitle>Derniers membres:</StyledTitle>
      {users.slice(0, count).map((user) => {
        return (
          <StyledDiv key={user.user_firstname}>
            <ProfilePicture userId={user.user_id} />
            <div>
              {user.user_firstname} {user.user_lastname}
              <StyledDate>
                depuis le <Moment format="DD/MM/YYYY">{user.date}</Moment>
              </StyledDate>
            </div>
          </StyledDiv>
        );
      })}
      <IconButton
        onClick={() => {
          setCount(count + 3);
        }}
      >
        {" "}
        Plus
        <ExpandMoreIcon />
      </IconButton>
      {count > 3 ? (
        <IconButton
          onClick={() => {
            setCount(count - 3);
          }}
        >
          {" "}
          Moins
          <ExpandLessIcon />
        </IconButton>
      ) : null}
    </UsersDiv>
  );
}

export default DisplayUsers;
