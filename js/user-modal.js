// const closeErrorButton = error.querySelector('.error__button');
// const openSuccessModal = () => {
//   success.classList.remove('hidden');
// }

// const openErrorModal = () => {
//   error.classList.remove('hidden');
// }

// const closeSuccessModal = () => {
//   success.classList.add('hidden');
// };

// const closeErrorModal = () => {
//   error.classList.add('hidden');
// };

const openModal = (response) => {
  response.classList.remove('hidden');
}

const closeModal = (response) => {
  response.classList.add('hidden');
}

// document.addEventListener('keydown', function (e) {
//   let keyCode = e.keyCode;
//   if (keyCode === 27) {
//     modal.classList.remove('modal--show');
//   }
// });

// modal.addEventListener('click', function (e) {
//   if (e.target === modal) {
//     modal.classList.remove('modal--show');
//   }
// });

// closeErrorButton.addEventListener('click', () => {
//   closeErrorModal();
// });

export { openModal, closeModal };
