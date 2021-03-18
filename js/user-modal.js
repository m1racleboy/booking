const success = document.querySelector('.success');
const error = document.querySelector('.error');

const closeModal = (response) => {
  response.classList.add('hidden');
}

const openModal = (response) => {
  response.classList.remove('hidden');
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Esc' || e.code === 'Escape') {
      response.classList.add('hidden');
    }
  });

  response.addEventListener('click', (e) => {
    if (e.target === response) {
      response.classList.add('hidden');
    }
  });
}

export { openModal, closeModal, success, error };
