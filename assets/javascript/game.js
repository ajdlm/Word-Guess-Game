document.addEventListener("DOMContentLoaded", function (event) {
    var guessedLetters = [];

    var wordGuess = [];

    var currentWordLetters = [];

    var possibleWords = ["bantha", "bowcaster", "carbonite", "droid", "ewok", "jedi",
        "landspeeder", "lightsaber", "nerfherder", "padawan", "sith", "wookie"];

    var alternateImages = {
        bantha: "bantha.jpeg", bowcaster: "bowcaster.png", carbonite: "carbonite.jpg", droid: "droids.jpg",
        ewok: "ewok.jpg", jedi: "jedi.jpg", landspeeder: "landspeeder.jpg", lightsaber: "lightsaber.jpg",
        nerfherder: "han-solo.jpg", padawan: "padawan.jpg", sith: "sith.png", wookie: "chewbacca.jpg"
    };

    var soundLibrary = {
        bantha: "bantha.mp3", bowcaster: "laser-blast.mp3", droid: "R2D2.mp3",
        jedi: "jedi", landspeeder: "landspeeder.mp3", lightsaber: "lightsaber.mov", nerfherder: "nerfherder.mp3",
        padawan: "always-two.wav", sith: "dark-side-power.mp3", wookie: "chewbacca.wav"
    };

    var correctGuess = false;

    var successCount = 0;

    var guessesRemaining = 12;

    var winCount = 0;

    var nextWord = "";

    function newWord() {
        guessedLetters = [];
        wordGuess = [];
        currentWordLetters = [];
        successCount = 0;
        guessesRemaining = 12;
        var wordChoice = Math.floor(Math.random() * possibleWords.length);
        nextWord = possibleWords[wordChoice];
        possibleWords.splice(wordChoice, 1);
        deleteChildren("currentWord");
        deleteChildren("alreadyGuessed");
        displayGuessesLeft();

        /* Use nextWord to populate the currentWordLetters array with its letters.
        Do this by running a for loop and, for each letter, pushing it into
        currentWordLetters and appending a "_" beneath "Current Word" in the HTML. */
        for (i = 0; i < nextWord.length; i++) {
            currentWordLetters.push(nextWord.charAt(i));
            var letterSpace = document.createElement("p");
            letterSpace.textContent = "_";
            currentWord.appendChild(letterSpace);
            wordGuess.push("_");
        }

        console.log(currentWordLetters);
    };

    function deleteChildren(x) {
        var deleteQueue = document.getElementById(x);
        deleteQueue.innerHTML = "";
    };

    function showCorrectGuess() {
        for (k = 0; k < wordGuess.length; k++) {
            var letterSpace = document.createElement("p");
            letterSpace.textContent = wordGuess[k];
            currentWord.appendChild(letterSpace);
        };
    };

    function displayGuessesLeft() {
        deleteChildren("guessesLeft");
        var letterSpace = document.createElement("p");
        letterSpace.textContent = guessesRemaining;
        guessesLeft.appendChild(letterSpace);
    };

    function guessExpended() {
        guessesRemaining--;
        displayGuessesLeft();
        if (guessesRemaining === 0) {
            setTimeout(function () {
                alert("You lose!");
                wordsLeftCheck();
            }, 1);
        };
    };

    function swapImages(x) {
        deleteChildren("imageColumn");
        var nextImage = document.createElement("img");
        nextImage.src = "assets/images/" + x;
        nextImage.style = "margin: auto; display: block; max-width: 80%;";
        var putImageHere = document.getElementById("imageColumn");
        putImageHere.appendChild(nextImage);
    };

    function replaceImage() {
        swapImages(alternateImages[nextWord]);
    };

    function victory() {
        winCount++;
        deleteChildren("recordOfWins");
        var letterSpace = document.createElement("p");
        letterSpace.textContent = winCount;
        recordOfWins.appendChild(letterSpace);
        replaceImage();
    };

    function finalImage(x, y) {
        deleteChildren("mainContainer");
        var endGif = document.createElement("img");
        endGif.src = "assets/images/" + x;
        endGif.style = "margin: 1.5rem auto 0; display: block;";
        var replaceWithGif = document.getElementById("mainContainer");
        replaceWithGif.appendChild(endGif);
        var endText = document.createElement("h2");
        endText.textContent = y;
        endText.style = "text-align: center; padding: 1.5rem 0;"
        replaceWithGif.appendChild(endText);
    };

    function wordsLeftCheck() {
        if (possibleWords.length === 0) {
            if (winCount === 0) {
                finalImage("luke-no.gif", "You didn't win at all. Better luck next time.");
                var endAudio = new Audio("assets/audio/luke-no.mov");
                var endAudio2 = new Audio("assets/audio/empire-ending-song.mp3");
                endAudio.play();
                endAudio.addEventListener("ended", function () {
                    endAudio2.loop = true;
                    endAudio2.play();
                });
            }

            else if ((winCount > 0) && (winCount < 7)) {
                finalImage("luke-no.gif", "You won " + winCount + " times. That's not so good.");
                var endAudio = new Audio("assets/audio/luke-no.mov");
                var endAudio2 = new Audio("assets/audio/empire-ending-song.mp3");
                endAudio.play();
                endAudio.addEventListener("ended", function () {
                    endAudio2.loop = true;
                    endAudio2.play();
                });
            }

            else if ((winCount > 6) && (winCount < 12)) {
                finalImage("medal-ceremony.gif", "You won " + winCount + " times. That's pretty good!");
                var endAudio = new Audio("assets/audio/throne-room-theme.mp3");
                endAudio.loop = true;
                endAudio.play();
            }

            else {
                finalImage("medal-ceremony.gif", "Wow! You got every single word! Very impressive!");
                var endAudio = new Audio("assets/audio/throne-room-theme.mp3");
                endAudio.loop = true;
                endAudio.play();
            }
        }

        else {
            newWord();
        };
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

        var badGuessCount = document.getElementById("alreadyGuessed").childElementCount;

        for (j = 0; j < currentWordLetters.length; j++) {
            if ((event.key.toLowerCase() === currentWordLetters[j]) &&
                (event.key.toLowerCase() !== wordGuess[j])) {
                wordGuess.splice(j, 1, event.key.toLowerCase());
                correctGuess = true;
                successCount++;
            }

            else if ((event.key.toLowerCase() === currentWordLetters[j]) &&
                (event.key.toLowerCase() === wordGuess[j])) {
                correctGuess = true;
            };
        };

        if ((correctGuess) && (successCount === currentWordLetters.length)) {
            deleteChildren("currentWord");
            showCorrectGuess();
            victory();
            setTimeout(function () {
                alert("You win!");
                wordsLeftCheck();
            }, 1);
        }

        else if (correctGuess) {
            guessedLetters.push(event.key.toLowerCase());
            deleteChildren("currentWord");
            showCorrectGuess();
        }

        else if ((!correctGuess) && ((event.keyCode > 64 && event.keyCode < 91) ||
            (event.keyCode > 96 && event.keyCode < 123)) && (badGuessCount === 0)) {
            var keyPressed = document.createElement("p");
            keyPressed.textContent = event.key.toLowerCase();
            alreadyGuessed.appendChild(keyPressed);
            guessedLetters.push(event.key);
            guessExpended();
        }

        else if ((!correctGuess) && ((event.keyCode > 64 && event.keyCode < 91) ||
            (event.keyCode > 96 && event.keyCode < 123)) && (badGuessCount > 0)) {
            for (i = 0; i < guessedLetters.length; i++) {
                if (guessedLetters[i] === event.key.toLowerCase()) {
                    break;
                }

                else if ((guessedLetters[i] !== event.key) && (i === (guessedLetters.length - 1))) {
                    var keyPressed = document.createElement("p");
                    keyPressed.textContent = ", " + event.key.toLowerCase();
                    alreadyGuessed.appendChild(keyPressed);
                    guessedLetters.push(event.key);
                    guessExpended();
                }
            }
        };

        console.log(wordGuess);
    });
});


/*

BUGS:

1.) When the already guessed letters in the HTML wrap onto the next line,
the first letter of the second line is preceded by ", ".

Solution: Look into having the 10th (or 6th?) letter guessed auto-wrap?

* * *

2.) So the issue I'm encountering here is that the script is pushing a correctly guessed
letter into the array irrespective of whether it's already there or not.

But is this truly an issue?

On the level of the HTML, there should be no visible difference, and given that this
is Hangman, shouldn't the number of guesses only go down on incorrect guesses? So
it's not like it's going to lower the number of guesses remaining to accidentally
press the same letter twice.

Look into possibly fixing this only once everything else is working.

*/