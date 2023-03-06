const circles = document.querySelectorAll('.circles')
const scoreIs = document.getElementById('scoreIs')
const yourScore = document.getElementById('yourScore')
const startButton = document.querySelector('#startButton')
const stopButton = document.querySelector('#stopButton')
const closeButton = document.querySelector('#closeButton')
let score = 0
let hlCircleNumber = 0
let timer
let pace = 1300
let missedRounds = 0
let wasAlreadyClicked = false // this variable is for avoid get multiple points for multiple clicking on same highlighted circle

function startGame () {
  startButton.classList.add('hidenButton')
  stopButton.classList.remove('hidenButton')
  scoreIs.textContent = 0

  function newRound (hlCircle) {
    wasAlreadyClicked = false
    if (missedRounds >= 4) {
      return stopGame()
    }
    timer = setTimeout(highliteCircle, pace) // here we add the highlight to circle
    setTimeout(() => hlCircle.classList.remove('highlighted'), pace) // here we remove the highlight from the circle
    pace -= 10
    missedRounds++
  }

  function highliteCircle () {
    const randomNumber = Math.floor(Math.random() * 4 + 1)
    if (hlCircleNumber === randomNumber) { // if random number is equival to the number of already highlighted circle
      highliteCircle() // then we choose another random number
    } else {
      const randomCircle = document.querySelector(`#c${randomNumber}`)
      randomCircle.classList.add('highlighted')
      hlCircleNumber = randomNumber
      newRound(randomCircle)
    }
  }

  function circleClicked (i) {
    if (i === hlCircleNumber) {
      if (!wasAlreadyClicked) {
        score += 1
        missedRounds = 0
        scoreIs.textContent = score
        wasAlreadyClicked = true
      }
    } else {
      stopGame()
    }
  }

  highliteCircle()

  circles.forEach((circle, i) => {
    circle.addEventListener('click', () => circleClicked(i + 1)) // () - anonimous function that starts another function circleClicked with parametr i
  })
}

function stopGame () {
  const closeButton = document.querySelector('#closeButton')
  hlCircleNumber = 0 // to cut the possibility of proceeding game and getting points

  function modalShow () {
    document.querySelector('.overlay').classList.toggle('visible')
    yourScore.textContent = `Your score: ${score}`
  }

  for (const circle of circles) {
    circle.classList.remove('highlighted')
  }

  modalShow()

  closeButton.addEventListener('click', modalShow)
  clearTimeout(timer)
}

function resetGame () {
  window.location.reload()
}

startButton.addEventListener('click', startGame)
stopButton.addEventListener('click', stopGame)
closeButton.addEventListener('click', resetGame)
