document.addEventListener("DOMContentLoaded", function (event) {
    var guessedLetters = [];

    var currentWordLetters = [];

    document.addEventListener("keyup", function (event) {
        if (((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123)) && (guessedLetters.length < 1)) {
            var keyPressed = document.createElement("p");
            keyPressed.textContent = " " + event.key.toLowerCase();
            alreadyGuessed.appendChild(keyPressed);
            guessedLetters.push(event.key.toLowerCase());
        }
        else if (((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123)) && (guessedLetters.length > 0)) {
            for (i = 0; i < guessedLetters.length; i++) {
                if (guessedLetters[i] === event.key.toLowerCase()) {
                    break;
                }
                else if ((guessedLetters[i] !== event.key) && (i === (guessedLetters.length - 1))) {
                    var keyPressed = document.createElement("p");
                    keyPressed.textContent = ", " + event.key.toLowerCase();
                    alreadyGuessed.appendChild(keyPressed);
                    guessedLetters.push(event.key);
                }
            }
        }
    })
});