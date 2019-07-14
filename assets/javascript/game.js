document.addEventListener("DOMContentLoaded", function (event) {
    var guessedLetters = [];

    var wordGuess = [];

    var currentWordLetters = [];

    var possibleWords = ["bantha", "bowcaster", "carbonite", "droid", "ewok", "jedi",
        "landspeeder", "lightsaber", "nerfherder", "padawan", "sith", "wookie"];

    var correctGuess = false;

    var successCount = 0;

    function newWord() {
        var wordChoice = Math.floor(Math.random() * possibleWords.length);
        var nextWord = possibleWords[wordChoice];
        possibleWords.splice(wordChoice, 1);
        deleteChildren("currentWord");

        /* Use nextWord to populate the currentWordLetters array with its letters.

        Do this by running a for loop and, for each letter, pushing it into
        currentWordLetters and appending a "_" beneath "Current Word" in the HTML. */

        for (i = 0; i < nextWord.length; i++) {
            currentWordLetters.push(nextWord.charAt(i));
            var letterSpace = document.createElement("p");
            letterSpace.textContent = "_";
            currentWord.appendChild(letterSpace);
            wordGuess.push("_");

            /* Need to turn the whole array wordGuess into
            self-replacing HTML here instead. */
        }

        console.log(currentWordLetters);
    };

    function deleteChildren(x) {
        var deleteQueue = document.getElementById(x);
        deleteQueue.innerHTML = " ";
    };

    newWord();

    /* Below, need to use a for loop not only to check against currentWordLetters for
    correctly guessed letters but also to record the position of each instance of the
    letter within the array (should be easy -- will be the index in each instance)
    and then to take those positions and use them to select underscores to replace
    with the appropriate letter (the same in all cases for each time a keyup event
    happens) within the array. */

    document.addEventListener("keyup", function (event) {
        correctGuess = false;

        for (j = 0; j < currentWordLetters.length; j++) {
            if ((event.key.toLowerCase() === currentWordLetters[j]) &&
            (event.key.toLowerCase() !== wordGuess[j])) {
                wordGuess.splice(j, 1, event.key.toLowerCase());
                correctGuess = true;
                successCount++;

                /* successCount is now incrementing correctly, BUT the win
                conditions are being treated as met BEFORE the final
                underscore is replaced with the appropriate letter */

                /* If statement comparing wordGuess to currentWordLetters here
                then doing some kind of victory thing before calling newWord()
                again? */

                /* OR OR OR have it increment a variable by 1 each time this
                for loop matches a correct guess with one of the letters. Then,
                when variable === currentWordLetters.length, win condition met. */

                console.log(successCount);
            };
        };

        if ((correctGuess) && (successCount === currentWordLetters.length)) {
            alert("You win!");
            newWord();
        }

        else if (correctGuess) {
            guessedLetters.push(event.key.toLowerCase());
            deleteChildren("currentWord");
            //NO HERE ACTUALLY - the other thing is fine
            for (k = 0; k < wordGuess.length; k++) {
                var letterSpace = document.createElement("p");
                letterSpace.textContent = wordGuess[k];
                currentWord.appendChild(letterSpace);
            };
        }

        else if ((!correctGuess) && ((event.keyCode > 64 && event.keyCode < 91) ||
            (event.keyCode > 96 && event.keyCode < 123)) && (guessedLetters.length < 1)) {
            var keyPressed = document.createElement("p");
            keyPressed.textContent = " " + event.key.toLowerCase();
            alreadyGuessed.appendChild(keyPressed);
        }

        else if ((!correctGuess) && ((event.keyCode > 64 && event.keyCode < 91) ||
            (event.keyCode > 96 && event.keyCode < 123)) && (guessedLetters.length > 0)) {
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
        };

        console.log(wordGuess);
    });
});


/* So the issue I'm encountering here is that the script is pushing a correctly guessed
letter into the array irrespective of whether it's already there or not.

But is this truly an issue?

On the level of the HTML, there should be no visible difference, and given that this
is Hangman, shouldn't the number of guesses only go down on incorrect guesses? So
it's not like it's going to lower the number of guesses remaining to accidentally
press the same letter twice.

Look into possibly fixing this only once everything else is working. */