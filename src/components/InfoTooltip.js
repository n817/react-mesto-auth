import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg';

function InfoTooltip({isOpen, regStatusError, onClose}) {

  const InfoTooltipIcon = regStatusError 
    ? failIcon 
    : successIcon;

  const InfoTooltipTitle = regStatusError 
    ? 'Что-то пошло не так! Попробуйте ещё раз.' 
    : 'Вы успешно зарегистрировались!';
  
  return(
    <section className={`popup ${isOpen ? "popup_opened" : ""}`} aria-label="Сообщение о результате регистрации">
      <figure className="form form_type_info">
        <button type="button" className="popup__close-button" aria-label="Закрыть попап" onClick={onClose}></button>
        <img src={InfoTooltipIcon} alt={InfoTooltipTitle} className="popup__info-image"/>
        <figcaption className="form__title">{InfoTooltipTitle}</figcaption>
      </figure>
    </section>
  );
}

export default InfoTooltip;