import { useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    onUpdateAvatar(
      {
        avatar: avatarInputRef.current.value
      },
      setIsLoading
    );
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      buttonLoadingName="Сохранение..."
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_content_option"
        name="avatarUrlInput"
        placeholder="Ссылка на аватар"
        required
        type="url"
        ref={avatarInputRef}
      />
      <span className="popup__input-error avatarUrlInput-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
