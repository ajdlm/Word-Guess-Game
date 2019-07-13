document.addEventListener("DOMContentLoaded", function(event) {
    document.addEventListener("keyup", function(event) {
        var keyPressed = event.key.toLowerCase();
        console.log(keyPressed);
    });
});