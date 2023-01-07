const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const restartButton = document.getElementById('restart-btn')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answers')
const result = document.getElementById('result')
const health = document.getElementById('health')
const heart = document.getElementById('health').children


const info = document.getElementById('info')
const hr = document.getElementById('hr')
let qNumber = document.getElementById('qnumber')
let questionNumber = 0; 

let shuffledQuestions, currentQuestionIndex



// Start Button
startButton.addEventListener('click', startGame)

// Restart Button
restartButton.addEventListener('click', () => { 
  startButton.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  info.classList.remove('hide')
  health.classList.remove('hide')
  hr.classList.remove('hide')
  result.classList.add('hide')
  answerButtonsElement.classList.remove('hide')
  restartButton.classList.add('hide')
  currentQuestionIndex = 0
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  startGame()
  questionNumber = 0;
  questionNumber++; 

  // When restarting game, health check.
  const currentHealth = heart.length;
  if (currentHealth === 0) {
      addHeart();
      addHeart();
      addHeart();
    } else if (currentHealth === 1) {
      addHeart();
      addHeart();
    } else if (currentHealth === 2) {
      addHeart();
    }
    })

  // Next Button
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
  })


 // Start Game 
  function startGame () {
  startButton.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  info.classList.remove('hide')
  health.classList.remove('hide')
  hr.classList.remove('hide')
  answerButtonsElement.classList.remove('hide')
  nextButton.classList.remove('hide')
  restartButton.classList.add('hide')
  currentQuestionIndex = 0
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  setNextQuestion()
  questionNumber = 1;
  }

// Remove Heart. If there aren't any heart, game will over.
function removeHeart() {
  if (heart.length > 0) {
  heart[0].remove();
  }
  if (heart.length === 0) {
  questionContainerElement.classList.add('hide')
  info.classList.add('hide')
  health.classList.add('hide')
  hr.classList.add('hide')
  answerButtonsElement.classList.add('hide')
  nextButton.classList.add('hide')
  result.classList.remove('hide')
  startButton.classList.add('hide')
  restartButton.classList.remove('hide')
  result.innerText = "You have lost your 3 hearts... Click on restart button to play again."
  clearInterval(timerId);
  const buttons = document.getElementById('buttons')
  buttons.classList.add('hide')
  }
  }

  // Adding missing hearts. I'm using it when the game restart.
  function addHeart (){
    const newHeart = document.createElement("i");
    newHeart.classList.add("fa-sharp", "fa-solid", "fa-heart");
    newHeart.setAttribute("id", "heart")
    health.appendChild(newHeart);
  }

  function setNextQuestion () {
    resetState()
    if(heart.length > 0){
    questionNumber++;
    } else if (heart.length === 0) {
    questionNumber = 1; 
    }
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Show question top-left on the container.
function showQuestion(question) {
  questionElement.innerText = question.question;
  qNumber.innerText = "Question: " + questionNumber +"/10";
  question.answers.forEach(answer => {
  const button = document.createElement('button')
  button.innerText = answer.text
  button.classList.add('btnansw')

    if (answer.correct) {
        button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
 })
}


// Timer on the top-right on the container.
let timeLeft = 30;
let timer = document.getElementById('timer');
let timerId = setInterval(countdown, 1000);
  function countdown() {
    timer.classList.remove('hide')
    // If time is up, game will be over.
  if (timeLeft == -1) {
    questionContainerElement.classList.add('hide')
    info.classList.add('hide')
    health.classList.add('hide')
    hr.classList.add('hide')
    answerButtonsElement.classList.add('hide')
    nextButton.classList.add('hide')
    result.classList.remove('hide')
    startButton.classList.add('hide')
    restartButton.classList.remove('hide')
    result.innerText = "Time is over."
    questionNumber = 0; 
  } else {
    timer.innerHTML = timeLeft;
    timeLeft--;
    }
    }

  function resetState() {
    clearInterval(timerId);
    timerId = setInterval(countdown, 1000);
    timeLeft = 30;
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}



  function selectAnswer(e) {
    // Disable all answer buttons after the answer
    answerButtonsElement.querySelectorAll('button').forEach(button => {
    button.disabled = true;
    });
  
    // Get all answer buttons
    const buttons = document.querySelectorAll('.btnansw');
  
    // Add click event listener to each answer button
    buttons.forEach(button => {
    button.addEventListener('click', event => {
    // Get correct status of button
    const correct = button.dataset.correct;
    // Set correct or wrong class on button
    if (correct) {
      button.classList.add('correct');
    } else {
      button.classList.add('wrong');
    }
    });
    });

    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(selectedButton, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
    });

    if (!correct){
      removeHeart();
    }

// Checking if there are any questions left or not.
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
    questionNumber--;
    questionNumber--;
    questionNumber--;
    questionNumber--;
    questionNumber--;
    questionNumber--;
    questionNumber--;
    questionNumber--;
    questionNumber--;
    questionNumber--;

    startButton.classList.add ('hide');
    result.innerText = 'Congratulations! You have past this quiz!';
    result.classList.remove('hide');
    restartButton.classList.remove('hide');
    clearInterval(timerId);
}
}

    function setStatusClass(element, correct) {
    clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')  
}


//Questions
const questions = [
    {
        question: "How many time zones are there in Russia?",
        answers: [
            {text: '8', correct: false},
            {text: '9', correct: false},
            {text: '10', correct: false},
            {text: '11', correct: true}
        ]
    },
    {
      question: 'In which two countries can you not buy Coca Cola?',
      answers: [
        { text: 'China - Russia', correct: false },
        { text: 'North Korea - Cuba', correct: true },
        { text: 'Serbia - South Korea', correct: false },
        { text: 'Spain - Portugal', correct: false }
      ]
    },
    {
      question: "How many times has England won the men's football World Cup?",
      answers: [
        { text: '1', correct: true },
        { text: '2', correct: false },
        { text: '3', correct: false },
        { text: '4', correct: false }
      ]
    },
    {
      question: 'Which country in the world is believed to have the most miles of motorway?',
      answers: [
        { text: 'Turkey', correct: false },
        { text: 'USA', correct: false },
        { text: 'Russia', correct: false },
        { text: 'China', correct: true }
      ]
    },
    {
      question: "Which of the following is a famous English rock band?",
      answers: [
        { text: "The Rolling Stones", correct: true },
        { text: "U2", correct: false },
        { text: "AC/DC", correct: false },
        { text: "Metallica", correct: false }
      ]
    },
    {
      question: "Which of the following is a famous English actor?",
      answers: [
        { text: "Tom Hanks", correct: false },
        { text: "Will Smith", correct: false },
        { text: "Johnny Depp", correct: false },
        { text: "Benedict Cumberbatch", correct: true }
      ]
    },
    {
    question: "Which of the following is a traditional English dish?",
    answers: [
        { text: "Sushi", correct: false },
        { text: "Paella", correct: false },
        { text: "Fish and Chips", correct: true },
        { text: "Borscht", correct: false }
      ]
    },
    {
    question: "What is the most popular sport in England?",
    answers: [
        { text: "Football", correct: true },
        { text: "Baseball", correct: false },
        { text: "Basketball", correct: false },
        { text: "Tennis", correct: false }
      ]
    },
    {
    question: "What is the highest peak in England?",
    answers: [
        { text: "Mount Snowdon", correct: false },
        { text: "Ben Nevis", correct: false },
        { text: "Scafell Pike", correct: true },
        { text: "The Cheviot", correct: false} 
      ]  
    },
    {
    question: "What is the name of the famous clock tower in London?",
    answers: [
        { text: "Big Ben", correct: true },
        { text: "The Tower Clock", correct: false },
        { text: "The Westminister Clock", correct: false},
        { text: "The London Clock Tower", correct: false} 
    ]  
    }
] 