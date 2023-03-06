const circles = document.querySelectorAll('.circles')
const scoreIs = document.getElementById('scoreIs')
const yourScore = document.getElementById('yourScore')
const startButton = document.querySelector('#startButton')
const stopButton = document.querySelector('#stopButton')
const closeButton = document.querySelector('#closeButton')
let score = 0
let hlCircleNumber = 0
let timer
let pace = 1000
let missedRounds = 0

function startGame () {
  startButton.classList.add('hidenButton')
  stopButton.classList.remove('hidenButton')
  scoreIs.textContent = 0

  function newRound (hlCircle) {
    if (missedRounds >= 4) {
      return stopGame()
    }
    timer = setTimeout(highliteCircle, pace)
    setTimeout(() => hlCircle.classList.remove('highlighted'), pace)
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
      score += 1
      missedRounds = 0
      scoreIs.textContent = score
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
  hlCircleNumber = 0 // to cut the possibilty of proceeding game and getting points

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
