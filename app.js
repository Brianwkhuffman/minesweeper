document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let squaresArray = []

//creates grid
function createBoard() {
    //get shuffled game array with random bomb placement
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width*width-bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombsArray)
    const shuffledArray = gameArray.sort(() => Math.random()-0.5)

    for (let i=0;i<width*width;i++){
        const square = document.createElement('div')
        square.setAttribute('id', i)
        square.classList.add(shuffledArray[i])
        grid.appendChild(square)
        squaresArray.push(square)

        //adding click to squares
        square.addEventListener('click', function(e) {
            click(square)
        })
    }

    //add numbers to grid
    for (let i=0;i<squaresArray.length;i++){
        let total = 0
        const isLeftEdge = (i % width === 0)
        const isRightEdge = (i === width - 1)
        //logic for square numbers
        if (squaresArray[i].classList.contains('valid')){
            if (i > 0 && !isLeftEdge && squaresArray[i-1].classList.contains('bomb')) total++
            if (i > 9 && !isRightEdge && squaresArray[i+1-width].classList.contains('bomb')) total++
            if (i > 10 && squaresArray[i-width].classList.contains('bomb')) total++
            if (i > 11 && !isLeftEdge && squaresArray[i-1-width].classList.contains('bomb')) total++
            if (i < 98 && !isRightEdge && squaresArray[i+1].classList.contains('bomb')) total++
            if (i < 90 && !isLeftEdge && squaresArray[i-1+width].classList.contains('bomb')) total++
            if (i < 88 && !isRightEdge && squaresArray[i+1+width].classList.contains('bomb')) total++
            if (i < 89 && squaresArray[i+width].classList.contains('bomb')) total++
            squaresArray[i].setAttribute('data', total)
            console.log(squaresArray[i]) 
    }
}
}








createBoard()

//click on square actions
function click(square) {
    if (square.classList.contains('bomb')){
        alert('Game Over')
    }
}

})