function IdentityForm({ title, buttonText, onSubmit }) {
  return(
    <section className="page__section">
    <form className="form form_type_identity">
      <h2 className="form__title">{title}</h2>
      <label className="form__field">
        <input
          type="email"
          //value={}
          //onChange={}
          className="form__input form__input_dark-theme"
          name="email"
          placeholder="Email"
          minLength="5"
          maxLength="30"
          autoComplete="off"
          required
        />
      </label>
      <label className="form__field">
        <input
          type="password"
          //value={}
          //onChange={}
          className="form__input form__input_dark-theme"
          name="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="30"
          required
        />
      </label>
      <button type="submit" className="form__submit-button form__submit-button_dark-theme">{buttonText}</button>
    </form>
    </section>
  );
}

export default IdentityForm;