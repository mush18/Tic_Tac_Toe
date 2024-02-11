const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


//Variables which are intially needed
let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create the function to INITIALIZE The Game.
function initGame()
{
    currentPlayer="X";
    gameGrid=["","","","","","","","",""]; // this is the default value for the Game Grid --> as it will be EMPTY.
    newGameBtn.classList.remove("active");

    //Initally Jab game start hogi(Ya fir page reload hoga) to value daalna padegi..
    gameInfo.innerText=`Current Player - ${currentPlayer}`;

    //UI Par bhi change karna padega....(UI par bhi empty karna padega) --> Jab New game start hogi tab empty karna  padega.
    boxes.forEach((box,index) =>
    {
        box.innerText="";
        boxes[index].style.pointerEvents="all"; // "ALL" means it will respond to the all Pointer Events.

        //One More thing is Missing.... --> Green colour ko bhi remove karna hai
        box.classList=`box box${index+1}`;
    })

}

initGame();

boxes.forEach((box,index)=>
{
    box.addEventListener("click",()=>
    {
        handleClick(index);
    })
})

function handleClick(index)
{
    if(gameGrid[index]==="")
    {
        boxes[index].innerText=currentPlayer; //Box pe Update karna matlab UI pe change karega
        gameGrid[index]=currentPlayer;        //GameGrid se ham hamare liye status check karenge(used for INNERLOGIC)
        boxes[index].style.pointerEvents="none";   //Cursor-Pointer ko hatayega....    

        //swap the the TURN
        swapTurn();

        //Check karo koi jeet to nahi gaya
        checkGameOver();
    }
}

function swapTurn()
{
    if(currentPlayer=="X")
    {
        currentPlayer="O";
    }
    else
    {
        currentPlayer="X";
    }

    //upar paragraph me bhi to change karna padega na bhai tab ja ke vo change hoga.
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener("click",()=>
{
    initGame();
})

function checkGameOver()
{
    let answer="";

    //Agar Saari winning Postions pe "X" ya "O"  milega to winner mil jayega...
    winningPositions.forEach((position)=>
    {
        //All 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
            && (gameGrid[position[0]]=== gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]))
        {
            //check if winner is X OR Y....
            if((gameGrid[position[0]]==="X"))
                answer="X";
            else
                answer="O";

            //Now We Know Winner 
            //TO pointer event ko bandh kar do--> to double winner na ho jaave
            boxes.forEach((box)=>
            {
                box.style.pointerEvents="none";
            })

            //We have to mark the green colour
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    //agar Upar wala code chala ke idhar aaya hai then it means we have the Winner...
    if(answer!=="")
    {
        gameInfo.innerText=`Winner Player-${answer}`;
        newGameBtn.classList.add("active");
        return;
    }


    //When there is "NO WINNER"
    let fillCount=0;
    gameGrid.forEach((box)=>
    {
        if(box!=="")
        {
            fillCount++;
        }
    })

    //Borad is filled
    if(fillCount===9)
    {
        gameInfo.innerText="Game Tied ";
        newGameBtn.classList.add("active");  
    }
}

