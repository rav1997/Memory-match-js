let card = document.getElementsByClassName("card");
let cards = [...card];
console.log(cards);

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");
let progressbar = document.querySelector(".progress-bar");
var interval;
// let start = docume
// declaring variable of matchedCards
let matchedCard =[];
let unmatchedCard = [...card];

 // array for opened cards
var openedCards = [];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// @description shuffles cards when page is refreshed / loads



// @description function to start a new play 
function startGame(){
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length/2; i++){
        cards[2*i].style.background= "url('./img/icecream"+(i+1)+".jpg') no-repeat";
        cards[2*i].style.backgroundSize = "cover";
        cards[2*i+1].style.background= "url('./img/icecream"+(i+1)+".jpg') no-repeat";
        cards[2*i+1].style.backgroundSize = "cover";
    }
    setTimeout(flip2Back,2000);
    document.querySelectorAll(".card").forEach(card => {
        setTimeout(
            () => card.setAttribute('onclick' , 'cardOpen(this)'),
            2000
        )
    });
}

function flip2Back(){
    for (var i = 0; i < cards.length; i++){
        cards[i].innerHTML = '<img id="default-image" src="./img/default-image.png" width="100%" height="100%">';
    }
}

// // @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen(element) {
    openedCards.push(element);
    console.log(element);
    let c = element.childNodes;
    let img = c[0];
    img.style.visibility = "hidden";
    var len = openedCards.length;
    if(len === 1){
        element.style.pointerEvents = 'none';
    }
    if(len === 2){
    disableUnmatchedCard();
    moveCounter();
    if(openedCards[0].style.background === openedCards[1].style.background){
        console.log('Match Found');
        matchedCard.push(...openedCards);
        console.log(matchedCard);
        if(matchedCard.length === cards.length){
            console.log(cards);
            clearInterval(interval);
            progressbar.innerHTML = "You Won";
            
        }
       matched();
     } else {
         console.log('Match not Found');
          unmatched();
      }
   }
}


// // @description when cards match
 function matched(){
     openedCards[0].onclick = "";
     openedCards[1].onclick = "";
     unmatchedCard.splice( unmatchedCard.indexOf(openedCards[0]) , 1);
     unmatchedCard.splice( unmatchedCard.indexOf(openedCards[1]) , 1);
     enableUnmatchedCard();
     openedCards = [];
 }

 function disableUnmatchedCard(){
     for( x of unmatchedCard ){
         x.style.pointerEvents = "none";
     }
 }

 function enableUnmatchedCard(){
    for( x of unmatchedCard ){
        x.style.pointerEvents = "auto";
    }
}

//  description when cards don't match
 function unmatched(){
//     disable();
     setTimeout(function(){
       enableUnmatchedCard();
       openedCards[0].innerHTML = '<img id="default-image" src="./img/default-image.png" width="100%" height="100%">';
       openedCards[1].innerHTML = '<img id="default-image" src="./img/default-image.png" width="100%" height="100%">';
       openedCards = [];
     },700);
 }
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
     if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
        progressbar.innerHTML = "Game in Progress";
   }
    
}


// // @description game timer
   var second = 0,minute=0;
   var timer = document.querySelector(".timer"); 
   
   function startTimer(){
    interval = setInterval(function(){
         timer.innerHTML = minute+"mins "+second+"secs";
         second++;
         if(minute == 1){
            clearInterval(interval);
            for(let i=0; i<cards.length; i++){
                cards[i].onclick = "";
            }
            progressbar.innerHTML = "You Loose";
        }
         if(second == 60){
             minute++;
             second=0;
         }
         
        },1000);
 }

 function resetGame(){
    location.reload();     
}
