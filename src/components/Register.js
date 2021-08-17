import IdentityForm from "./IdentityForm";

function Register() {
  const pStyle = {color: 'white', textAlign: 'center'}
  return(
    <IdentityForm 
      title="Регистрация"
      buttonText="Зарегистрироваться"
    />
  );
}

export default Register;