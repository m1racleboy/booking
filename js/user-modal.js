const success = document.querySelector('.success');
const error = document.querySelector('.error');
const closeErrorButton = error.querySelector('.error__button');

const closeModal = (response) => {
  response.classList.add('hidden');
}

const openModal = (response) => {
  response.classList.remove('hidden');
  document.addEventListener('keydown', function (e) {
    const keyCode = e.keyCode;
    if (keyCode === 27) {
      response.classList.add('hidden');
    }
  });

  response.addEventListener('click', function (e) {
    if (e.target === response) {
      response.classList.add('hidden');
    }
  });
}

closeErrorButton.addEventListener('click', () => {
  closeModal(error);
});

export { openModal, closeModal, success, error };
