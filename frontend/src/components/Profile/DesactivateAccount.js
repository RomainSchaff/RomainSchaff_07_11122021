import { putDesactivate } from "../../services/axios";
import { useContext } from "react";
import { UserData } from "../Routes/AppContext";
import { Button } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function DesactivateAccount() {
  const { userData } = useContext(UserData);

  const submit = () => {
    confirmAlert({
      title: "Confirmation",
      message: "Etes-vous sûr de vouloir désactiver votre compte ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDesativate(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleDesativate = () => {
    async function Desactivate() {
      putDesactivate(userData.user_id).then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        window.location.reload();
      });
    }
    Desactivate();
  };

  return (
    <Button color="error" onClick={submit} variant="contained">
      Désactiver le compte
    </Button>
  );
}

export default DesactivateAccount;
