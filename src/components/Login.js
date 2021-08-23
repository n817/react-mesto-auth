import IdentityForm from "./IdentityForm";

function Login({onLogin}) {
  return(
    <IdentityForm 
      title="Вход"
      buttonText="Войти"
      onSubmit={onLogin}
    />
  );
}

export default Login;