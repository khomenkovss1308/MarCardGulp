document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");

    const loginInputs = document.getElementById("signin-inputs");
    const registerInputs = document.getElementById("signup-inputs");

    const loginFooter = document.getElementById("signin-footer");
    const registerFooter = document.getElementById("signup-footer");

    const titleElement = document.querySelector(".login__title");
    const subtitleElement = document.querySelector(".login__subtitle");

    loginBtn.addEventListener("click", function () {
        loginInputs.style.display = "flex";
        registerInputs.style.display = "none";

        loginFooter.style.display = "flex";
        registerFooter.style.display = "none";

        loginBtn.classList.add("login__btn-change");
        registerBtn.classList.remove("login__btn-change");

        titleElement.textContent = "Ранее регистрировали аккаунт?";
        subtitleElement.textContent = "Если Вы еще не имеете аккаунта, то предлагаем пройти быструю регистрацию на нашем сервисе.";
    });

    registerBtn.addEventListener("click", function () {
        loginInputs.style.display = "none";
        registerInputs.style.display = "flex";

        loginFooter.style.display = "none";
        registerFooter.style.display = "flex";

        loginBtn.classList.remove("login__btn-change");
        registerBtn.classList.add("login__btn-change");

        titleElement.textContent = "Регистрация нового пользователя";
        subtitleElement.textContent = "После заполнения данных по указанному номеру телефона прийдет sms-сообщение с 4-х значных кодом.";
    });
});