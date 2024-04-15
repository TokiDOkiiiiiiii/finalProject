// link to home page
document.getElementById("homeButton").addEventListener("click", function() {
    window.location.href = "/";
});

//sign in error
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var errorMessage = document.getElementById('error-message');

        if (!username && !password) {
            errorMessage.innerHTML = "Please provide both username and password.";
            document.getElementById('username').classList.add('error-border');
            document.getElementById('password').classList.add('error-border');
        } else if (!username) {
            errorMessage.innerHTML = "Please provide username.";
            document.getElementById('username').classList.add('error-border');
            document.getElementById('password').classList.remove('error-border');
        } else if (!password) {
            errorMessage.innerHTML = "Please provide password.";
            document.getElementById('username').classList.remove('error-border');
            document.getElementById('password').classList.add('error-border');
        } else {
            // Clear any existing error messages and borders
            errorMessage.innerHTML = "";
            document.getElementById('username').classList.remove('error-border');
            document.getElementById('password').classList.remove('error-border');
        }
    });
});