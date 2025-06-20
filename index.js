/*// Rock Paper Ceaser Game

let points_u = 0;
let points_cpu = 0;
const arr = ["rock", "paper", "ceaser"];

let Start = ()=>{
    let userInput = prompt("take rock, paper or ceaser");
    let otherInp = Math.floor(Math.random() * 3);

    if (arr[otherInp] == userInput) {
        console.log("you get 1 point");
        points_u++;
        points_cpu++;
    }else if(userInput != arr[otherInp]){
        if (userInput == "rock" && arr[otherInp] == "paper") {
            console.log("you get 0 point");
            points_cpu += 2;
        }else if(userInput == "rock" && arr[otherInp] == "ceaser"){
            console.log("you get 2 points");
            points_u += 2;
        }else if(userInput == "paper" && arr[otherInp] == "rock"){
            console.log("you get 2 points");
            points_u += 2;
        }else if(userInput == "paper" && arr[otherInp] == "ceaser"){
            console.log("you get 0 point");
            points_cpu += 2;
        }else if(userInput == "ceaser" && arr[otherInp] == "rock"){
            console.log("you get 0 point");
            points_cpu += 2;
        }else if(userInput == "ceaser" && arr[otherInp] == "paper"){
            console.log("you get 2 points");
            points_u += 2;
        }
    }else{
        console.log("Please take only between rock, paper and ceaser and all cases should be in lowwer");
    }
}
let Result = ()=>{
    return (points_u > points_cpu)? true : false;
}

// Game starts here

alert("Welcome to the game");

if (confirm("Do you want to play match?")) {
    console.clear();
    for(let i = 0; i < 5; i++){
        Start();
    }
    if (Result()) {
        console.log("You Win");
    }else{
        console.log("You Lose");
    }
}
*/$(document).ready(function () {

    // Toggle dropdown
    $(".links button").click(() => {
        $(".dropdown").toggleClass("hidden visible");
    });

    // Remove current user move
    let remove = () => {
        $(".img1").removeClass("visible_rock visible_paper visible_scissor");
    };

    // Add user move
    let add = (img, cls) => {
        $(img).addClass(cls);
    };

    // Computer move
    let computer_move = () => {
        let otherInp = Math.floor(Math.random() * 3);
        $(".img2").removeClass("visible_rock visible_paper visible_scissor");

        if (otherInp === 0) {
            $(".img2").addClass("visible_rock");
        } else if (otherInp === 1) {
            $(".img2").addClass("visible_paper");
        } else {
            $(".img2").addClass("visible_scissor");
        }
    };

    // User click events
    $(".i1").click(function () {
        remove();
        add(".img1", "visible_rock");
        computer_move();
    });

    $(".i2").click(function () {
        remove();
        add(".img1", "visible_paper");
        computer_move();
    });

    $(".i3").click(function () {
        remove();
        add(".img1", "visible_scissor");
        computer_move();
    });

    console.log("JS loaded");
});
