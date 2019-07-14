document.addEventListener("DOMContentLoaded", function (event) {
    var guessedLetters = [];

    var currentWordLetters = [];

    var possibleWords = ["bantha", "bowcaster", "carbonite", "droid", "ewok", "jedi", "landspeeder", "lightsaber", "nerfherder", "padawan", "sith", "wookie"];

    function newWord() {
        var wordChoice = Math.floor(Math.random() * possibleWords.length);
        var nextWord = possibleWords[wordChoice];
        possibleWords.splice(wordChoice, 1)

        /*Use nextWord to populate the currentWordLetters array with its letters.

        Do this by running a for loop and, for each letter, pushing it into
        currentWordLetters and appending a _ beneath "Current Word" in the HTML.*/

        for (i = 0; i < nextWord.length; i++) {
            currentWordLetters.push(nextWord.charAt(i));
            var letterSpace = document.createElement("p");
            letterSpace.textContent = "_";
            currentWord.appendChild(letterSpace);
        }
        
        console.log(currentWordLetters);
    };

    newWord();

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