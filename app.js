document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let squaresArray = []
    let isGameOver = false

    //creates grid
    function createBoard() {
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

            //adding click to squares
            square.addEventListener('click', function (e) {
                click(square)
            })
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
                console.log(squaresArray[i])
            }
        }
    }

    createBoard()

    //click on square actions
    function click(square) {
        let currentId = square.id
        if (isGameOver) return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (square.classList.contains('bomb')) {
            console.log('Game Over')
        } else {
            let total = square.getAttribute('data')
            if (total != 0) {
                square.classList.add('checked')
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
            if (currentId < 90 && !isLeftEdge) {
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



})