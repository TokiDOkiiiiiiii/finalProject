// link to home page
document.getElementById("homeButton").addEventListener("click", function() {
    window.location.href = "/";
});

//log in error
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if (!username || !password) {
            event.preventDefault();
            document.getElementById('error-message').innerHTML = "Please provide both username and password.";
            document.getElementById('username').classList.add('error-border');
            document.getElementById('password').classList.add('error-border');
        }
    });
});