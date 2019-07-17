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
        bantha: "bantha.mp3", bowcaster: "laser-blast.mp3", carbonite: "carbonite-freezer.mp3", droid: "R2D2.mp3",
        ewok: "ewok.mp3", jedi: "jedi.mp3", landspeeder: "landspeeder.mp3", lightsaber: "lightsaber.mov",
        nerfherder: "nerfherder.mp3", padawan: "always-two.wav", sith: "dark-side-power.mp3", wookie: "chewbacca.wav"
    };

    var keysPaused = false;

    var starWarsTheme = new Audio("assets/audio/star-wars-theme.mp3");

    var audioPlaying = false;

    var correctGuess = false;

    var successCount = 0;

    var guessesRemaining = 12;

    var winCount = 0;

    var nextWord = "";

    var previousGuess = "";

    var gameNotEnding = true;

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
        Do this by running a for loop and pushing each letter into currentWordLetters.
        Every time this is done, append a "_" beneath "Current Word" in the HTML. */
        for (i = 0; i < nextWord.length; i++) {
            currentWordLetters.push(nextWord.charAt(i));
            var letterSpace = document.createElement("p");
            letterSpace.textContent = "_";
            currentWord.appendChild(letterSpace);
            wordGuess.push("_");
        }
    };

    function deleteChildren(x) {
        var deleteQueue = document.getElementById(x);
        deleteQueue.innerHTML = "";
    };

    function playTheme() {
        if (!audioPlaying) {
            starWarsTheme.play();
            starWarsTheme.volume = 0.4;
        };
        audioPlaying = true;
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
            keysPaused = true;
            setTimeout(function () {
                wordsLeftCheck();
            }, 1500);
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
        var imageAudio = new Audio("assets/audio/" + soundLibrary[nextWord]);
        starWarsTheme.pause();
        imageAudio.play();
        imageAudio.addEventListener("ended", function () {
            if (gameNotEnding) {
                starWarsTheme.play();
            };
        });
    };

    starWarsTheme.addEventListener("ended", function () {
            gameNotEnding = false;
            /* Because all games must end, and because I'd rather the iconic
            Star Wars opening music play only at the beginning of this one. */
    });

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
        endGif.style = "margin: 1.5rem auto 0; display: block; max-width: 80%;";
        var replaceWithGif = document.getElementById("mainContainer");
        replaceWithGif.appendChild(endGif);
        var endText = document.createElement("h2");
        endText.textContent = y;
        endText.style = "text-align: center; padding: 1.5rem 0;"
        replaceWithGif.appendChild(endText);
    };

    function lukeSezNo() {
        gameNotEnding = false;
        starWarsTheme.pause();
        var endAudio = new Audio("assets/audio/luke-no.mov");
        var endAudio2 = new Audio("assets/audio/empire-ending-song.mp3");
        endAudio.play();
        endAudio.addEventListener("ended", function () {
            endAudio2.loop = true;
            endAudio2.play();
        });
    };

    function tooBadChewie() {
        gameNotEnding = false;
        starWarsTheme.pause();
        var endAudio = new Audio("assets/audio/throne-room-theme.mp3");
        endAudio.loop = true;
        endAudio.play();
    };

    function wordsLeftCheck() {
        if (possibleWords.length === 0) {
            if (winCount === 0) {
                finalImage("luke-no.gif", "You didn't win at all. Better luck next time.");
                lukeSezNo();
            }

            else if ((winCount > 0) && (winCount < 7)) {
                finalImage("luke-no.gif", "You won " + winCount + " times. That's not so good.");
                lukeSezNo();
            }

            else if ((winCount > 6) && (winCount < 12)) {
                finalImage("medal-ceremony.gif", "You won " + winCount + " times. That's pretty good!");
                tooBadChewie();
            }

            else {
                finalImage("medal-ceremony.gif", "Wow! You got every single word! Very impressive!");
                tooBadChewie();
            }
        }

        else {
            newWord();
        };

        keysPaused = false;
    };

    newWord();

    document.addEventListener("click", function (event) {
        playTheme();
    });

    document.addEventListener("keyup", function (event) {
        playTheme();

        if (!keysPaused) {
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
                keysPaused = true;
                deleteChildren("currentWord");
                showCorrectGuess();
                victory();
                setTimeout(function () {
                    wordsLeftCheck();
                }, 3000);
            }

            else if (correctGuess) {
                guessedLetters.push(event.key.toLowerCase());
                deleteChildren("currentWord");
                showCorrectGuess();
            }

            else if ((!correctGuess) && ((event.keyCode > 64 && event.keyCode < 91) ||
                (event.keyCode > 96 && event.keyCode < 123)) && (badGuessCount === 0)) {
                var keyPressed = document.createElement("p");
                keyPressed.textContent = event.key.toUpperCase();
                alreadyGuessed.appendChild(keyPressed);
                guessedLetters.push(event.key.toLowerCase());
                previousGuess = event.key.toUpperCase();
                guessExpended();
            }

            else if ((!correctGuess) && ((event.keyCode > 64 && event.keyCode < 91) ||
                (event.keyCode > 96 && event.keyCode < 123)) && (badGuessCount > 0)) {
                for (i = 0; i < guessedLetters.length; i++) {
                    if (guessedLetters[i] === event.key.toLowerCase()) {
                        break;
                    }

                    else if ((guessedLetters[i] !== event.key) && (i === (guessedLetters.length - 1))) {
                        var editThis = document.getElementById("alreadyGuessed");
                        var addComma = editThis.lastChild;
                        addComma.textContent = previousGuess + ",";
                        var keyPressed = document.createElement("p");
                        keyPressed.textContent = event.key.toUpperCase();
                        keyPressed.style = "text-indent: 1.5vw;";
                        alreadyGuessed.appendChild(keyPressed);
                        guessedLetters.push(event.key.toLowerCase());
                        previousGuess = event.key.toUpperCase();
                        guessExpended();
                    }
                }
            };
        };
    });
});