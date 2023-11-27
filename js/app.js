
let gameObj = {};
let playerTurn = 1;
let gameOver = false;
let messageBox = document.getElementById('message-box');
let messageRestart = document.getElementById('message-restart');

document.getElementById('restart').addEventListener('click', () => {
    console.log('reset buttons and variables')
    document.querySelectorAll('.button-option').forEach(elm => {
        elm.classList.remove('heart-img-btn');
        elm.classList.remove('diamond-img-btn');

    });
    playerTurn = 1;
    gameObj = {};
    gameOver = false;
    messageBox.innerHTML = 'Love VS Money!';
    messageRestart.innerText = '';
});

document.querySelectorAll('.button-option').forEach(btn => {
    btn.addEventListener('click', playTurn);
});

function playTurn(e) {
    if (gameOver) {
        console.log('The Game is Over. Use the restart Button to play again.')
        return
    }
    let selectBtn = e.target.getAttribute('btn');
    if (gameObj[selectBtn] >= 0) {//if postion already taken
        return;
    }

    //set button for the player
    gameObj[selectBtn] = playerTurn;

    playerTurn === 1 ?//Add image for player entery
        e.target.classList.add('heart-img-btn') :
        e.target.classList.add('diamond-img-btn')

    //check if it's a winning match
    winnerCheck(gameObj);

    //console.log(gameObj);
    playerTurn === 1 ? playerTurn = 0 : playerTurn = 1;
}

function winnerCheck(gameObj) {
    /*
        Winning conditions:
        1,2,3   1,4,7    1,5,9
        4,5,6   2,5,8    3,5,7
        7,8,9   3,6,9
    */

    let row1 = (gameObj['1'] + gameObj['2'] + gameObj['3']);
    let row2 = (gameObj['4'] + gameObj['5'] + gameObj['6']);
    let row3 = (gameObj['7'] + gameObj['8'] + gameObj['9']);
    let col1 = (gameObj['1'] + gameObj['4'] + gameObj['7']);
    let col2 = (gameObj['2'] + gameObj['5'] + gameObj['8']);
    let col3 = (gameObj['3'] + gameObj['6'] + gameObj['9']);
    let diag1 = (gameObj['1'] + gameObj['5'] + gameObj['9']);
    let diag2 = (gameObj['3'] + gameObj['5'] + gameObj['7']);
    let winningArray = [row1, row2, row3, col1, col2, col3, diag1, diag2];

    console.log('after play', winningArray);

    if (winningArray.includes(3)) {
        console.log('Love Won!');
        messageBox.innerHTML = `And the Winner Is <span  id="heart-winner-msg">Love!</span>`;
        messageRestart.innerText = 'Press RESTART to play again';
        gameOver = true;
    } else if (winningArray.includes(0)) {
        console.log('Money Won!');
        messageBox.innerHTML = 'And the Winner Is <span  id="money-winner-msg">Money!</span>';
        messageRestart.innerText = 'Press RESTART to play again';
        gameOver = true;
    } else {
        return;
    }
}

