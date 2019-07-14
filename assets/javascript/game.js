document.addEventListener("DOMContentLoaded", function (event) {
    document.addEventListener("keyup", function (event) {
        if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123)) {
            var keyPressed = document.createElement("p");
            keyPressed.textContent = event.key.toLowerCase();
            //keyPressed.innerHTML = "<p style='text-align: left !important'; 'display: inline';>" + event.key.toLowerCase() + "</p>";
            alreadyGuessed.appendChild(keyPressed);
            console.log(keyPressed);
        };
    });
});