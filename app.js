console.log('app.js file has been loaded. Ready!');
////////////////////////////////////////////////////////////////////////////////

// STORAGE
var board = [null, null, null, null, null, null, null, null, null];
var marks = {x: 'X', o: 'O'};
var userMark = marks.x; // initially start out as player X
var moveCount = 0;
var gameCanContinue = true;
var ties = 0;
var usersStats = {x: {wins: 0, losses: 0}, o: {wins: 0, losses: 0}};
////////////////////////////////////////////////////////////////////////////////

// FUNCTIONS
var intializeboard = function() {
    for (var i = 0; i < 9; i++) {

        document.getElementById('slot' + i).addEventListener('click', (e) => {
            
            if (gameCanContinue) {
                console.log(`${e.target.id}: ${e.target.innerText} --> ${userMark}`);

                var currPlayer = userMark;
                moveCount++;
                console.log('total moves count: ', moveCount);

                toggleSlotValue(e);
                togglePlayer();

                if (detectWin(currPlayer)) {
                    setWin(currPlayer);
                }
                
                if (moveCount === 9 && gameCanContinue) {
                    declareTie();
                }
            }
            console.log("\n\n\n");
        }, false);
    }
}

var initializeResetButton = function() {
    document.getElementById('reset-button').addEventListener('click', () => {
        console.log("Restarting round... game board will now reset.");
        resetBoard();
    }, false);
}

var detectWin = function(userMark) {
    // if the board meets any of the 8 recognized wins, then declare a winner
    crosses = [];
    legalCrosses = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    for (var i = 0; i < legalCrosses.length; i++) {
        if (legalCrosses[i] !== '-') {
            crosses.push(
                board[legalCrosses[i][0]] === userMark &&
                board[legalCrosses[i][1]] === userMark &&
                board[legalCrosses[i][2]] === userMark
            );
        }
    }

    return crosses.includes(true);
}

var resetBoard = function() {
    for (var i = 0; i < 9; i++) {
        var slotId = 'slot' + i;
        document.getElementById(slotId).innerText = '-';
    }

    board = [null, null, null, null, null, null, null, null, null];
    userMark = marks.x; // initially start out as player X
    moveCount = 0;
    setGameCanContinue(true);
    document.getElementById('win-message').innerText = '';
    // setNextPlayer(marks.x);
}

var declareTie = function() {
    ties++;
    setGameCanContinue(false);
    document.getElementById('win-message').innerText = `Sorry, this round is a tie!`;
    document.getElementById('ties').innerText = `${ties}`;
}

var updateBoardStorage = function(userMark, i) {
    board[i] = userMark;
    console.log('BOARD STORAGE: ', board);
}

////////////////////////////////////////////////////////////////////////////////

// GETTERS AND SETTERS

var setGameCanContinue = function(bool) {
    gameCanContinue = bool;
}

var setNextPlayer = function(userMark) {
    document.getElementById('curr-player').innerText = userMark;
}

var setWin = function(userMark) {
    // resetBoard();

    if (userMark === marks.x) {
        usersStats.x.wins++;
        usersStats.o.losses++;
    } else {
        usersStats.o.wins++;
        usersStats.x.losses++;
    }
    
    setGameCanContinue(false);
    document.getElementById('win-message').innerText = `Congrats, Player ${userMark}. You won!`;
    document.getElementById('player-x').innerText = `W-${usersStats.x.wins}, L-${usersStats.x.losses}`;
    document.getElementById('player-o').innerText = `W-${usersStats.o.wins}, L-${usersStats.o.losses}`;
}

////////////////////////////////////////////////////////////////////////////////

// HELPER FUNCTIONS
var togglePlayer = function() {
    (userMark === marks.x) ? userMark = marks.o : userMark = marks.x;
    toggleNextPlayerMessage();
}

var toggleSlotValue = function(e) {
    e.target.innerText = userMark;
    updateBoardStorage(userMark, parseInt(e.target.id.slice(4)));
}

var toggleNextPlayerMessage = function() {
    document.getElementById('curr-player').innerText = userMark;
}
////////////////////////////////////////////////////////////////////////////////

// MAIN PROGRAM
intializeboard();
initializeResetButton();
