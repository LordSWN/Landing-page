// Function to send OTP
function sendOtp() {
    var phoneNumber = document.getElementById('phone-number').value;

    // Validate the phone number before sending the OTP
    if (!validatePhoneNumber(phoneNumber)) {
        document.getElementById('error-message').style.display = 'block';
        return;
    }

    // Send a POST request to the server
    fetch('/submit-phone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server error');
        }
        return response.json();
    })
    .then(data => {
        // Redirect to OTP page after successful request
        window.location.href = '/halaman-otp?phone=' + encodeURIComponent(phoneNumber);
    })
    .catch(error => {
        // Show error message if the request fails
        document.getElementById('error-message').style.display = 'block';
        console.error('Error:', error);
    });
}

// Function to validate phone number
function validatePhoneNumber(phoneNumber) {
    // Regex to validate phone numbers starting with 08 and 10 to 13 digits long
    var regex = /^08\d{8,11}$/;
    return regex.test(phoneNumber);
}
