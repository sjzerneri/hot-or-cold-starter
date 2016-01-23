$(document).ready(function () {

    //1. Create Global Variables

    //generate a secret number between 1-100 and show it in the console
    function secretNum(min, max) {
        var secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return secretNumber;
    }

    var secretNumber = secretNum(1, 100);


    //variable to create a countdown counter

    var counter = 30;
    $('#count').text(counter);

    //variable for old guess

    var oldGuess = 0;

    //2. Create Functions

    // Function to start a new game
    function newGame() {
        document.location.reload(true);
    }

    //Function to feedback on the guessedNumber versus secret number
    function giveFeedback(secretNumber, guessedNumber) {
        var difference = Math.abs(secretNumber - guessedNumber);

        if (difference >= 50) {
            $('#feedback').text('Ice Cold!');
        } else if (difference >= 30 && difference < 50) {
            $('#feedback').text('Cold!');
        } else if (difference >= 20 && difference < 30) {
            $('#feedback').text('Warm!');
        } else if (difference >= 10 && difference < 20) {
            $('#feedback').text('Hot!');
        } else if (difference >= 1 && difference < 10) {
            $('#feedback').text('Very Hot!');
        } else {
            $('#feedback').text('You got it! Nice job');
        }
    }

    //function to give relative feedback if number of guesses > 0

    function relativeFeedback(secretNumber, oldGuess, newGuess) {

        if (secretNumber != newGuess) {

            var oldDiff = Math.abs(oldGuess - secretNumber);
            var newDiff = Math.abs(newGuess - secretNumber);

            if (oldDiff > newDiff) {
                $('#relative-feedback').text('You are getting warmer');
            } else if (oldDiff === newDiff) {
                $('#relative-feedback').text('You are losing it...that\'s the same guess!');
            } else $('#relative-feedback').text('You are getting colder');

        } else $('#relative-feedback').text('');
    }




    //function to validate input and make sure its an integer

    function validateInput(guessedNumber) {
        //if the guess number is not 1 through 100 dont do anything
        if (guessedNumber < 1 || guessedNumber > 100) {
            alert('Please enter a number 1 - 100');
            $('#userGuess'.val(''));
            return false; //this will stop the loop and not do anything else.
        }
        //if the number is a decimal don't do anything
        else if (guessedNumber % 1 != 0) {
            alert('Please enter an integer 1-100, no decimals please');
            $('#userGuess'.val(''));
            return false;
        }
        //other wise validate the number
        else {
            giveFeedback(secretNumber, guessedNumber);
            counter--;
            showPreviousGuesses();
            guessCounter(counter); //update the guess history
            $('#userguess').val(''); //reset the guess value to blank

            //end the game if there are no more guesses left
            if (counter <= 0) {
                $('#feedback').text('Game Over!');
                document.getElementById("userGuess").disabled = true;
                document.getElementById("guessButton").disabled = true;
                alert('The secret number was ' + secretNumber + ' Better luck next time!');
            }
        }

    }

    //function to show the number of guess left

    function guessCounter(counter) {
        $('#count').text(counter);
    }

    //function to show all previous guesses

    function showPreviousGuesses() {
        $('#guessList').append('<li>' + parseInt($('#userGuess').val(), 10 + '</li>'));
    }

    //3. Use Functions In The Game

    //create a new game when "new game" is clicked

    $('.new').on('click', newGame);

    //when user clicks guess, validate input, give relative feedbak, show history of guesses, and update counter

    $('#guessButton').on('click', function () {
        var guessedNumber = parseInt($('#userGuess').val(), 10);
        var newGuess = guessedNumber;
        //validate the guessed number
        validateInput(guessedNumber);

        //check to see if this is the users first guess
        if (oldGuess != 0 && guessedNumber >= 1 && guessedNumber <= 100) {
            relativeFeedback(secretNumber, oldGuess, newGuess);
            //update oldGuess
            oldGuess = newGuess;
        }
    });

    $('#userGuess').on('keypress', function (e) {
        //on enter
        if (e.which === 13) {
            e.preventDefault();
            var guessedNumber = parseInt($('#userGuess').val(), 10);
            var newGuess = guessedNumber;

            //validate the number
            validateInput(guessedNumber);

            //if the user has multiple guesses

            if (oldGuess !== 0 && guessedNumber >= 1 && guessedNumber <= 100) {
                relativeFeedback(secretNumber, oldGuess, newGuess);
            }
            //re-update the old guess with the the new value
            oldGuess = newGuess;
        }
    });

    //when user presses enter " "

    /*--- Display information modal box ---*/
    $(".what").click(function () {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });


});
