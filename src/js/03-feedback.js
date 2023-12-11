// Import lodash functions
import throttle from 'lodash.throttle';

// Function to save form state to local storage with throttling
const saveFormStateThrottled = throttle(() => {
  const emailInput = document.querySelector('input[name="email"]');
  const messageTextarea = document.querySelector('textarea[name="message"]');
  
  // Save form state to local storage
  localStorage.setItem('feedback-form-state', JSON.stringify({
    email: emailInput.value,
    message: messageTextarea.value,
  }));
}, 500); // Throttle to once every 500 milliseconds

// Function to load form state from local storage
function loadFormState() {
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const { email, message } = JSON.parse(storedState);

    // Fill in form fields with stored values
    document.querySelector('input[name="email"]').value = email;
    document.querySelector('textarea[name="message"]').value = message;
  }
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Display the object with email and message fields in the console
  const formData = {
    email: document.querySelector('input[name="email"]').value,
    message: document.querySelector('textarea[name="message"]').value,
  };
  console.log(formData);

  // Clear local storage and form fields
  localStorage.removeItem('feedback-form-state');
  document.querySelector('input[name="email"]').value = '';
  document.querySelector('textarea[name="message"]').value = '';
}

// Get the form element
const feedbackForm = document.querySelector('.feedback-form');

// Add input event listener to track changes and save to local storage (throttled)
feedbackForm.addEventListener('input', saveFormStateThrottled);

// Add submit event listener to handle form submission
feedbackForm.addEventListener('submit', handleSubmit);

// Load form state when the page loads
loadFormState();
