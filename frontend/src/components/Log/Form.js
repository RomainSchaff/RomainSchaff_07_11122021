import Log from "./Log";
import styled from "styled-components";

const LogContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 35px;
  @media (max-width: 600px) {
    width: 280px;
    margin: 10px;
  }
`;

function Form() {
  return (
    <LogContainer>
      <Log signIn={true} signUp={false} />
    </LogContainer>
  );
}

export default Form;
