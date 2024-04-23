// link to game page
document.getElementById("gameButton").addEventListener("click", function() {
    window.location.href = "/game";
});

// link to login page
document.getElementById("loginButton").addEventListener("click", function() {
    window.location.href = "/login";
});

document.getElementById("about").addEventListener("click", function() {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D.com"; // Replace this with your YouTube URL
});

document.getElementById("backHome").addEventListener("click", function() {
    window.location.href = "/";
});

//Check if cookie exist
const cookies = document.cookie.split(';');
const cookieObj = {};

cookies.forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    cookieObj[name] = decodeURIComponent(value);
});
//console.log(cookieObj["sessionId"]);
if (cookieObj["sessionId"] === undefined){
    document.getElementById("gameButton").setAttribute("disabled", true);
}