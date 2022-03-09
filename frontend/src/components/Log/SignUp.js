import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import SignIn from "./SignIn";
import { setDateFormat } from "../utils/date";

const FormSignUp = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;

function SignUp() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [user_firstname, setUser_firstname] = useState("");
  const [user_lastname, setUser_lastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [formCheck, setFormCheck] = useState(false);
  const inputs = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="password"], input[type="checkbox"]'
  );

  const handleSignUp = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const firstnameError = document.querySelector(".firstname.error");
    const lastnameError = document.querySelector(".lastname.error");
    const emailError = document.querySelector(".email.error");
    const passwordConfirmError = document.querySelector(
      ".passwordConfirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";
    emailError.innerHTML = "";
    firstnameError.innerHTML = "";
    lastnameError.innerHTML = "";

    function firstNameChecker(value) {
      if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        firstnameError.textContent =
          "Le prénom doit faire entre 3 et 20 caractères";
      } else if (!value.match(/^[A-Z][A-Za-zéèêëï-]+$/)) {
        firstnameError.textContent =
          "Le prénom ne doit pas contenir de caractères spéciaux";
      }
    }
    function lastNameChecker(value) {
      if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        lastnameError.textContent =
          "Le nom doit faire entre 3 et 20 caractères";
      } else if (!value.match(/^[A-Z][A-Za-zéèêëï-]+$/)) {
        lastnameError.textContent =
          "Le nom ne doit pas contenir de caractères spéciaux";
      }
    }
    function emailChecker(value) {
      if (!value.match(/[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        emailError.textContent = "L'email n'est pas valide";
      }
    }
    function passwordChecker() {
      if (password !== controlPassword) {
        passwordConfirmError.textContent =
          "Les mots de passe ne correspondent pas";
      }
    }
    function termsChecker() {
      if (!terms.checked) {
        termsError.textContent = "Veuillez accepter les conditions générales";
      }
    }
    function formChecker() {
      inputs.forEach((input) => {
        switch (input.id) {
          case "user_lastName":
            lastNameChecker(input.value);
            break;
          case "user_firstName":
            firstNameChecker(input.value);
            break;
          case "user_email":
            emailChecker(input.value);
            break;
          case "passwordConfirm":
            passwordChecker();
            break;
          case "terms":
            termsChecker();
            break;
          default:
            console.log("default");
        }
      });
      if (
        passwordConfirmError.textContent === "" &&
        termsError.textContent === "" &&
        emailError.textContent === "" &&
        firstnameError.textContent === "" &&
        lastnameError.textContent === ""
      ) {
        setFormCheck(true);
      }
    }
    formChecker();

    if (formCheck) {
      await axios({
        method: "post",
        url: "http://localhost:4000/api/auth/signup",
        headers: { "Content-Type": "application/json" },
        data: {
          user_lastname,
          user_firstname,
          user_email: email,
          user_password: password,
          user_bio: "",
          date: setDateFormat().split(" ")[0],
        },
      })
        .then((res) => {
          if (res.data.message.includes("Email")) {
            console.log(res);
            emailError.innerHTML = "Email déjà utilisé";
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignIn />
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <FormSignUp action="" onSubmit={handleSignUp} id="sign-up-form">
          <label htmlFor="user_firstName">Prénom</label>
          <input
            type="text"
            name="user_firstName"
            id="user_firstName"
            onChange={(e) => setUser_firstname(e.target.value)}
            value={user_firstname}
          />
          <ErrorMessage className="firstname error"></ErrorMessage>
          <br />
          <label htmlFor="user_lastName">Nom de famille</label>
          <input
            type="text"
            name="user_lastName"
            id="user_lastName"
            onChange={(e) => setUser_lastname(e.target.value)}
            value={user_lastname}
          />
          <ErrorMessage className="lastname error"></ErrorMessage>
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <ErrorMessage className="email error"></ErrorMessage>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <label htmlFor="passwordConfirm">Confirmation du mot de passe</label>
          <input
            type="password"
            name="password"
            id="passwordConfirm"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <ErrorMessage className="passwordConfirm error"></ErrorMessage>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <br />
          <ErrorMessage className="terms error"></ErrorMessage>
          <br />
          <input type="submit" value="Valider inscription" />
        </FormSignUp>
      )}
    </>
  );
}

export default SignUp;
