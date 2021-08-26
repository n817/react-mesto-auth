import IdentityForm from "./IdentityForm";

function Register({ onRegister }) {
  return(
    <IdentityForm 
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onFormSubmit={onRegister}
    />
  );
}

export default Register;