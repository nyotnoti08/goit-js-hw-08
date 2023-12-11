// Import lodash functions
import throttle from 'lodash.throttle';

const saveFormStateThrottled = throttle(() => {
  const emailInput = document.querySelector('input[name="email"]');
  const messageTextarea = document.querySelector('textarea[name="message"]');
  
  // Save form state to local storage
  localStorage.setItem('feedback-form-state', JSON.stringify({
    email: emailInput.value,
    message: messageTextarea.value,
  }));
}, 500); // Throttle to once every 500 milliseconds

function loadFormState() {
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const { email, message } = JSON.parse(storedState);

    document.querySelector('input[name="email"]').value = email;
    document.querySelector('textarea[name="message"]').value = message;
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const formData = {
    email: document.querySelector('input[name="email"]').value,
    message: document.querySelector('textarea[name="message"]').value,
  };
  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  document.querySelector('input[name="email"]').value = '';
  document.querySelector('textarea[name="message"]').value = '';
}

const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('input', saveFormStateThrottled);
feedbackForm.addEventListener('submit', handleSubmit);

loadFormState();
