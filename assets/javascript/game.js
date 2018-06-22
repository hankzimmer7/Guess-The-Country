//Create a list of words to guess
var wordList = ["AFGHANISTAN", "ALBANIA", "ALGERIA", "ANDORRA", "ANGOLA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "THE BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BHUTAN", "BOLIVIA", "BOSNIA", "BOTSWANA", "BRAZIL", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CENTRAL AFRICAN REPUBLIC", "CHAD", "CHILE", "CHINA", "COLOMBIA", "COMOROS", "THE CONGO", "COOK ISLANDS", "COSTA RICA", "CROATIA", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "EAST TIMOR", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ERITREA", "ESTONIA", "ETHIOPIA", "FIJI", "FINLAND", "FRANCE", "GABON", "THE GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GRENADA", "GUATEMALA", "GUINEA", "GUINEA BISSAU", "GUYANA", "HAITI", "HONDURAS", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISRAEL", "ITALY", "IVORY COAST", "JAMAICA", "JAPAN", "JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI", "KUWAIT", "KYRGYZSTAN", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACEDONIA", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MARSHALL ISLANDS", "MAURITANIA", "MAURITIUS", "MEXICO", "MICRONESIA", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MOROCCO", "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "MYANMAR", "NAURU", "NEPAL", "NETHERLANDS", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NORTH KOREA", "NORWAY", "OMAN", "PAKISTAN", "PALAU", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "QATAR", "ROMANIA", "RUSSIA", "RWANDA", "SAINT KITTS AND NEVIS", "SAINT LUCIA", "SAINT VINCENT AND THE GRENADINES", "SAMOA", "SAN MARINO", "SAO TOME AND PRINCIPE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOLOMON ISLANDS", "SOMALIA", "SOUTH AFRICA", "SOUTH KOREA", "SOUTH SUDAN", "SPAIN", "SRI LANKA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TOGO", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TUVALU", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNIKED KINGDOM", "UNITED STATES", "URAGUAY", "UZBEKISTAN", "VANUATU", "VATICAN CITY", "VENEZUELA", "VIETNAM", "YEMEN", "ZAMBIA", "ZIMBABWE"]

//Create an array of possible letters that the user can guess
var lettersRemaining = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

//Create an array of letters that the user has already guessed
var incorrectGuesses = [];

//Creates an array to store the letters of the chosen word
var chosenWordArray = [];

//Create an array for the incomplete word that the user is guessing
var correctGuesses = [];

//Creates variables to store the guesses remaining, wins, and losses
var guessesRemaining = 10;
var wins = 0;
var losses = 0;

var setUpNewGame = function () {
    lettersRemaining = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    incorrectGuesses.length = 0;
    chosenWordArray.length = 0;
    correctGuesses.length = 0;
    guessesRemaining = 10;

    // Generate a random number
    var randomNumber = Math.floor(Math.random() * wordList.length);

    //Choose a word from the list
    var chosenWord = wordList[randomNumber];

    console.log("Chosen Word: " + chosenWord);
    console.log("Word Length: " + chosenWord.length);

    //Place the chosen word into an array with each letter occupying one index
    for (var i = 0; i < chosenWord.length; i++) {
        chosenWordArray[i] = chosenWord.charAt(i);
    }

    //Fill the correct guesses array with blanks
    for (var i = 0; i < chosenWord.length; i++) {
        correctGuesses[i] = "_"
        //If there is a space, use a space rather than a blank
        if (chosenWordArray[i] === " ") {
            correctGuesses[i] = " ";
        }
    }
    console.log("Chosen Word Array:" + chosenWordArray);
}

//Wait until the document has loaded before starting
$(document).ready(function () {

    // Generate a random number
    var randomNumber = Math.floor(Math.random() * wordList.length);

    //Choose a word from the list
    var chosenWord = wordList[randomNumber];

    console.log("Chosen Word: " + chosenWord);
    console.log("Word Length: " + chosenWord.length);

    //Place the chosen word into an array with each letter occupying one index
    for (var i = 0; i < chosenWord.length; i++) {
        chosenWordArray[i] = chosenWord.charAt(i);
    }

    //Fill the correct guesses array with blanks
    for (var i = 0; i < chosenWord.length; i++) {
        correctGuesses[i] = "_"
        //If there is a space, use a space rather than a blank
        if (chosenWordArray[i] === " ") {
            correctGuesses[i] = " ";
        }
    }

    console.log("Chosen Word Array:" + chosenWordArray);

    //Take action when user types a letter
    document.onkeyup = function (event) {

        //Save the user's guess and ensure it is upper case
        var userGuess = event.key.toUpperCase();
        console.log(userGuess);

        //Only execute if the user guesses a letter from the list of letters remaining
        if (lettersRemaining.indexOf(userGuess) > -1) {

            //Remove the user's guess from the list of letters remaining
            lettersRemaining.splice(lettersRemaining.indexOf(userGuess), 1);

            //If the user guessed correctly
            if (chosenWordArray.indexOf(userGuess) > -1) {

                //Fill in the user's guess in the blanks of the incomplete word
                for (var i = 0; i < chosenWordArray.length; i++) {
                    if (userGuess === chosenWordArray[i]) {
                        correctGuesses[i] = chosenWordArray[i];
                    }
                }
                if (correctGuesses.indexOf("_") < 0) {
                    wins++;
                    setUpNewGame();
                }

            }
            //If the user guessed incorrectly
            else {

                //Add the user's guess to the incorrectGuesses
                incorrectGuesses.push(userGuess);
                guessesRemaining--;
            }
        }

        console.log("Letters Remaining: " + lettersRemaining);
        console.log("Letters Guessed: " + incorrectGuesses);
        console.log("Correct Guesses: " + correctGuesses);
        console.log("Guesses Remaining: " + guessesRemaining);


        // Set the inner HTML contents of the #game div to our html string
        var game =
            "<p> Current Word: " + correctGuesses + "</p>" +
            "<p> Letters Guessed: " + incorrectGuesses + "</p>" +
            "<p> Guesses Remaining: " + guessesRemaining + "</p>" +
            "<p> Wins: " + wins + "</p>" +
            "<p> Losses: " + losses + "</p>";

        document.querySelector("#game").innerHTML = game;

    }
})