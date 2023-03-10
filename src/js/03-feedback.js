import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";
const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    email: "",
    message: "",
};
const refs = {
    form: document.querySelector('.feedback-form'),
    inputEmail: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

populateForm();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(evt) {
    evt.preventDefault();
      if (evt.target.email.value.length && evt.target.message.value.length != 0) {
        evt.currentTarget.reset();
        localStorage.removeItem(STORAGE_KEY);
        console.log(formData); 
    } else {alert("Помилка! Будь ласка заповніть всі поля")}
}

function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
    const savedFormData = localStorage.getItem(STORAGE_KEY);
    const savedFormDataObject = JSON.parse(savedFormData);
    if (savedFormData) {
        refs.inputEmail.value = savedFormDataObject.email;
        refs.textarea.value = savedFormDataObject.message;
    }
}