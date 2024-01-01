let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

resetBtn.classList.remove("hide-reset");

let turnO= true; //if true then O, if false then X

//winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8], 
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = ()=> {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetBtn.classList.remove("hide-reset");

    };

boxes.forEach((boxx) => {
    boxx.addEventListener("click", ()=>{
        console.log("box was clicked!");
        
        if(turnO){
            boxx.innerText = "O";
            turnO = false;
        }
        else{
            boxx.innerText = "X";
            turnO = true;
        }
        boxx.disabled = true;

        // if(box.innerText === "O"){
        //     box.innerText.

        // }

        checkWinner();
    });
}

);
const enableBoxes = () => { 
    for(let box of boxes){
        box.disabled =false;
        box.innerText = "";
    }
};

const disableBoxes = () => { 
    for(let box of boxes){
        box.disabled =true;
    }
};

const showWinner = (winner)=> {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    resetBtn.classList.add("hide-reset");
};

const checkWinner = () => {
    for(let pattern of winPatterns){
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Va1 =  boxes[pattern[1]].innerText;
            let pos3Val =  boxes[pattern[2]].innerText;
    

    if(pos1Val != "" && pos2Va1 != ""  && pos3Val != ""){
        if(pos1Val === pos2Va1 && pos2Va1 === pos3Val){
            console.log("WINNER!", pos1Val);
            showWinner(pos1Val);
            break;

        }
    }
}
    
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);