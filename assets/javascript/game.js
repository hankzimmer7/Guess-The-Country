//Create a list of words to guess
var countryList = ["AFGHANISTAN", "ALBANIA", "ALGERIA", "ANDORRA", "ANGOLA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "THE BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BHUTAN", "BOLIVIA", "BOSNIA", "BOTSWANA", "BRAZIL", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CENTRAL AFRICAN REPUBLIC", "CHAD", "CHILE", "CHINA", "COLOMBIA", "COMOROS", "THE CONGO", "COOK ISLANDS", "COSTA RICA", "CROATIA", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "EAST TIMOR", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ERITREA", "ESTONIA", "ETHIOPIA", "FIJI", "FINLAND", "FRANCE", "GABON", "THE GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GRENADA", "GUATEMALA", "GUINEA", "GUINEA BISSAU", "GUYANA", "HAITI", "HONDURAS", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISRAEL", "ITALY", "IVORY COAST", "JAMAICA", "JAPAN", "JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI", "KUWAIT", "KYRGYZSTAN", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACEDONIA", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MARSHALL ISLANDS", "MAURITANIA", "MAURITIUS", "MEXICO", "MICRONESIA", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MOROCCO", "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "MYANMAR", "NAURU", "NEPAL", "NETHERLANDS", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NORTH KOREA", "NORWAY", "OMAN", "PAKISTAN", "PALAU", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "QATAR", "ROMANIA", "RUSSIA", "RWANDA", "SAINT KITTS AND NEVIS", "SAINT LUCIA", "SAINT VINCENT AND THE GRENADINES", "SAMOA", "SAN MARINO", "SAO TOME AND PRINCIPE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOLOMON ISLANDS", "SOMALIA", "SOUTH AFRICA", "SOUTH KOREA", "SOUTH SUDAN", "SPAIN", "SRI LANKA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TOGO", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TUVALU", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES", "URAGUAY", "UZBEKISTAN", "VANUATU", "VATICAN CITY", "VENEZUELA", "VIETNAM", "YEMEN", "ZAMBIA", "ZIMBABWE"]

//Create an array for the possible letters that the user can guess
var lettersRemaining = []

//Create an array of letters that the user has already guessed
var incorrectGuesses = [];

//Creates variables to store the chosen word and previous chosen country
var chosenCountry = "";
var previousCountry;

//Create an array to store the letters of the chosen word
var chosenCountryArray = [];

//Create an array for the incomplete word that the user is guessing
var correctGuesses = [];

//Create a string of the correct guesses array to display to the user
var correctGuessesString = "";

//Create variables to store the guesses remaining, wins, and losses
var guessesRemaining = 10;
var wins = 0;
var losses = 0;

//Function to set up a new game
var setUpNewGame = function () {

    //Reset arrays so they can be correctly filled
    lettersRemaining = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    incorrectGuesses.length = 0;
    chosenCountryArray.length = 0;
    correctGuesses.length = 0;
    guessesRemaining = 10;

    //If this is not the first round, display a link to the previous county
    if (chosenCountry != "") {
        previousCountry = chosenCountry;
        var html =
            "<p> The previous destination was <a target='_blank' href='https://www.google.com/search?q=" + previousCountry + "'>" + previousCountry + ". </p>" +
            "<p><a target='_blank' href='https://www.google.com/maps/search/?api=1&query=" + chosenCountry + "'> Click here to map it! </a><p>";
        document.querySelector("#previous-country").innerHTML = html;
    }

    // Generate a random number
    var randomNumber = Math.floor(Math.random() * countryList.length);

    //Choose a word from the list
    chosenCountry = countryList[randomNumber];
    console.log("Chosen Country: " + chosenCountry);

    //Place the chosen word into an array with each letter occupying one index
    for (var i = 0; i < chosenCountry.length; i++) {
        chosenCountryArray[i] = chosenCountry.charAt(i);
    }

    //Fill the correct guesses array with blanks
    for (var i = 0; i < chosenCountry.length; i++) {
        correctGuesses[i] = "_"
        //If there is a space, use a space rather than a blank
        if (chosenCountryArray[i] === " ") {
            correctGuesses[i] = " ";
        }
    }
    console.log("Chosen Country Array: " + chosenCountryArray);
}

// Set the inner HTML contents of the #game div to our html string
var updateHTML = function () {

    //Update the game parameters
    game =
        "<div id='current-country'> </div>" +
        "<p> Incorrect Guesses: <span class = 'incorrect-guesses'>" + incorrectGuesses + "</span></p>" +
        "<p> Strikes Remaining: " + guessesRemaining + "</p>" +
        "<p> Wins: " + wins + "</p>" +
        "<p> Losses: " + losses + "</p>"

    //Set the html to the updated game parameters
    document.querySelector("#game").innerHTML = game;

    //Clear the current country guessing progress
    $("#current-country").empty();

    //Update the current country guessing progress
    for (var i = 0; i < correctGuesses.length; i++) {
        var node = document.createElement('div');
        if (correctGuesses[i] === " ") {
            node.className = "space";
        } else {
            node.className = "correct-guess";
        }
        var textnode = document.createTextNode(correctGuesses[i]);
        node.appendChild(textnode);
        document.querySelector("#current-country").appendChild(node);
    }
}

//Wait until the document has loaded before starting the game
$(document).ready(function () {

    //Initial game reset
    setUpNewGame();
    updateHTML();

    //Take action when user types a letter
    document.onkeyup = function (event) {

        //Save the user's guess and ensure it is upper case
        var userGuess = event.key.toUpperCase();
        console.log("User Guess: " + userGuess);

        //Only execute if the user guesses a letter from the list of letters remaining
        if (lettersRemaining.indexOf(userGuess) > -1) {

            //Remove the user's guess from the list of letters remaining
            lettersRemaining.splice(lettersRemaining.indexOf(userGuess), 1);

            //If the user guessed correctly
            if (chosenCountryArray.indexOf(userGuess) > -1) {

                //Fill in the user's guess in the blanks of the incomplete word
                for (var i = 0; i < chosenCountryArray.length; i++) {
                    if (userGuess === chosenCountryArray[i]) {
                        correctGuesses[i] = chosenCountryArray[i];
                    }
                }
                updateHTML();
            }
            //If the user wins, reset the game
            if (correctGuesses.indexOf("_") < 0) {
                alert("Well done! You correctly guessed " + chosenCountry + "!");
                wins++;
                setUpNewGame();
            }


            //If the user guessed incorrectly
            else {

                //Add the user's guess to the incorrect guesses
                incorrectGuesses.push(userGuess);
                guessesRemaining--;
                updateHTML();

                //If the user is out of guesses, reset the game
                if (guessesRemaining == 0) {
                    alert("Oh no! You're out of guesses! The country was " + chosenCountry + ".");
                    losses++;
                    setUpNewGame();
                }
            }
        }

        updateHTML();

        console.log("Chosen Country Array: " + chosenCountryArray);
        console.log("Letters Remaining: " + lettersRemaining);
        console.log("Letters Guessed: " + incorrectGuesses);
        console.log("Correct Guesses: " + correctGuesses);
        console.log("Correct Guesses Array: " + correctGuessesString);
        console.log("Guesses Remaining: " + guessesRemaining);
    }
})