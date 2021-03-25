export const success = document.querySelector('.success');
export const error = document.querySelector('.error');
export const errorGetData = document.querySelector('.error-data');
export const closeModal = (response) => {
  response.classList.add('hidden');
}

const isEscEvent = (e) => {
  return e.key === 'Escape' || e.key === 'Esc';
};

const createOnModalEscKeydown = (cb) => {
  return (e) => {
    if (isEscEvent(e)) {
      e.preventDefault();
      cb();
    }
  }
};

const creteOnModalCloseClick = (cb) => {
  return (e) => {
    e.preventDefault();
    cb();
  }
};

export const openModal = (response) => {
  const clickCloseModalHandler = creteOnModalCloseClick(() => {
    document.removeEventListener('keydown', keydownCloseModalHandler, true);
    response.removeEventListener('click', clickCloseModalHandler, true);
    closeModal(response);
  });

  const keydownCloseModalHandler = createOnModalEscKeydown(() => {
    document.removeEventListener('keydown', keydownCloseModalHandler, true);
    response.removeEventListener('click', clickCloseModalHandler, true);
    closeModal(response);
  });

  response.classList.remove('hidden');

  document.addEventListener('keydown', keydownCloseModalHandler, true);
  response.addEventListener('click', clickCloseModalHandler, true);
}
