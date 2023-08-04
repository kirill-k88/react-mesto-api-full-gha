import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    onAddPlace(values, setValues, setIsLoading);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonName="Создать"
      buttonLoadingName="Создание..."
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_content_heading"
        name="name"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={values.name || ''}
        onChange={handleChange}
      />
      <span className="popup__input-error cardNameInput-error"></span>
      <input
        className="popup__input popup__input_content_option"
        name="link"
        placeholder="Ссылка на картинку"
        required
        type="url"
        value={values.link || ''}
        onChange={handleChange}
      />
      <span className="popup__input-error cardUrlInput-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
