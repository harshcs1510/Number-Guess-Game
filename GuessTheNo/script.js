let randomNum=parseInt(Math.random()*100+1)

const submit=document.querySelector('#subt')
const userInput=document.querySelector('#guessField')
const guessSlot=document.querySelector('.guesses')
const remaining=document.querySelector('.lastResult')
const lowOrHi=document.querySelector('.lowOrHi')
const startOver=document.querySelector('.resultParas')

const p=document.createElement('p')

let prevGuess=[]
let numGuess=0

let playGame=true

if(playGame){

    submit.addEventListener('click', function(e){
        e.preventDefault()
        const guess=parseInt(userInput.value)
        validateGuess(guess)
    })
}

function validateGuess(guess){
    if(isNaN(guess) || guess<1 || guess>100)
        alert('Please enter a valid number')
    else{
        prevGuess.push(guess)
        displayGuess(guess)
        if(numGuess>=10){
            lowOrHi.innerHTML=`<h2>Game over. Random Number Was ${randomNum}</h2>`
            endGame()
        }
        else{
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess===randomNum){
        lowOrHi.innerHTML=`<h2>You guessed it right</h2>`
        endGame()
    } 
    else if(guess<randomNum)
        lowOrHi.innerHTML=`<h2>Number is TOOO Low</h2>`
    else if(guess>randomNum)
        lowOrHi.innerHTML=`<h2>Number is TOOO High</h2>`
}

function displayGuess(guess){
    userInput.value=''
    guessSlot.innerHTML+=`${guess}, `
    numGuess+=1
    remaining.innerHTML=`${10-numGuess}`
}

function endGame(){
    userInput.value=''
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML=`<h2 id="newGame">Start New Game</h2>`
    startOver.appendChild(p)
    playGame=false
    newGame()
}

function newGame(){
    const newGameButton=document.querySelector('#newGame')
    newGameButton.addEventListener('click', function(e){
        randomNum=parseInt(Math.random()*100+1)
        prevGuess=[]
        numGuess=0
        guessSlot.innerHTML=''
        remaining.innerHTML=`${10-numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame=true
    })
}