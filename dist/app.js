document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const flagAmtDiv = document.querySelector('#flag-amount')
    const bombAmtDiv = document.querySelector('#bomb-amount')
    let width = 10
    let bombAmount = 10
    let flags = 0
    let squaresArray = []
    let isGameOver = false
    let startNg

    //creates grid
    function createBoard() {
        bombAmtDiv.innerHTML = bombAmount
        flagAmtDiv.innerHTML = bombAmount - flags

        //get shuffled game array with random bomb placement
        const bombsArray = Array(bombAmount).fill('bomb')
        const emptyArray = Array(width * width - bombAmount).fill('valid')
        const gameArray = emptyArray.concat(bombsArray)
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squaresArray.push(square)

            //normal click to squares
            square.addEventListener('click', function (e) {
                click(square)
            })

            //cntrl and left click, oncontextmenu is used for right click
            square.oncontextmenu = function (e) {
                e.preventDefault()
                addFlag(square)
            }
        }

        //add numbers to grid
        for (let i = 0; i < squaresArray.length; i++) {
            let total = 0
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i === width - 1)
            //logic for square numbers
            if (squaresArray[i].classList.contains('valid')) {
                if (i > 0 && !isLeftEdge && squaresArray[i - 1].classList.contains('bomb')) total++
                if (i > 9 && !isRightEdge && squaresArray[i + 1 - width].classList.contains('bomb')) total++
                if (i > 10 && squaresArray[i - width].classList.contains('bomb')) total++
                if (i > 11 && !isLeftEdge && squaresArray[i - 1 - width].classList.contains('bomb')) total++
                if (i < 98 && !isRightEdge && squaresArray[i + 1].classList.contains('bomb')) total++
                if (i < 90 && !isLeftEdge && squaresArray[i - 1 + width].classList.contains('bomb')) total++
                if (i < 88 && !isRightEdge && squaresArray[i + 1 + width].classList.contains('bomb')) total++
                if (i < 89 && squaresArray[i + width].classList.contains('bomb')) total++
                squaresArray[i].setAttribute('data', total)
            }
        }
    }

    createBoard()

    //add flag on right click
    function addFlag(square) {
        if (isGameOver) return
        if (!square.classList.contains('checked') && (flags < bombAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag')
                square.innerHTML = '🏳️'
                flags++
                document.getElementById('flag-amount').innerHTML = bombAmount - flags
                checkForWin()
            } else {
                square.classList.remove('flag')
                square.innerHTML = ''
                flags--
                document.getElementById('flag-amount').innerHTML = bombAmount + flags
            }
        }
    }


    //click on square actions
    function click(square) {
        let currentId = square.id
        if (isGameOver) return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (square.classList.contains('bomb')) {
            gameOver(square)
        } else {
            let total = square.getAttribute('data')
            if (total != 0) {
                square.classList.add('checked')
                if (total == 1) square.classList.add('one')
                if (total == 2) square.classList.add('two')
                if (total == 3) square.classList.add('three')
                if (total == 4) square.classList.add('four')
                square.innerHTML = total
                return
            }
            checkSquare(square, currentId)
        }
        square.classList.add('checked')
    }
    //check neighboring squares upon square click
    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width === width - 1)
        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squaresArray[parseInt(currentId) - 1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = squaresArray[parseInt(currentId) + 1 - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 10) {
                const newId = squaresArray[parseInt(currentId) - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = squaresArray[parseInt(currentId) - 1 - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 98 && !isRightEdge) {
                const newId = squaresArray[parseInt(currentId) + 1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 90 && currentId < 99 && !isLeftEdge) {
                const newId = squaresArray[parseInt(currentId) - 1 + width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = squaresArray[parseInt(currentId) + 1 + width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 89) {
                const newId = squaresArray[parseInt(currentId) + width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
        }, 10)
    }

    //game over logic
    function gameOver(square) {
        startNg = confirm("You hit a bomb! Start new game?")
        isGameOver = true
        if (startNg == true) {
            window.setTimeout(function () {
                document.location.reload(true);
            }, 200);
        }

        //show all bombs when gameover
        squaresArray.forEach(square => {
            if (square.classList.contains('bomb'))
                square.innerHTML = '💣'
        })
        return
    }


    //checks for win
    function checkForWin() {
        let matches = 0

        for (let i = 0; i < squaresArray.length; i++) {
            if (squaresArray[i].classList.contains('flag') && squaresArray[i].classList.contains('bomb')) {
                matches++
            }
            if (matches === bombAmount) {
                startNg = confirm('You found all the bombs! Start a new game?')
                isGameOver = true
                if (startNg == true) {
                    window.setTimeout(function () {
                        document.location.reload(true);
                    }, 200);
                }
                return
            }
        }
    }
})