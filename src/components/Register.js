import { Link } from "react-router-dom";
import IdentityForm from "./IdentityForm";

function Register({ onRegister }) {
  return(
    <IdentityForm 
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onFormSubmit={onRegister}
    >
      <Link to="/sign-in" className="form__link">
        Уже зарегистрированы? Войти
      </Link>
    </IdentityForm>
  );
}

export default Register;