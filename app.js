const boxes = Array.from(document.getElementsByClassName('box'));

let flag = false;
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const playText = document.getElementById('text');
const spaces = [];
const O_Text = 'O';
const X_Text = 'X';
let currentPlayer;

const drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';
        if(index < 3){
            styleString += 'border-bottom: 3px solid purple;';
        }
        if(index % 3 == 2){
            styleString += 'border-left: 3px solid purple;';
        }
        if(index % 3 == 0){
            styleString += 'border-right: 3px solid purple;';
        }
        if(index > 5){
            styleString += 'border-top: 3px solid purple;';
        }
        box.style = styleString;
        //if(flag === true){
            box.addEventListener('click', boxClicked)
        //}
        //else{
        //    box.addEventListener('click', boxClicked).disabled
        //}
    });
};

const boxClicked = (e) => {
    if(flag == false){
        return;
    }
    const id = e.target.id;
    if(!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerHasWon()){
            playText.innerText = currentPlayer + ' has Won!';
            if(currentPlayer === O_Text){
                document.getElementById('o').value++;
            }
            else if(currentPlayer === X_Text){
                document.getElementById('x').value++;
            }
            flag = false;
            //return;
        }
        currentPlayer = currentPlayer === O_Text ? X_Text : O_Text;
    }
};

const playerHasWon = () => {
    if(spaces[0] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer){
            console.log('top');
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[6] === currentPlayer){
            console.log('left');
            return true;
        }
        if(spaces[4] === currentPlayer && spaces[8] === currentPlayer){
            console.log('diag1');
            return true;
        }
    }
    if(spaces[8] === currentPlayer){
        if(spaces[2] === currentPlayer && spaces[5] === currentPlayer){
            console.log('right');
            return true;
        }
        if(spaces[6] === currentPlayer && spaces[7] === currentPlayer){
            console.log('bottom');
            return true;
        }
    }
    if(spaces[2] === currentPlayer){
        if(spaces[4] === currentPlayer && spaces[6] === currentPlayer){
            console.log('diag2');
            return true;
        }
    }
    if(spaces[4] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer){
            console.log('vertical');
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer){
            console.log('horizontal');
            return true;
        }
    }
};

const next = () => {
    flag = true;
    spaces.forEach((space, index) => {
        spaces[index] = null;
    });
    boxes.forEach(box => {
        box.innerText = '';
    });
    playText.innerText = "Let's Go!";
    // if(currentPlayer === O_Text){
    //     currentPlayer = X_Text
    // }
    // else{
    //     currentPlayer = O_Text;
    // }
    playText.innerText = "Let's Go!!! " + currentPlayer + " Starts...";
};

const restart = () => {
    flag = true;
    spaces.forEach((space, index) => {
        spaces[index] = null;
    });
    boxes.forEach(box => {
        box.innerText = '';
    });
    document.getElementById('o').value = '0';
    document.getElementById('x').value = '0';
    const initialToss = prompt('Who wants to start?', '');
    if(initialToss === 'X' || initialToss === 'x'){
        currentPlayer = X_Text;
    }
    else if(initialToss === 'O' || initialToss === 'o'){
        currentPlayer = O_Text;
    }
    else{
        var toss = Math.random() * 2;
        var floor = Math.floor(toss);
        if(floor === 0){
            currentPlayer = O_Text;
        }
        else{
            currentPlayer = X_Text;
        }
    }
    playText.innerText = "Let's Go!!! " + currentPlayer + " Starts...";
};

nextBtn.addEventListener('click', next);
restartBtn.addEventListener('click', restart);

next();
restart();
drawBoard();