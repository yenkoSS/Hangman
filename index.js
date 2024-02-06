
const copyrightYear = document.querySelector('small');
const dateYear = new Date().getFullYear();
copyrightYear.textContent = `Copyright © ${dateYear} - yenkoSS`

const containerEl = document.querySelector('.container');

const btnPlayEl = document.querySelector('.btn-play');
const btnCheckEl = document.querySelector('.btn-check');
const btnPlayAgainEl = document.querySelector('.btn-playAgain')
const textRulesEl = document.querySelector('.text-muted')
const hiddenWordEl = document.querySelector('.text-word')

const inputBoxEl = document.querySelector('.input-box')
const inputEl = document.querySelector('input')

const usedLettersEL = document.querySelector('.used-letters')
const stageImg = document.querySelector('.stage')
const errorEl = document.querySelector('.text-error')

let lives = 6;

function renderHiddenWord (word) {

    let hiddenWord = new String();
    for (let i=0; i<word.length; i++) {
        
        hiddenWord += '_'
    }
    
    return hiddenWord
}

function selectRandomWord () {

    const words = ['mechanic', 'root', 'kitchen', 'bedroom', 'robot']
    const selectedWord = words[Math.floor(Math.random() * words.length)]
    return selectedWord

}

let randomWord = selectRandomWord();

let hiddenWord = renderHiddenWord(randomWord);

function updateDisplay (letter, word) {
    let indexes = [];
    console.log(hiddenWord)
    hiddenWord = hiddenWord.split('')
    for (let i=0; i<=word.length; i++) {
        
        if (word[i] === letter) {
            indexes.push(i)
        }
    }

    console.log(indexes)

    for (let i=0; i<=indexes.length; i++) {
        hiddenWord[indexes[i]] = letter
    }

    hiddenWord = hiddenWord.join("");
}

const isEmpty = (value) => value === '' ? true : false;

function isString (value) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(value);
}

function checkInput (value) {
    if (isEmpty(value)) {

        showError('You must enter a letter or word.')
        return

    } else if (!isString(value)) {

        showError('Invalid letter')
        return

    } else {

        return true

    }
}

function checkIncludeLetter (letter, string) {
    return string.includes(letter)
}


function updateDrawing(lives) {
    if (lives === 6) {
        stageImg.setAttribute('src','img/6lives.png')
    } else if (lives === 5) {
        stageImg.setAttribute('src','img/5lives.png')
    } else if (lives === 4) {
        stageImg.setAttribute('src','img/4lives.png')
    } else if (lives === 3) {
        stageImg.setAttribute('src','img/3lives.png')
    } else if (lives === 2) {
        stageImg.setAttribute('src','img/2lives.png')
    } else if (lives === 1) {
        stageImg.setAttribute('src','img/1lives.png')
    } else if (lives === 0) {
        stageImg.setAttribute('src','img/0lives.png')
    }
}

function showError(message) {
    errorEl.classList.remove('hidden');
    errorEl.textContent = message;
}


function removeError() {
    errorEl.classList.add('hidden');
    errorEl.textContent = '';
}

btnPlayEl.addEventListener('click', ()=>{

    textRulesEl.classList.add('hidden')
    btnPlayEl.classList.add('hidden')
    btnCheckEl.classList.remove('hidden')
    inputBoxEl.classList.remove('hidden')
    hiddenWordEl.classList.remove('hidden')
    hiddenWordEl.textContent = hiddenWord

})


btnCheckEl.addEventListener('click', function()  {

    const inputValue = inputEl.value;

    if (checkInput(inputValue)) {
        removeError();
        if (checkIncludeLetter(inputValue, randomWord)) {
            updateDisplay(inputValue, randomWord, hiddenWord)
            hiddenWordEl.textContent = hiddenWord;
            inputEl.value = ''
        } else {
            lives -= 1
            updateDrawing(lives)
        }

        if (lives === 0) {
            showError(`Game Over! The correct word was: ${randomWord}`)
            btnCheckEl.classList.add('hidden');
            btnPlayAgainEl.classList.remove('hidden')
        }
        if (inputValue === randomWord) {
            showError('Congratulations!')
            hiddenWordEl.textContent = randomWord;
            btnCheckEl.classList.add('hidden');
            btnPlayAgainEl.classList.remove('hidden')
        }

        if (randomWord === hiddenWord) {
            showError('Congratulations!')
            btnCheckEl.classList.add('hidden');
            btnPlayAgainEl.classList.remove('hidden')
        }
    }

})

btnPlayAgainEl.addEventListener('click', () => {
    lives = 6;
    updateDrawing(lives)
    removeError()
    randomWord = selectRandomWord();
    hiddenWord = renderHiddenWord(randomWord)
    hiddenWordEl.textContent = hiddenWord
    btnCheckEl.classList.remove('hidden');
    btnPlayAgainEl.classList.add('hidden')
})


