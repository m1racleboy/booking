export const success = document.querySelector('.success');
export const error = document.querySelector('.error');

export const closeModal = (response) => {
  response.classList.add('hidden');
}

const isEscEvent = (e) => {
  return e.key === 'Escape' || e.key === 'Esc';
};

export const openModal = (response) => {
  response.classList.remove('hidden');

  document.addEventListener('keydown', (e) => {
    if (isEscEvent(e)) {
      response.classList.add('hidden');
    }
  });

  response.addEventListener('click', (e) => {
    if (e.target === response) {
      response.classList.add('hidden');
    }
  });
}
