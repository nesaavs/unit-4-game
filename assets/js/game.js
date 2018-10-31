
$(document).ready(function() {

	// Declare and assign values to variables
  var numberToMatch = 0;
  var randomNum = randomNumGen();
  var wins = 0;
  var losses = 0;
  var crystals;

  // function random
  function randomNumCrystals() {
    return {
	//assigning values to gems
      purpleGem: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/purpleGem.png"
      },
      blueGem: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/blueGem.png"
      },
      redGem: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/redGem.png"
      },
      greenGem: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/greenGem.png"
      }
    };
  }
	//generating random number between 19 and 120
	function randomNumGen() {
    return Math.floor(Math.random() * 102) + 19;
  }

  // resetGame function
  function resetGame() {
  
    numberToMatch = 0;
    // Generate random crystal values.
    crystals = randomNumCrystals();
    // Generate a random target number and render it to the page.
    randomNum = randomNumGen();
    $("#numberToMatch").text(randomNum);
  }

  // Update game function
  function updateGame(didUserWin) {
    $("#winLoss").empty();
	//win
    if (didUserWin === true) {
      $("#winLoss").append($("<p>").text("Yay you won!!"));
      resetGame();
      renderMatchingNumber();
    }
    // loss
    else if (didUserWin === false) {
      $("#winLoss").append($("<p>").text("Awe you lost!!"));
      resetGame();
      renderMatchingNumber();
    }
	
	// Writing wins and losses to page
    var wSpan = $("<span>").text(wins);
    var lSpan = $("<span>").text(losses);

    var pWins = $("<p>").text("Wins: ");
    var pLosses = $("<p>").text("Losses: ");

    pWins.append(wSpan);
    pLosses.append(lSpan);

    $("#winLoss").append(pWins);
    $("#winLoss").append(pLosses);
  }
  
  // Gems
  function copyGems() {
    for (var key in crystals) {
      var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
      var crystalImg = $("<img alt='GemImage' class='crystalImg'>").attr("src", crystals[key].imageUrl);
      crystalDiv.append(crystalImg);
      $("#crystals").append(crystalDiv);
    }
  }

  // Function to update our "current guess" number. We are passing in the crystal that was clicked as an argument.
  function updateMatchingNumber(crystal) {
    // Update our "current guess" number based on which crystal was clicked.
    numberToMatch += crystals[crystal.attr("data-name")].points;
  }

  // Function that will render your "current guess" number to the page.
  function renderMatchingNumber() {
    var scoreNumDiv = $("<div id='score-number'>").text(numberToMatch);
    $("#scoreArea").html();
    $("#scoreArea").html(scoreNumDiv);
  }

  // Call our functions to start the game!
  resetGame();
  updateGame();
  copyGems();
  renderMatchingNumber();

  // Here we create an on.click event for the crystals.
  $(".crystals-button").on("click", function(event) {
    // Update our "current guess" number and re-render it.
    updateMatchingNumber($(this));
    renderMatchingNumber();

    // Check to see if we have won or lost.
    // If our current guess number equals the target number..
    if (numberToMatch === randomNum) {
      // Increment wins, restart the game, and update the page.
      wins++;
      resetGame();
      updateGame(true);
    }
    // Guessed number > numberToMatch losses++
    else if (numberToMatch > randomNum) {
      losses++;
      resetGame();
      updateGame(false);
    }
  });

});
