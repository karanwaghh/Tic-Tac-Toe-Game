// console.log("hello ji");

const GameInfo=document.querySelector(".game-info");
const Currbox=document.querySelectorAll(".box");
const newBtn=document.querySelector(".btn");

let currPla;
let gameGrid;

//Array of all winning position
const winPos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


//initializing function
function init(){
    currPla='X';
    //Make grid array Empty before proceed
    gameGrid=["","","","","","","","",""];
    //remove active class from new game button and make button unvisible
    newBtn.classList.remove("active");

    //to make grid box empty and resign css to each boxes
    Currbox.forEach((box,index)=>{
        box.innerText="";
        box.style.pointerEvents="all";
        //remove win color from grid and add box css
        box.classList=`box box${index+1}`;
    });
    GameInfo.innerText=`Current Player - ${currPla}`;
}
init();


//checks if any box get clicked
Currbox.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});


function handleClick(index){
    if(gameGrid[index]===""){
        Currbox[index].innerText=currPla;
        gameGrid[index]=currPla;
        Currbox[index].style.pointerEvents="none";
        //swap the player
        swapPla();
        //check winning position before move further
        checkWin();
    }
}

function checkWin(){
    let wonPla="";
    //iterate through winPos Array
    winPos.forEach((position)=>{
        if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]] && gameGrid[position[0]]===gameGrid[position[2]])){
            console.log("won the match");
            Currbox.forEach((box)=>{
                box.style.pointerEvents="none";
            });

            // add green bg for winning column or row
            Currbox[position[0]].classList.add("win");
            Currbox[position[1]].classList.add("win");
            Currbox[position[2]].classList.add("win");

            //who won the match
            wonPla=gameGrid[position[0]]==="X"?"X":"0";
        }
    });
    //activate newGame button
    if(wonPla!==""){
        GameInfo.innerText=`Winning Player - ${wonPla}`;
        newBtn.classList.add("active");
        return;
    }

    //CHeck for tie condition
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=""){
            fillCount++;
        }
    });
    if(fillCount==9){
        GameInfo.innerText=`Game Tie !`;
        newBtn.classList.add("active");
    }
}

//Swap the current player
function swapPla(){
    if(currPla==="X"){
        currPla="0";
    }else{
        currPla="X";
    }
    GameInfo.innerText=`Current Player - ${currPla}`;
}

//event listener on new Game button
newBtn.addEventListener("click",init);