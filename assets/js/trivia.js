(function() {
  function quizBuilder() {
    // array to store output
    var output = [];


    testQuestions.forEach((actQuestion, qNumber) => {
      var answers = [];

		// and for each available answer radio button
      for (letter in actQuestion.answers) {
        answers.push(
          `<label>
            <input type="radio" name="question${qNumber}" value="${letter}">
            ${letter} :
            ${actQuestion.answers[letter]}
          </label>`
        );
      }


      output.push(
        `<div class="question"> ${actQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    var answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    testQuestions.forEach((actQuestion, qNumber) => {
      var answerContainer = answerContainers[qNumber];
      var selector = `input[name=question${qNumber}]:checked`;
      var yourChoice = (answerContainer.querySelector(selector) || {}).value;

	  
		//if answer is right increase correct answers counter
      if (yourChoice === actQuestion.rightAnswer) {
        numCorrect++;
        answerContainers[qNumber].style.color = "lightgreen";
      } else {
        answerContainers[qNumber].style.color = "red";
      }
    });
	
	

    resultsContainer.innerHTML = `${numCorrect} out of ${testQuestions.length}`;
  }
  //Questions go here
  var quizContainer = document.getElementById("quiz");
  
  //Display Results
  var resultsContainer = document.getElementById("results");
  
  //Submit Button
  var submitButton = document.getElementById("submit");
  
  
  //array of questions
  var testQuestions = [
    {
      question: "what is 8 x 8?",
      answers: {
        a: "16",
        b: "64",
        c: "32",
		d: "18"
      },
      rightAnswer: "b"
    },
    {
      question: "What is the square root of 144?",
      answers: {
        a: "4",
        b: "15",
        c: "12",
		d: "9"
      },
      rightAnswer: "c"
    },
    {
      question: "What is the area of a square with side of 5 inches?",
      answers: {
        a: "25 inches",
        b: "12 cubic inches",
        c: "32 square inches",
        d: "25 square inches"
      },
      rightAnswer: "d"
    }
  ];

  // display quiz
  quizBuilder();
  // show results
  submitButton.addEventListener("click", showResults);
})();



/*counter in process
var sec = 25;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!! :(");
    }
}

Time : <span id="timer"></span>*/