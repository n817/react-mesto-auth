import IdentityForm from "./IdentityForm";

function Register(onRegister) {
  return(
    <IdentityForm 
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={onRegister}
    />
  );
}

export default Register;