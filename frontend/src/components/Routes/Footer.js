import styled from "styled-components";
import Button from "@mui/material/Button";

const StyledFooter = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background: #1a2dba;
  border-top: 2px solid black;
`;

function Footer() {
  return (
    <StyledFooter>
      <Button variant="contained" sx={{ m: 1 }}>
        Conditions d'utilisation
      </Button>
      <Button variant="contained" sx={{ m: 1 }}>
        Nous contacter
      </Button>
      <Button variant="contained" sx={{ m: 1 }}>
        Nos sponsors
      </Button>
    </StyledFooter>
  );
}

export default Footer;
