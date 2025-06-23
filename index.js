// Rock Paper Scissor Game

// --- Global Redirection Functions ---
window.goToRules = function(fromPage) {
    window.location.href = "rules.html";
};

window.goBack = function() {
    const cameFrom = sessionStorage.getItem("cameFrom");
    if (cameFrom) {
        window.location.href = cameFrom;
    } else {
        window.location.href = "index.html";
    }
}
// --- End Global Redirection Functions ---

$(document).ready(function () {
    let score_text = document.querySelector(".scr");
    let round_text = document.querySelector(".rnd");

    if (!score_text || !round_text) return; // Stop if not on game page

    $(".status").slideUp(0);
    $(".result_popup").hide(); // Always hide result popup at start

    let round = 1;
    // User vars
    let score = 0;
    let win = 0;
    let lose = 0;
    let draw = 0;

    // Computer vars
    let score_cpu = 0;
    let win_cpu = 0;
    let lose_cpu = 0;
    let draw_cpu = 0;

    let status;
    let otherInp;
    
    const arr = ["rock", "paper", "scissor"];

    // Toggle dropdown
    $(".links button").click(() => {
        $(".dropdown").slideToggle(50);
    });

    // Remove classes from user move
    let remove = () => {
        $(".img1").removeClass("visible_rock visible_paper visible_scissor");
    };

    // Add classes to user move
    let add = (img, cls) => {
        $(img).addClass(cls);
    };

    // Add classes to Computer move
    let computer_move = () => {
        $(".img2").removeClass("visible_rock visible_paper visible_scissor");

        if (otherInp === 0) {
            $(".img2").addClass("visible_rock");
        } else if (otherInp === 1) {
            $(".img2").addClass("visible_paper");
        } else {
            $(".img2").addClass("visible_scissor");
        }
    };

    // Changing the text of rounds and score
    let Update_UI = () => {
        score_text.innerHTML = `Score : ${score}`;
        setTimeout(() => {
            if (round == 6) {
                round_text.innerHTML = `Round : 5`;
            } else {
                round_text.innerHTML = `Round : ${round}`;
            }
        }, 1500);
    };

    // Win, Lose or Draw conditions
    let Comparison = (user_input) => {
        let userInput = user_input;
        otherInp = Math.floor(Math.random() * 3);

        if (arr[otherInp] === userInput) {
            score++;
            score_cpu++;
            status = 0;
        } else if (
            (userInput === "rock" && arr[otherInp] === "scissor") ||
            (userInput === "paper" && arr[otherInp] === "rock") ||
            (userInput === "scissor" && arr[otherInp] === "paper")
        ) {
            score += 2;
            status = 1;
        } else {
            score_cpu += 2;
            status = -1;
        }

        round++;
        Update_UI();

        $(".status").removeClass("red green blue");
        if (status == 1) {
            $(".status").addClass("green").html("YOU WIN");
            win++;
            lose_cpu++;
        }
        if (status == -1) {
            $(".status").addClass("red").html("YOU LOSE");
            lose++;
            win_cpu++;
        }
        if (status == 0) {
            $(".status").addClass("blue").html("DRAW");
            draw++;
            draw_cpu++;
        }

        if (round > 5) {
            $(".result_popup").fadeIn(300);
            $(".result_popup td").eq(1).text(win);
            $(".result_popup td").eq(2).text(win_cpu);
            $(".result_popup td").eq(4).text(lose);
            $(".result_popup td").eq(5).text(lose_cpu);
            $(".result_popup td").eq(7).text(draw);
            $(".result_popup td").eq(8).text(draw_cpu);
            $(".result_popup td").eq(10).text(score);
            $(".result_popup td").eq(11).text(score_cpu);

            $(".i1, .i2, .i3").prop("disabled", true);

            let storedHigh = localStorage.getItem("high_score");
            if (!storedHigh || score > parseInt(storedHigh)) {
                localStorage.setItem("high_score", score);
            }
        }

        $(".i1, .i2, .i3").css("pointer-events", "none");
        $(".status").slideDown(100);

        setTimeout(() => {
            $(".status").slideUp(100);
            $(".i1, .i2, .i3").css("pointer-events", "auto");
        }, 1500);
    };

    // -------------------User click events-------------------
    $(".i1").click(function () {
        remove();
        add(".img1", "visible_rock");
        Comparison(arr[0]);
        computer_move();
    });

    $(".i2").click(function () {
        remove();
        add(".img1", "visible_paper");
        Comparison(arr[1]);
        computer_move();
    });

    $(".i3").click(function () {
        remove();
        add(".img1", "visible_scissor");
        Comparison(arr[2]);
        computer_move();
    });

    // Initial UI update
    Update_UI();
});
