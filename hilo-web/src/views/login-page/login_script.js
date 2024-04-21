// link to home page
// document.getElementById("homeButton").addEventListener("click", function() {
//     window.location.href = "/";
// });

//log in error
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error === "401") {
        console.log("Invalid username or password.");
        document.getElementById('error-message').innerHTML = "Invalid username or password.";
    }

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var errorMessage = document.getElementById('error-message');

        if (!username && !password) {
            event.preventDefault();
            errorMessage.innerHTML = "Please provide both username and password.";
            document.getElementById('username').classList.add('error-border');
            document.getElementById('password').classList.add('error-border');
        } else if (!username) {
            event.preventDefault();
            errorMessage.innerHTML = "Please provide username.";
            document.getElementById('username').classList.add('error-border');
            document.getElementById('password').classList.remove('error-border');
        } else if (!password) {
            event.preventDefault();
            errorMessage.innerHTML = "Please provide password.";
            document.getElementById('username').classList.remove('error-border');
            document.getElementById('password').classList.add('error-border');
        }
    });
});