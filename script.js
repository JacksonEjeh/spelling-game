const items = [
    { // array of images and answer
        id: 1,
        image: "./img/bird.jpg",
        answer: 'bird'
    }, 
    {
        id: 2,
        image: "./img/cat.jpg",
        answer: 'cat'
    }, 
    {
        id: 3,
        image: "./img/dog.jpg",
        answer: 'dog'
    }, 
    {
        id: 4,
        image: "./img/monkey.jpg",
        answer: 'monkey'
    },
    {
        id: 5,
        image: "./img/fox.jpg",
        answer: 'fox'
    },
    {
        id: 6,
        image: "./img/giraffe.jpeg",
        answer: 'giraffe'
    },
    {
        id: 7,
        image: "./img/leopard.jpg",
        answer: 'leopard'
    },
]

function shuffle(array) { // shuffle array when reloading
    let currentIndex = array.length;
 
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array
}

let gameCard = document.getElementById('game-card')
let gameImg = document.getElementById('game-card').firstElementChild
let initialCount = document.getElementById('countdown').innerText
let data = shuffle(items)

 
function stopGame(interval) { // function to clear any interval
    clearInterval(interval)
}

function startTimer(count) { // function to start countdown timer
    let timer = count
    let countDown = setInterval(() => {

        timer--
        if (timer === 0) {
            timer = 60
            document.getElementById('countdown').classList.add('text-green-500')
            document.getElementById('countdown').classList.remove('text-red-600')
        }

        if (timer === 10) {
            document.getElementById('countdown').classList.add('text-red-600')
            document.getElementById('countdown').classList.remove('text-green-500')
        }
        document.getElementById('countdown').innerText = 'Timer:'+' '+ timer
    }, 1000)
    return countDown
}

function startEntry(currentIndex, countDownTimer, score) { // function to pass data entry
    let entryIndex = currentIndex
    gameImg.setAttribute('src', data[entryIndex].image)
    gameImg.setAttribute('alt', entryIndex)
    let entryInterval = setInterval(() => {
        entryIndex++;
        if (entryIndex >= data.length) {
            stopGame(entryInterval);
            stopGame(countDownTimer);
            gameCard.style.margin = 0
            gameCard.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center">
                <p class="my-3 font-bold text-center text-red-700 text-3xl">Game Over!</p>
                </div>`
            document.getElementsByTagName('body')[0].classList.add('flex-column', 'vh-100');
            document.getElementById('restartGame').classList.remove('d-none');

        } else {
            gameImg.setAttribute('src', data[entryIndex].image)
            gameImg.setAttribute('alt', entryIndex)
            document.getElementById('answer').innerText = ''
        }

    }, 60000)

    return entryInterval
}

function startGame() { // function to start game 

    document.getElementById('countdown').classList.remove('d-none')
    document.getElementById('answer').classList.remove('d-none')
    document.getElementById('startGame').classList.add('d-none')
    document.getElementById('Opening').classList.add('d-none')
    document.getElementById('checkAnswer').classList.remove('d-none')
    document.getElementById('delete').classList.remove('d-none')

    let score = 0 // keep track of score

    const letters = [ // array of letters
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M'
    ];

    letters.map((letter) => { // map keys to game
        document.getElementById('keys').innerHTML += `<div class="p-3 bg-gray-600 cursor-pointer p-1 text-capitalize text-white fw-bold letters">${letter}</div>`
    })

    let countDown = startTimer(initialCount) // call timer

    let entryInterval = startEntry(0, countDown, score)

    document.getElementById('keys').addEventListener('click', function(e) { // display answer
        if (e.target.classList.contains('letters')) {
            document.getElementById('answer').innerText += e.target.innerText
        }
    })


    document.getElementById('delete').addEventListener('click', function() { // delete answer
        let inputedAnswer = document.getElementById('answer').innerText
        document.getElementById('answer').innerText = inputedAnswer.slice(0, -1)
    })


    document.getElementById('checkAnswer').addEventListener('click', function() { // check answer
        let inputedAnswer = document.getElementById('answer').innerText;
        let dataIndex = parseInt(gameImg.getAttribute('alt')) ;
        let responseMsg = document.getElementById('response')
        if (inputedAnswer.toLocaleLowerCase() === data[dataIndex].answer) {
            score++
            responseMsg.innerHTML = `<p class="text-center">Good job</p>`
            responseMsg.classList.add('text-white')
            setTimeout(() => {
                responseMsg.innerText = ''
                responseMsg.classList.remove('text-white')
            }, 1000);

            document.getElementById('answer').innerText = ''
            stopGame(entryInterval)
            stopGame(countDown)
console.log(dataIndex + 1)

            if (data[dataIndex + 1]) {
                countDown = startTimer(initialCount) // restart timer
                entryInterval = startEntry(dataIndex + 1, countDown, score) // go to next entry

            } else {
                gameCard.style.margin = 0
                gameCard.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center">
                <p class="my-3 font-bold text-center text-red-700 text-3xl">Game Over!</p>
                </div>`
                document.getElementsByTagName('body')[0].classList.add('flex-column', 'vh-100');
                document.getElementById('restartGame').classList.remove('d-none');
            }
        } else {
            responseMsg.innerHTML = `<p class="text-center">Try Again</p>`
            responseMsg.classList.add('text-white')
            setTimeout(() => {
                responseMsg.innerText = ''
                responseMsg.classList.remove('text-white')
            }, 1000);
        }
    })

}


document.getElementById('startGame').addEventListener('click', startGame) // start game

document.getElementById('restartGame').addEventListener('click', function() { // restart game
    window.location.reload();
})

document.getElementById('startGame').addEventListener('click', function(){
    gameImg.classList.remove('hidden')
})