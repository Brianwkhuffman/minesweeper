document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10;
    let bombAmount = 20;
    let squaresArray = [];

//creates grid
function createBoard() {
    //get shuffled game array with random bomb placement(?)
    const bombsArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width*width-bombAmount).fill('valid');

    const gameArray = emptyArray.concat(bombsArray)
    console.log(gameArray)

    for (let i=0;i<width*width;i++){
        const square = document.createElement('div');
        square.setAttribute('id', i);
        grid.appendChild(square);
        squaresArray.push(square);
    }
}
createBoard();

})