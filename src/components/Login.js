import IdentityForm from "./IdentityForm";

function Login({ onLogin }) {
  return(
    <IdentityForm 
      title="Вход"
      buttonText="Войти"
      onFormSubmit={onLogin}
    />
  );
}

export default Login;