document.addEventListener("DOMContentLoaded", function () {
    const passwordField = document.getElementById("password");
    const passwordToggle = document.getElementById("password-toggle");
    const passwordValidationError = document.getElementById("password-validation-error");

    passwordToggle.addEventListener("click", function () {
        togglePasswordVisibility();
    });

    function togglePasswordVisibility() {
        if (passwordField.type === "password") {
            passwordField.type = "text";
            passwordToggle.src = "unhide.png";
        } else {
            passwordField.type = "password";
            passwordToggle.src = "hide.png";
        }
    }

    const loginForm = document.querySelector("form");
    loginForm.addEventListener("submit", function (e) {
        const passwordValue = passwordField.value;
        if (!isPasswordValid(passwordValue)) {
            e.preventDefault(); // Prevent form submission if the password is invalid
            passwordValidationError.textContent = "Password must have upto 8-16 upercase,lowercase,special caharecter,number";
            passwordField.classList.add("invalid-password");
        } else {
            passwordValidationError.textContent = "";
            passwordField.classList.remove("invalid-password");
        }
    });

    function isPasswordValid(password) {
        // Password complexity criteria
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
        const digitRegex = /\d/;

        const isLengthValid = password.length >= 8 && password.length <= 16;
        const hasLowercase = lowercaseRegex.test(password);
        const hasUppercase = uppercaseRegex.test(password);
        const hasSpecialCharacter = specialCharacterRegex.test(password);
        const hasDigit = digitRegex.test(password);

        return isLengthValid && hasLowercase && hasUppercase && hasSpecialCharacter && hasDigit;
    }
});
