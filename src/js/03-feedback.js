import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";
const formData = {};
const refs = {
    form: document.querySelector('.feedback-form'),
    inputEmail: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateForm();

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
}

function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
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